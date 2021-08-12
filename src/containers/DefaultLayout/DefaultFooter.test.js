import React from 'react';
import DefaultFooter from './DefaultFooter';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  userProfile: { userData: { user: { LastLoginDateTime: '2019-01-01T01:01:01.001Z' } } }
});

it('should mount DefaultFooter', () => {
  const wrapper = mount(<Provider store={store}> <DefaultFooter /> </Provider>)  
})