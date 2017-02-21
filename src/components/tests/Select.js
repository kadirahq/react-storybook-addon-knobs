import React from 'react';
import { shallow } from 'enzyme';
import Select from '../types/Select';
import { expect } from 'chai';
const { describe, it } = global;

describe('Select', () => {
  it('should render the correct options', () => {
    const wrapper = shallow(<Select
      knob={{ name: 'select', options: { One: 1, Two: 2, Three: 3 }, value: 3 }}
    />);

    expect(wrapper.contains(<option key="One" value={1}>One</option>)).to.equal(true);
  });
});
