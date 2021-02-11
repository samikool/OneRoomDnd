import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import App from './App'
import ApiBrowser from './ApiBrowser';
import {ClassViewer} from './ClassViewer'

ReactDOM.render(
  // <React.StrictMode>
    <Router basename='/'>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route path='/classviewer' component={ClassViewer}></Route>
        <Route path='/apibrowser*'>
          <Router basename='/apibrowser'>
            <Switch>
              <Route exact path='/'><Redirect to={'/api'}/></Route>
              <Route path='/api*' component={ApiBrowser}/>
            </Switch>
          </Router>
        </Route>
      </Switch>
    </Router>,
  
  /* </React.StrictMode>, */
  document.getElementById('root')
);