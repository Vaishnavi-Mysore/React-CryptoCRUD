import Loader from './loaderComponent'
import { mount } from 'enzyme'
import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({})
const props = { error: {}, noData: '' }

const wrapper = mount(<Provider store={store}><Loader {...props} /></Provider>)
it('should contain Dashboard', () => {
  expect(wrapper.find(Loader)).toHaveLength(1);
})