import React from 'react';
import { DefaultHeader } from '../DefaultHeader';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const WATCH_TRANSACTION = 'WatchTransaction';
const PENDING_CAPTURE = 'PendingCapture';
const LIMIT_PROFILE = 'LimitProfile';
const MERCHANT_MKCK = 'Merchant';
const DISPUTE = 'Dispute';
const ACH_FEE_PROFILE = 'ACHFeeProfile';
const NO_NOTIFICATION_FOUND = 'No_notification';

const mockStore = configureMockStore();
const store = mockStore({
  userProfile: { userData: { user: { UserName: 'USER1' } } },
  notificationCount: [
    { EventCount: 1, NotificationType: WATCH_TRANSACTION },
    { EventCount: 2, NotificationType: MERCHANT_MKCK },
    { EventCount: 3, NotificationType: DISPUTE },
    { EventCount: 4, NotificationType: PENDING_CAPTURE },
    { EventCount: 5, NotificationType: LIMIT_PROFILE },
    { EventCount: 6, NotificationType: ACH_FEE_PROFILE },
    { EventCount: 8, NotificationType: NO_NOTIFICATION_FOUND },
  ]
});

let props = { firstTimeLogin: false }

it('simulate DropdownItem#Change', () => {
  let wrapper = mount(<Provider store={store}> <DefaultHeader onLogout={() => {}} {...props} /> </Provider>)
    
    let LogoutWrapper = wrapper.find('DropdownItem#Logout')
    LogoutWrapper.props()['onClick']()
});