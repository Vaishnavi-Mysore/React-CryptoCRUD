import React from 'react';
import App from './App';
import { mount } from 'enzyme'

it('mounts without crashing', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find(App)).toHaveLength(1)
});




