
import React from 'react';
import outline, { withOptions } from "react-outline"
import { Styles } from 'react-outline'
import { shallow, mount, render } from 'enzyme';

describe('With Options at style level', () => {
    it('Not passing a options object should throw', () => {
      expect(() => {
        withOptions()
      }).toThrow();
    })

    it('Using options to set color short-hand', () => {

        const custom_outline =  withOptions({colors:{primary:"#ABC123"}})

        const css = {
            base : {
                 foo:{  color:"primary" },
                 bar:{  color:"red" }
            }
        }
        const styles = custom_outline(css);

        const foo = shallow(<div style={styles.foo()}/>);
        const bar = shallow(<div style={styles.bar()}/>);
        expect(bar.prop("style")).toEqual({  color:"red" })
        expect(foo.prop("style")).toEqual({  color:"#ABC123" })

    })
})

describe('In production mode', () => {

      beforeAll(() => global.__TEST__ = false);
      afterAll(() => global.__TEST__ = true);

      it('generated elements using CSS features need a unique class', () => {


            let styles = {
                base : {
                  title:{
                     base:{     background: "lightblue", color:"black" },
                    ":hover":{  background: "darkblue" , color:"white" }
                  }
                }
            }
            styles = outline(styles);

            const Title = styles.title`div`

            const elem = shallow(<Title/>);
            expect(elem.prop("className")).toMatch(/^react-outline-[a-zA-Z0-9]{10}$/)
      })
})
