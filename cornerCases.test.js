
import React from 'react';
import faker from 'faker';
import outline, { withOptions } from "react-outline"
import { Styles } from 'react-outline'
import { shallow, mount, render } from 'enzyme';

function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function classNameGen(){
  return faker.internet.userName()
}

describe('With Options at style level', () => {
    it('Not passing a options object should throw', () => {
      expect(() => {
        withOptions()
      }).toThrow();
    })

    it('Using options to set color short-hand', () => {

        const custom_outline =  withOptions({colors:{primary:"#ABC123"}})

        const fooN = classNameGen();
        const barN = classNameGen();

        const css = {
            base : {
                 [fooN]:{  color:"primary" },
                 [barN]:{  color:"red" }
            }
        }
        const styles = custom_outline(css);

        const foo = shallow(<div style={styles[fooN]()}/>);
        const bar = shallow(<div style={styles[barN]()}/>);

        expect(bar.prop("style")).toEqual({  color:"red" })
        expect(foo.prop("style")).toEqual({  color:"#ABC123" })
    })

    it('Using options to set caching (base + fn)', () => {

        const custom_outline =  withOptions({caching:true})

        const color = randomColor();
        const barN = classNameGen();

        const css = {
            base:{[barN]:{backgroundColor:"yellow"}},
                  //  USE a random color
            [barN] : ()=>({color})
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(css[barN]()).not.toBe(css[barN]());
        expect(baz1.prop("style")).toHaveProperty("color");
        expect(baz1.prop("style").color).toEqual(color);
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })

    it('Using options to set caching (base)', () => {

        const custom_outline =  withOptions({caching:true})
        const barN = classNameGen();

        const css = {
            base:{[barN]:{color:"white"}},
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(css.base[barN]).toEqual(styles[barN]());
        expect(baz1.prop("style")).toHaveProperty("color")
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })

    it('Using options to set caching (fn)', () => {

        const custom_outline =  withOptions({caching:true})
        const barN = classNameGen();

        const css = {
              //  USE a random color
              [barN] : ()=>({color:randomColor()})
        }
        const styles = custom_outline(css);

        const baz1 = shallow(<div style={styles[barN]()}/>);
        // baz2 will return the same style as baz1 cached value
        const baz2 = shallow(<div style={styles[barN]()}/>);

        expect(baz1.prop("style")).toHaveProperty("color")
        expect(baz1.prop("style")).toEqual(baz2.prop("style"));
    })
})

describe('In production mode', () => {

      beforeAll(() => global.__TEST__ = false);
      afterAll( () => global.__TEST__ = true);

      it('generated elements using CSS features need a unique class', () => {

        const titleN = classNameGen();

            let styles = {
                base : {
                  [titleN]:{
                     base:{     background: "lightblue", color:"black" },
                    ":hover":{  background: "darkblue" , color:"white" }
                  }
                }
            }
            styles = outline(styles);

            const Title = styles[titleN]`div`

            const elem = shallow(<Title/>);
            expect(elem.prop("className")).toMatch(/^react-outline-[a-zA-Z0-9]{10}$/)
      })
})
