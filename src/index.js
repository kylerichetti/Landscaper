import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory} from 'react-router'

// ReactDOM.render(
  // <App />,
  // document.getElementById('root')
// );

import about from './Components/about'
import play from './Components/play'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
	  <Route path="/about" component={about}/>
	  <Route path="/play" component={play}/>
    </Route>
  </Router>
), document.body)