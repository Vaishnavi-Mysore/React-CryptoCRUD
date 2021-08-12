import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});


const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});
class App extends Component {
  render() {
    return (
      // <HashRouter>
      <Router>
        <Switch>
          {/* <Route exact path='/register' name='Register Page' component={Register} /> */}
          <Route exact path='/404' name='Page 404' component={Page404} />
          <Route exact path='/500' name='Page 500' component={Page500} />
          <Route exact path='/account-signin' name='Create Group' component={DefaultLayout} />
          <Route exact path='/buy' name='Create Group' component={DefaultLayout} />
          <Route exact path='/buy-confirm' name='Create Group' component={DefaultLayout} />

          <Route exact path='/add-new-customer' name='Create Group' component={DefaultLayout} />
          <Route exact path='/dashboard' name='Create Group' component={DefaultLayout} />
          <Route exact path='/group/modify' name='Modify Group' component={DefaultLayout} />
          <Route exact path='/group' name='Group List' component={DefaultLayout} />
          <Route exact path='/group' name='Group Details' component={DefaultLayout} />
          <Route exact path='/processor/add' name='Add Processor' component={DefaultLayout} />
          <Route exact path='/processor/modify' name='Modify Processor' component={DefaultLayout} />
          <Route exact path='/processor' name='Processor List' component={DefaultLayout} />
          <Route exact path='/merchant' name='Merchant List' component={DefaultLayout} />
          <Route exact path='/merchant/add' name='Create Merchant' component={DefaultLayout} />
          <Route exact path='/merchant/modify' name='Modify Merchant' component={DefaultLayout} />
          <Route exact path='/rules' name='Rule List' component={DefaultLayout} />
          <Route exact path='/rules/add' name='Add Rule' component={DefaultLayout} />
          <Route exact path='/rules/modify' name='Modify Rule' component={DefaultLayout} />
          <Route path='/' name='Login Page' component={Login} />
        </Switch>
        </Router>
      // </HashRouter>
    );
  }
}

export default App;
