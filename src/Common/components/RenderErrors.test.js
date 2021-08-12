import RenderErrors from './RenderErrors';
import { mount } from 'enzyme';
import React from 'react';

describe('RenderErrors Test', () => {
    test('Should mount render error with given message', () => {
        let stateModel = {
            errors: {
                errorMsg: ['error message', 'error Message 2']
            }
        };
        let wrapper = mount(<RenderErrors errorKey='errorMsg' errors={stateModel.errors} />)
        expect(wrapper.find('.errorMsg').first().text()).toEqual(stateModel.errors.errorMsg[0])
    })
})

