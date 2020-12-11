import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import Resumes from './pages/resumes';
import UpsertResume from './pages/upsertResume';
import ViewResume from './pages/viewResume';

import store from './helpers/store';

import  'bootstrap/dist/css/bootstrap.min.css'

import fa from './common/fa';


import './css/common.css';

import { configureFakeBE } from './helpers/fakeBE';
configureFakeBE();


function App() {
    return (
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Resumes} />
          <Route path="/upsert/:id?" component={UpsertResume} />
          <Route path="/view/:id" component={ViewResume} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      </div>
    );
}


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
