import React from 'react';
import renderer from 'react-test-renderer';
import load from './example/stories/load'

for(const groupName in load ){
  const groupArray = load[groupName];
  describe(groupName, () => {
    for(const item of groupArray ){
      if(item.options && (item.options.test === undefined || item.options.test))
      test(item.title, () => {
        const elem = renderer.create(item.element);
        expect(elem.toJSON()).toMatchSnapshot();
      }) // END test
    } // END for
  }) // END describe
} // END for
