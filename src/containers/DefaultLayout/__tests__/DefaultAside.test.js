import React from 'react';
import ReactDOM from 'react-dom';
import DefaultAside from '../DefaultAside';
import { mount } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultAside />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have toggle', () => {
  let wrapper = mount(<DefaultAside />);
  const childWrapper = wrapper.find(DefaultAside)
  const div = document.createElement('div');
  ReactDOM.render(<DefaultAside />, div);
  let tab = "1"
  let varState = { activeTab: tab }
  childWrapper.instance().toggle(tab);
  childWrapper.setState(varState)
  expect(childWrapper.state('activeTab')).toBe(tab);
});

it('render NavLink length & simulate them', () => {
  let wrapper = mount(<DefaultAside />);
  expect(wrapper.find("NavLink")).toHaveLength(3);
  wrapper.find("NavLink").at(0).simulate('click', '1');
  wrapper.find("NavLink").at(1).simulate('click', '2');
  wrapper.find("NavLink").at(2).simulate('click', '3');
})