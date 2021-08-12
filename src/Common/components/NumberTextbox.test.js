import React from 'react';
import  NumberTextbox  from './NumberTextbox';
import { mount } from 'enzyme';

const onChange =jest.fn();
let props = { value: 8, onChange, maxLength:10, decimalAllowed:true};


it('should render NumberTextbox', () => {
    const wrapper = mount(<NumberTextbox/>)
    expect(wrapper.find(NumberTextbox)).toHaveLength(1);
})

it('should have on change', () => {
  const preventDefault = jest.fn();
  const event = { target: { name: 'name', value: 'john' },preventDefault };
  const wrapper = mount(<NumberTextbox  preventDefault={preventDefault}/>)
  const childWrapper = wrapper.find(NumberTextbox)
  childWrapper.instance().onKeyPress(event);
  childWrapper.setState({[event.target.name]: event.target.value});
  expect(childWrapper.state('name')).toBe('john');
})

it('should call onKeyPress', () => {    
  const wrapper = mount(<NumberTextbox {...props} />)  
  wrapper.setState({amountInCents:10})
  const event = {
      key: '2xF',
      target: {
        value:12
    }
  }
  let input = wrapper.find('Input')
  input.simulate('keypress', event)
  input.simulate('change', event)
  expect(onChange).toHaveBeenCalled()  
});

it('should call onKeyPress with changed props', () => {   
  let props = { value: 0, onChange, maxLength:null}; 
  const wrapper = mount(<NumberTextbox {...props} />)  
  wrapper.setState({amountInCents:10})
  const event = {
      key: '2xF',
      target: {
        value:12
    }
  }
  let input = wrapper.find('Input')
  input.simulate('keypress', event)
  input.simulate('change', event)
  expect(onChange).toHaveBeenCalled()  
});