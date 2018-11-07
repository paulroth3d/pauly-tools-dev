/** test a very simple js app */

import ShoppingList2 from '../../../script/components/reactCourse/ShoppingList2';

// import React from 'react';
// import {mount, shallow, configure} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// 
// configure({adapter: new Adapter()});

import React from 'react';
import {shallow} from 'enzyme';

const wrapper = shallow(
  <ShoppingList2 />
);

test('we dont live in 1984', () => {
  expect(2+2).toBe(4);
});

test('ShoppingList2 should include item1', () => {
  const results = ShoppingList2({});
  expect(results).not.toBeNull();
});

debugger;
describe('enzyme tests', () => {
  debugger;
  it('renders children when passed in', () => {
    const wrapper = shallow((
      <div>
        <div className="unique" />
      </div>
    ));
    debugger;
    const c = wrapper.contains(<div className="unique" />);
    debugger;
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
})

/*
test('ShoppingList2 is JSON', () => {
  expect(wrapper.find('.shopping-list')).toBe.have.lengthOf(1);
});
*/