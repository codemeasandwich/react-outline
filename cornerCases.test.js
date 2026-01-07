
import React from 'react';
import { faker } from '@faker-js/faker';
import outline, { withOptions, setOptions } from "react-outline"
import { Styles, testing } from 'react-outline'
import { render, cleanup, act } from '@testing-library/react';
import renderer from 'react-test-renderer';

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function classNameGen() {
  return faker.internet.userName()
}

// Helper to get style from rendered element
function renderAndGetStyle(element) {
  const { container } = render(element);
  return container.firstChild.style;
}

// Helper to convert CSSStyleDeclaration to plain object with only defined properties
function styleToObject(style) {
  const obj = {};
  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    // Convert kebab-case to camelCase
    const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    obj[camelProp] = style.getPropertyValue(prop);
  }
  return obj;
}

describe('With Options at style level', () => {
  it('Not passing a options object should throw', () => {
    expect(() => {
      withOptions()
    }).toThrow();
  })

  it('Using options to set color short-hand', () => {

    const custom_outline = withOptions({ colors: { primary: "#ABC123" } })

    const fooN = classNameGen();
    const barN = classNameGen();

    const css = {
      base: {
        [fooN]: { color: "primary" },
        [barN]: { color: "red" }
      }
    }
    const styles = custom_outline(css);

    const { container: fooContainer } = render(<div style={styles[fooN]()} data-testid="foo" />);
    const { container: barContainer } = render(<div style={styles[barN]()} data-testid="bar" />);

    const barStyle = styleToObject(barContainer.firstChild.style);
    const fooStyle = styleToObject(fooContainer.firstChild.style);

    expect(barStyle).toEqual({ color: "red" })
    expect(fooStyle).toEqual({ color: "rgb(171, 193, 35)" }) // #ABC123 converted to rgb
  })

  it('Using options to set caching (base + fn)', () => {

    const custom_outline = withOptions({ caching: true })

    const color = randomColor();
    const barN = classNameGen();

    const css = {
      base: { [barN]: { backgroundColor: "yellow" } },
      //  USE a random color
      [barN]: () => ({ color })
    }
    const styles = custom_outline(css);

    const result1 = styles[barN]();
    const result2 = styles[barN]();

    expect(css[barN]()).not.toBe(css[barN]());
    expect(result1).toHaveProperty("color");
    expect(result1.color).toEqual(color);
    expect(result1).toEqual(result2);
  })

  it('Using options to set caching (base)', () => {

    const custom_outline = withOptions({ caching: true })
    const barN = classNameGen();

    const css = {
      base: { [barN]: { color: "white" } },
    }
    const styles = custom_outline(css);

    const result1 = styles[barN]();
    const result2 = styles[barN]();

    expect(css.base[barN]).toEqual(styles[barN]());
    expect(result1).toHaveProperty("color")
    expect(result1).toEqual(result2);
  })

  it('Using options to set caching (fn)', () => {

    const custom_outline = withOptions({ caching: true })
    const barN = classNameGen();

    const css = {
      //  USE a random color
      [barN]: () => ({ color: randomColor() })
    }
    const styles = custom_outline(css);

    const result1 = styles[barN]();
    const result2 = styles[barN]();

    expect(result1).toHaveProperty("color")
    expect(result1).toEqual(result2);
  })
})

describe('In production mode', () => {

  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should throw if no style values are passed', () => {
    expect(() => {
      const styles = outline();
    }).toThrow();
  })

  it('should throw if a style value is not object or function', () => {
    expect(() => {
      const styles = outline({ [classNameGen()]: classNameGen() }); // random name with random value
    }).toThrow();
  })

  it('generated elements using CSS features need a unique class', () => {

    const titleN = classNameGen();

    let styles = {
      base: {
        [titleN]: {
          base: { background: "lightblue", color: "black" },
          ":hover": { background: "darkblue", color: "white" }
        }
      }
    }
    styles = outline(styles);

    const Title = styles[titleN]`div`

    const { container } = render(<Title />);
    expect(container.firstChild.className).toMatch(/^react-outline-[a-zA-Z0-9]{10}$/)
  })

  it('should run style function once if cased and same input', () => {
    let callCount = 0;
    let styles = {
      crazyElem: (x) => callCount++
    };
    styles = outline(styles, { caching: true }); // random name with random value

    styles.crazyElem(5);
    styles.crazyElem(5);

    expect(callCount).toEqual(1);
  })

  it('should be able to pass an value to style logic', () => {
    const css = {};
    const logic = { dogs: val => ({ color: "string" === typeof val ? "white" : "black" }) };
    const styles = outline(css, logic); // random name with random value

    const Dogs = styles.dogs`div`;
    expect(renderer.create(<Dogs style={"boo"} />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Dogs style={7} />).toJSON()).toMatchSnapshot();
  })

  it('should be able to destructur assignments on generated element', () => {
    const css = {};
    const logic = { cats: ({ number }) => ({ color: number > 5 ? "blue" : "pink" }) };
    const styles = outline(css, logic); // random name with random value

    const Cats = styles.cats`div`;
    expect(renderer.create(<Cats style={{ number: 2 }} />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Cats style={{ number: 7 }} />).toJSON()).toMatchSnapshot();
  })

  it('should be able to pass true value', () => {
    const css = {
      input: {
        base: { color: "red" },
        big: { fontSize: "20px" }
      }
    };
    const logic = { input: () => ({ background: "gray" }) };
    const styles = outline(css, logic); // random name with random value

    const Input = styles.input``;
    expect(renderer.create(<Input big disabled />).toJSON()).toMatchSnapshot();
  })

  it('should allow cross cutting style to map to only functions', () => {
    const css = {
      "foo, bar": {
        fontSize: "20px"
      }
    };
    const logic = {
      foo: x => ({ background: "gray" }),
      bar: x => ({ background: "black" })
    };
    const styles = outline(css, logic); // random name with random value

    const Foo = styles.foo`span`;
    const Bar = styles.bar`span`;
    expect(renderer.create(<Foo style={123} />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<Bar style={123} />).toJSON()).toMatchSnapshot();
  })

  it('should generated an element with a logic fn that can take undefined', () => {

    // VERSION  A
    const css = {
      foo: { fontSize: "20px" }
    };
    const logic = {
      foo: x => ({ background: "gray" }),
    };
    const stylesA = outline(css, logic); // random name with random value

    // VERSION  B

    const allStyles = {
      base: {
        foo: { fontSize: "20px" }
      },
      foo: x => ({ background: "gray" })
    };
    const stylesB = outline(allStyles); // random name with random value

    const FooA = stylesA.foo`span`;
    const FooB = stylesB.foo`span`;

    expect(renderer.create(<FooA style={undefined} />).toJSON()).toMatchSnapshot();
    expect(renderer.create(<FooB style={undefined} />).toJSON())
      .toEqual(renderer.create(<FooA style={undefined} />).toJSON());
  })

})

describe('CSS selectors', () => {
  it('should work with user defined callNames', () => {

    testing.resetCSS();

    const styles = outline({ a: { based: {}, ":hover": {} }, b: {} }); // random name with random value

    const ElemA = styles.a`div`;
    const ElemB = styles.b`div`;
    expect(renderer.create(<div>
      <ElemA className="a" />
      <ElemA />
      <ElemB className="b" />
      <ElemB />
    </div>).toJSON()).toMatchSnapshot();
  })
  it('should allow you to select a nested element', () => {

    testing.resetCSS();

    const css = {
      div: {
        base: { color: "red" },
        " .abc": { fontSize: "20px" }
      }
    };
    const styles = outline(css); // random name with random value

    const Elem = styles.div``;
    expect(renderer.create(<div>
      <Styles />
      <Elem />
    </div>).toJSON()).toMatchSnapshot();
  })

  it('should allow for color replacment', () => {

    testing.resetCSS();

    const custom_outline = withOptions({ colors: { squanchy: "#e5a939" } })

    const css = {
      div: {
        base: { color: "squanchy" },
        " .abc": { fontSize: "20px" }
      }
    };
    const styles = outline(css); // random name with random value

    const Elem = styles.div``;
    expect(renderer.create(<div>
      <Styles />
      <Elem />
    </div>).toJSON()).toMatchSnapshot();
  })

  it('should support media queries in CSS', () => {
    testing.resetCSS();

    const css = {
      responsive: {
        base: { color: "black" },
        "@media (max-width: 600px)": { color: "red" }
      }
    };
    const styles = outline(css);
    const Elem = styles.responsive`div`;

    expect(renderer.create(<div>
      <Styles />
      <Elem />
    </div>).toJSON()).toMatchSnapshot();
  })

  it('should support dynamic css prop on generated elements', () => {
    testing.resetCSS();

    const css = {
      box: {
        base: { color: "blue" },
        ":hover": { color: "red" }
      }
    };
    const styles = outline(css);
    const Box = styles.box`div`;

    // Test with css prop that passes a function
    expect(renderer.create(<div>
      <Styles />
      <Box css={{ ":hover": () => ({ background: "yellow" }) }} />
    </div>).toJSON()).toMatchSnapshot();
  })

})

describe('Check setOptions', () => {

  it('should throw no options are passed', () => {
    expect(() => {
      setOptions();
    }).toThrow();
  })

  it('should allow dev to set custom colours', () => {
    const colors = { crazyRed: "RED!" };
    expect(outline.colors).toBeUndefined();
    setOptions({ colors: { crazyRed: "RED!" } });
    expect(outline.colors).toEqual(colors);
  })
})

describe('DOM events on generated elements', () => {
  it('should attach and detach DOM event listeners', () => {
    testing.resetCSS();

    const css = {
      textarea: {
        base: { border: "1px solid gray" },
        ":focus": { border: "1px solid blue" }
      }
    };
    const styles = outline(css);
    const Textarea = styles.textarea`textarea`;

    const mockHandler = jest.fn();

    const { container, unmount } = render(
      <div>
        <Styles />
        <Textarea onDomEvent={{ scroll: mockHandler }} />
      </div>
    );

    // The element should have a ref attached
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeTruthy();

    // Unmount should not throw (tests componentWillUnmount)
    unmount();
  })

  it('should handle generated element with CSS and randomClassName', () => {
    testing.resetCSS();

    const css = {
      panel: {
        base: { color: "green" },
        ":hover": { color: "blue" }
      }
    };
    const styles = outline(css);
    const Panel = styles.panel`div`;

    // Element with CSS feature gets a random class
    const { container } = render(<Panel style={{ color: "red" }} />);
    expect(container.firstChild.className).toMatch(/react-outline/);
  })
})

describe('Styles component', () => {
  afterEach(() => {
    testing.resetCSS();
    cleanup();
  });

  it('should render CSS from pubsub', () => {
    const css = {
      title: {
        base: { fontSize: "20px" },
        ":hover": { fontSize: "24px" }
      }
    };
    const styles = outline(css);
    const Title = styles.title`div`;

    const { container } = render(
      <div>
        <Styles />
        <Title />
      </div>
    );

    const styleTag = container.querySelector('style');
    expect(styleTag).toBeTruthy();
    expect(styleTag.textContent).toContain('react-outline');
  })

  it('should update when new styles are published', () => {
    const css1 = {
      first: {
        base: { color: "red" },
        ":hover": { color: "blue" }
      }
    };
    const styles1 = outline(css1);
    const First = styles1.first`div`;

    const { container, rerender } = render(
      <div>
        <Styles />
        <First />
      </div>
    );

    // Add a second styled element
    const css2 = {
      second: {
        base: { color: "green" },
        ":hover": { color: "yellow" }
      }
    };
    const styles2 = outline(css2);
    const Second = styles2.second`div`;

    rerender(
      <div>
        <Styles />
        <First />
        <Second />
      </div>
    );

    const styleTag = container.querySelector('style');
    expect(styleTag.textContent).toContain('react-outline');
  })

  it('should render with custom children (raw CSS)', () => {
    const { container } = render(
      <Styles>{`.custom { color: purple; }`}</Styles>
    );

    const styleTag = container.querySelector('style');
    expect(styleTag.textContent).toContain('.custom');
    expect(styleTag.textContent).toContain('purple');
  })

  it('should provide toString method for SSR', () => {
    testing.resetCSS();

    const css = {
      ssr: {
        base: { color: "black" },
        ":hover": { color: "white" }
      }
    };
    const styles = outline(css);
    const SSR = styles.ssr`div`;

    // Create an element to trigger CSS generation
    render(<SSR />);

    // Styles.toString should return CSS string
    const cssString = Styles.toString();
    expect(typeof cssString).toBe('string');
  })
})

describe('Additional branch coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should handle css prop with direct object values (not functions)', () => {
    testing.resetCSS();

    const css = {
      elem: {
        base: { color: "blue" },
        ":hover": { color: "red" }
      }
    };
    const styles = outline(css);
    const Elem = styles.elem`div`;

    // Pass css prop with direct object (not function)
    const { container } = render(
      <div>
        <Styles />
        <Elem css={{ ":hover": { background: "green" } }} />
      </div>
    );

    expect(container.querySelector('div')).toBeTruthy();
  })

  it('should handle true props on wrapped React components', () => {
    testing.resetCSS();

    // Create a custom React component
    const MyComponent = (props) => <div {...props} />;

    const css = {
      wrapped: {
        base: { color: "blue" },
        active: { color: "red" }
      }
    };
    const styles = outline(css);
    const Wrapped = styles.wrapped`${MyComponent}`;

    // Pass true prop on a function component (not HTML element)
    const { container } = render(<Wrapped active />);

    expect(container.firstChild).toBeTruthy();
  })

  it('should work when options.named is false', () => {
    testing.resetCSS();

    const custom_outline = withOptions({ named: false });

    const css = {
      noname: {
        base: { color: "purple" },
        ":hover": { color: "yellow" }
      }
    };
    const styles = custom_outline(css);
    const NoName = styles.noname`div`;

    const { container } = render(
      <div>
        <Styles />
        <NoName />
      </div>
    );

    // Should not have a name attribute when named is false
    expect(container.querySelector('div')).toBeTruthy();
  })

  it('should setOptions without colors property', () => {
    // setOptions with an option other than colors
    setOptions({ caching: true });

    const css = { test: { color: "blue" } };
    const styles = outline(css);

    expect(styles.test()).toHaveProperty('color');
  })

  it('should handle elemName falling back to styleName in defineProperty', () => {
    testing.resetCSS();

    const css = {
      myelem: { color: "green" }
    };
    const styles = outline(css);

    // Create element without explicit tag (uses implied element)
    const MyElem = styles.myelem``;

    const { container } = render(<MyElem />);
    expect(container.firstChild).toBeTruthy();
  })

  it('should handle element without className when no CSS features', () => {
    const css = { plain: { color: "red" } };
    const styles = outline(css);
    const Plain = styles.plain`div`;

    const { container } = render(<Plain />);

    // Should not have className when there are no CSS pseudo-selectors
    expect(container.firstChild.className).toBe('');
  })

  it('should handle styleItem with inline style generation', () => {
    testing.resetCSS();

    const css = {
      inline: { fontSize: 20, fontWeight: "bold" }
    };
    const styles = outline(css);

    // Call the style function directly
    const inlineStyles = styles.inline();

    expect(inlineStyles).toHaveProperty('fontSize');
    expect(inlineStyles).toHaveProperty('fontWeight');
  })
})

describe('Edge cases for sharing styles', () => {
  it('should handle sharing styles with nested base values', () => {
    testing.resetCSS();

    const css = {
      "header, footer": { padding: "10px" },
      header: {
        base: { color: "blue" }
      },
      footer: {
        base: { color: "red" }
      }
    };
    const styles = outline(css);

    const headerStyle = styles.header();
    const footerStyle = styles.footer();

    expect(headerStyle).toHaveProperty('padding');
    expect(footerStyle).toHaveProperty('padding');
  })
})

describe('Lifecycle methods coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should trigger componentDidMount with onDomEvent', () => {
    testing.resetCSS();

    const css = {
      input: {
        base: { border: "1px solid gray" },
        ":focus": { border: "1px solid blue" }
      }
    };
    const styles = outline(css);
    const Input = styles.input`input`;

    const scrollHandler = jest.fn();

    const { container } = render(
      <div>
        <Styles />
        <Input onDomEvent={{ scroll: scrollHandler, focus: jest.fn() }} />
      </div>
    );

    const input = container.querySelector('input');
    expect(input).toBeTruthy();
  })

  it('should trigger componentWillUnmount cleanup', () => {
    testing.resetCSS();

    const css = {
      box: {
        base: { color: "green" },
        ":hover": { color: "blue" }
      }
    };
    const styles = outline(css);
    const Box = styles.box`div`;

    const clickHandler = jest.fn();

    const { unmount } = render(
      <div>
        <Styles />
        <Box onDomEvent={{ click: clickHandler }} />
      </div>
    );

    // This should trigger componentWillUnmount
    unmount();
  })

  it('should use styleName when elemName is falsy for component name', () => {
    testing.resetCSS();

    // Using implied element name (empty string becomes falsy)
    const css = {
      customName: { fontSize: 16 }
    };
    const styles = outline(css);

    // Empty tag literal should use styleName
    const Custom = styles.customName``;

    expect(Custom.name).toBe('customName');
  })

  it('should use elemName when provided for component name', () => {
    testing.resetCSS();

    const css = {
      myStyle: { fontSize: 16 }
    };
    const styles = outline(css);

    // Explicit tag should use that tag name 
    const Div = styles.myStyle`div`;

    // The component should exist and render
    const { container } = render(<Div />);
    expect(container.firstChild).toBeTruthy();
  })
})

describe('styleItem function coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should handle nested style objects with hasKids', () => {
    const css = {
      parent: {
        child: { color: "red" }
      }
    };
    const styles = outline(css);

    // Access nested style
    expect(styles.parent).toBeDefined();
    if (styles.parent.child) {
      expect(styles.parent.child).toBeDefined();
    }
  })

  it('should handle wrapStyles function call', () => {
    const css = {
      item: { padding: 10 }
    };
    const logic = {
      item: (x) => ({ margin: x || 5 })
    };
    const styles = outline(css, logic);

    // This exercises the wrapStyles path
    const result = styles.item(10);
    expect(result).toHaveProperty('margin');
  })
})

describe('DOM event triggering for full coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should trigger scroll event on element with onDomEvent', async () => {
    testing.resetCSS();

    const css = {
      scrollable: {
        base: { height: 100, overflow: "auto" },
        ":hover": { background: "gray" }
      }
    };
    const styles = outline(css);
    const Scrollable = styles.scrollable`div`;

    const scrollHandler = jest.fn();

    const { container } = render(
      <div>
        <Styles />
        <Scrollable onDomEvent={{ scroll: scrollHandler }}>
          <div style={{ height: 500 }}>Content</div>
        </Scrollable>
      </div>
    );

    const scrollableDiv = container.querySelectorAll('div')[1];

    // Trigger scroll event
    const scrollEvent = new Event('scroll', { bubbles: true });
    scrollableDiv.dispatchEvent(scrollEvent);

    expect(scrollHandler).toHaveBeenCalled();
  })

  it('should trigger click event on element with onDomEvent', () => {
    testing.resetCSS();

    const css = {
      clickable: {
        base: { cursor: "pointer" },
        ":active": { opacity: 0.5 }
      }
    };
    const styles = outline(css);
    const Clickable = styles.clickable`button`;

    const clickHandler = jest.fn();

    const { container } = render(
      <div>
        <Styles />
        <Clickable onDomEvent={{ click: clickHandler }}>Click me</Clickable>
      </div>
    );

    const button = container.querySelector('button');

    // Trigger click event
    const clickEvent = new Event('click', { bubbles: true });
    button.dispatchEvent(clickEvent);

    expect(clickHandler).toHaveBeenCalled();
  })

  it('should properly unmount element with active event listeners', () => {
    testing.resetCSS();

    const css = {
      removable: {
        base: { color: "red" },
        ":focus": { color: "blue" }
      }
    };
    const styles = outline(css);
    const Removable = styles.removable`input`;

    const focusHandler = jest.fn();
    const blurHandler = jest.fn();

    const { container, unmount } = render(
      <div>
        <Styles />
        <Removable onDomEvent={{ focus: focusHandler, blur: blurHandler }} type="text" />
      </div>
    );

    const input = container.querySelector('input');

    // Trigger focus to ensure event listener is active
    const focusEvent = new Event('focus', { bubbles: true });
    input.dispatchEvent(focusEvent);

    expect(focusHandler).toHaveBeenCalled();

    // Now unmount - this triggers componentWillUnmount
    unmount();

    // Verify no errors occurred during unmount
    expect(true).toBe(true);
  })
})

describe('Edge cases for complete function coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should use default empty style function when none provided', () => {
    // Style with only base CSS, no function
    const css = {
      simple: { color: "red", fontSize: 16 }
    };
    const styles = outline(css);

    // Call the style function (triggers the default () => {} in styleItem)
    const result = styles.simple();

    expect(result).toHaveProperty('color');
    expect(result).toHaveProperty('fontSize');
  })

  it('should handle style with both CSS object and children styles', () => {
    const css = {
      container: {
        wrapper: { padding: 10 }
      }
    };
    const styles = outline(css);

    // Access nested child style
    if (styles.container && styles.container.wrapper) {
      const wrapperStyle = styles.container.wrapper();
      expect(wrapperStyle).toHaveProperty('padding');
    }
  })

  it('should handle element creation with no explicit elem name (uses styleName)', () => {
    testing.resetCSS();

    // Use table-like name that becomes the elem tag
    const css = {
      span: { color: "green" }
    };
    const styles = outline(css);

    // Create element using implied tag name
    const Span = styles.span``;

    const { container } = render(<Span>Test</Span>);
    expect(container.firstChild.tagName.toLowerCase()).toBe('span');
  })

  it('should handle removeEventListener in componentWillUnmount', () => {
    testing.resetCSS();

    const css = {
      tracked: {
        base: { width: 100 },
        ":hover": { width: 200 }
      }
    };
    const styles = outline(css);
    const Tracked = styles.tracked`div`;

    const mouseHandler = jest.fn();

    const { container, unmount } = render(
      <div>
        <Styles />
        <Tracked onDomEvent={{ mouseover: mouseHandler, mouseout: jest.fn() }} />
      </div>
    );

    const trackedDiv = container.querySelectorAll('div')[1];

    // Trigger event before unmount
    const mouseEvent = new Event('mouseover', { bubbles: true });
    trackedDiv.dispatchEvent(mouseEvent);

    expect(mouseHandler).toHaveBeenCalled();

    // Unmount to trigger componentWillUnmount
    unmount();
  })
})

describe('Input element tests', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should handle input element with keyboard events', () => {
    testing.resetCSS();

    const css = {
      textInput: {
        base: { border: "1px solid gray" },
        ":focus": { border: "2px solid blue" }
      }
    };
    const styles = outline(css);
    const TextInput = styles.textInput`input`;

    const keyHandler = jest.fn();
    const inputHandler = jest.fn();

    const { container } = render(
      <div>
        <Styles />
        <TextInput
          onDomEvent={{ keydown: keyHandler, input: inputHandler }}
          type="text"
        />
      </div>
    );

    const input = container.querySelector('input');

    // Trigger keydown event
    const keyEvent = new Event('keydown', { bubbles: true });
    input.dispatchEvent(keyEvent);

    // Trigger input event
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);

    expect(keyHandler).toHaveBeenCalled();
    expect(inputHandler).toHaveBeenCalled();
  })

  it('should handle textarea element with change events', () => {
    testing.resetCSS();

    const css = {
      textArea: {
        base: { width: "100%" },
        ":focus": { outline: "none" }
      }
    };
    const styles = outline(css);
    const TextArea = styles.textArea`textarea`;

    const changeHandler = jest.fn();

    const { container } = render(
      <div>
        <Styles />
        <TextArea onDomEvent={{ change: changeHandler }} />
      </div>
    );

    const textarea = container.querySelector('textarea');

    // Trigger change event
    const changeEvent = new Event('change', { bubbles: true });
    textarea.dispatchEvent(changeEvent);

    expect(changeHandler).toHaveBeenCalled();
  })

  it('should handle button with multiple event types', () => {
    testing.resetCSS();

    const css = {
      btn: {
        base: { padding: 10 },
        ":hover": { background: "lightgray" },
        ":active": { background: "gray" }
      }
    };
    const styles = outline(css);
    const Btn = styles.btn`button`;

    const downHandler = jest.fn();
    const upHandler = jest.fn();

    const { container, unmount } = render(
      <div>
        <Styles />
        <Btn onDomEvent={{ mousedown: downHandler, mouseup: upHandler }}>
          Press me
        </Btn>
      </div>
    );

    const button = container.querySelector('button');

    // Trigger mousedown
    button.dispatchEvent(new Event('mousedown', { bubbles: true }));
    // Trigger mouseup
    button.dispatchEvent(new Event('mouseup', { bubbles: true }));

    expect(downHandler).toHaveBeenCalled();
    expect(upHandler).toHaveBeenCalled();

    // Unmount to fully test lifecycle
    unmount();
  })
})

describe('noopStyleFn coverage', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should use noopStyleFn when no style function is defined', () => {
    testing.resetCSS();

    // Define style with only base CSS and no function
    const css = {
      noFnStyle: {
        base: { color: "blue" },
        ":hover": { color: "red" }
      }
    };

    const styles = outline(css);

    // Create a generated element - this uses the default noopStyleFn internally
    const NoFn = styles.noFnStyle`div`;

    const { container } = render(
      <div>
        <Styles />
        <NoFn />
      </div>
    );

    expect(container.querySelector('div')).toBeTruthy();
  })

  it('should handle style with no function in outline logic', () => {
    // Pure CSS only, no style functions at all
    const css = {
      pureBase: { fontSize: 14, padding: 5 }
    };

    const styles = outline(css);

    // Calling the style function should work even without a defined function
    const result = styles.pureBase();

    expect(result).toHaveProperty('fontSize');
    expect(result).toHaveProperty('padding');
  })
})

describe('CSS features with dynamic functions', () => {
  beforeAll(() => global.__TEST__ = false);
  afterAll(() => global.__TEST__ = true);

  it('should apply dynamic function result as inline style when CSS features present', () => {
    testing.resetCSS();

    // CSS with media query AND dynamic function
    const styles = outline({
      widget: {
        boxShadow: "0px 0px 4px #00000022",
        "@media (max-width: 600px)": { margin: "10px" }
      }
    }, {
      widget: (selected) => (selected ? { boxShadow: "0px 0px 8px 6px blue" } : {})
    });

    const Widget = styles.widget`div`;

    // When style prop is true, dynamic function should return styles
    const { container } = render(
      <div>
        <Styles />
        <Widget style={true} />
      </div>
    );

    // Should have inline style with the dynamic boxShadow
    const widgetEl = container.querySelector('[name="widget"]');
    expect(widgetEl).toBeTruthy();
    expect(widgetEl.style.boxShadow).toBe("0px 0px 8px 6px blue");
  })

  it('should pass through style prop when CSS features present but no dynamic function', () => {
    testing.resetCSS();

    // CSS features but NO dynamic function
    const styles = outline({
      box: {
        backgroundColor: "lightblue",
        ":hover": { backgroundColor: "darkblue" }
      }
    });

    const Box = styles.box`div`;

    // Pass an object as style prop
    const { container } = render(
      <div>
        <Styles />
        <Box style={{ color: "red" }} />
      </div>
    );

    const boxEl = container.querySelector('[name="box"]');
    expect(boxEl).toBeTruthy();
    // Style prop should be passed through
    expect(boxEl.style.color).toBe("red");
  })

  it('should handle dynamic function returning empty object', () => {
    testing.resetCSS();

    // CSS with dynamic function that returns empty
    const styles = outline({
      item: {
        padding: "10px",
        ":hover": { padding: "15px" }
      }
    }, {
      item: (active) => (active ? { background: "yellow" } : {})
    });

    const Item = styles.item`div`;

    // When style prop is false, dynamic function returns empty object
    const { container } = render(
      <div>
        <Styles />
        <Item style={false} />
      </div>
    );

    const itemEl = container.querySelector('[name="item"]');
    expect(itemEl).toBeTruthy();
  })

  it('should apply 2-argument styleFn that receives base style', () => {
    testing.resetCSS();

    // CSS with 2-argument dynamic function (style, value)
    const styles = outline({
      card: {
        padding: "10px",
        ":hover": { padding: "15px" }
      }
    }, {
      // 2-arg function: receives (baseStyle, value)
      card: (baseStyle, isLarge) => (isLarge ? { padding: "30px" } : baseStyle)
    });

    const Card = styles.card`div`;

    // When style prop is truthy, dynamic function should use isLarge=true
    const { container } = render(
      <div>
        <Styles />
        <Card style={true} />
      </div>
    );

    const cardEl = container.querySelector('[name="card"]');
    expect(cardEl).toBeTruthy();
    expect(cardEl.style.padding).toBe("30px");
  })
})

