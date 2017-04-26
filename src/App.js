import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'

class App extends Component {
    render() {
    return (
	<div className="App">
        
	 
      <div>
        <h1>Landscaper</h1>
		<div id="navWrapper">
			<ul role="nav">
				<li><Link to="/about" activeClassName="active">About</Link></li>
				<li><Link to="/play" activeClassName="active">Play Game</Link></li>
			</ul>
		</div>
        {this.props.children}

      </div>
	 </div> 
	  )
}
}

export default App;
