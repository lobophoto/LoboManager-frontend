import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import Config from './routes/Config';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/config" component={Config} />      
        <Route path="/" component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
