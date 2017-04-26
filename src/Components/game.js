import React from 'react';
import Gameboard from './gameboard.js';
import './game.css'
import {puzzleList} from './puzzles.js';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			puzzle: 0,
			size: 4
		};
		
		this.handleClick = this.handleClick.bind(this);
		
	}
	
	handleClick(e){
		const name = e.target.name;
		// console.log(puzzleList)
		var nPuzzle;
		
		if(name === 'next'){
			if(this.state.puzzle + 1 < puzzleList.length){
				nPuzzle = this.state.puzzle + 1;
				// console.log(name + " puzzle: " + nPuzzle)
				this.setState({puzzle: nPuzzle})
			}
			else{
				// console.log(">" + (puzzleList.length-1))
			}
		}
		else if(name === 'previous'){
			if(this.state.puzzle - 1 >= 0){
				nPuzzle = this.state.puzzle - 1;
				// console.log(name + " puzzle: " + nPuzzle)
				this.setState({puzzle: nPuzzle})
			}
			else{
				// console.log("<0")
			}
		}
		
		var obj = JSON.parse(puzzleList[nPuzzle]);
		this.setState({size: obj.size})
		console.log("Game.js size: " + obj.size)
		
	}
	
	
	
	render(){
		return(
			<div id="gameWrapper">
			<h1>Puzzle #{this.state.puzzle+1}</h1>
				<Gameboard puzzle={this.state.puzzle} size={this.state.size}>
				</Gameboard>
				<div id="puzzleControls">
					<button name="previous" onClick={this.handleClick}>Previous</button>
					<button name="next" onClick={this.handleClick}>Next</button>
				</div>
			</div>
		)
	}
}

export default Game