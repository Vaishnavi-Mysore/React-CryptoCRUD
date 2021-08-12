import React from 'react';
import  PaginationClientSide  from './clientSide';
import { mount } from 'enzyme';

 let items = [1,2,3,9]
 let onChangePage = jest.fn();
 let preventDefault = jest.fn();
const historyMock = { push: jest.fn() };
const wrapper = mount(
<PaginationClientSide items={items} onChangePage={onChangePage} history={historyMock} />
)

it('should render PaginationClientSide card', () => {
  expect(wrapper.find(PaginationClientSide)).toHaveLength(1)
});

it(' should have getPager ', () => {
  let childWrapper = wrapper.find(PaginationClientSide)
  childWrapper.instance().getPager();
});

it(' should have setPage ', () => {
  let childWrapper = wrapper.find(PaginationClientSide)
  childWrapper.instance().setPage();
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[1,2,65,]}})
  expect(wrapper.find('a')).toHaveLength(7)
  wrapper.find('a').at(0).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[3,4,85,]}})  
  wrapper.find('a').at(1).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[5,6,95,], totalPages:3}})  
  wrapper.find('a').at(2).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[7,8,10]}})  
  wrapper.find('a').at(3).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[9,10,45,]}})  
  wrapper.find('a').at(4).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[11,12,35,]}})  
  wrapper.find('a').at(5).simulate('click', event);
});

it('simulate <a> tag@', () => {
  const event = {preventDefault}
  wrapper.setState({pager:{pages:[14,13,25,]}})  
  wrapper.find('a').at(6).simulate('click', event);
});