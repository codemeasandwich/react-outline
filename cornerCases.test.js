
import React from 'react';
import { faker } from '@faker-js/faker';
import outline, { withOptions, setOptions } from "react-outline"
import { Styles, testing } from 'react-outline'
import { render } from '@testing-library/react';
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
