import React from 'react';
import './gameboard.css';
import Cell from './gamecell.js';
import {puzzleList} from './puzzles.js';

class Gameboard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cellTypes: [],
			size: 4
		};
		
		this.style = {
			visibility: 'hidden'
		}

		this.genBoard(props.puzzle);
	};
	
	componentWillUpdate(nextProps){
		if(this.props.puzzle !== nextProps.puzzle){
			//this.props.puzzle = nextProps.puzzle;
			//Generate new board
			this.genBoard(nextProps.puzzle);
			// console.log(this.state.cellTypes);
		}
	}
	
	genBoard(puzzleNum){
		this.style.visibility = 'hidden';
		var obj = JSON.parse(puzzleList[puzzleNum]);
		var NcellTypes = this.state.cellTypes;
		
		while(NcellTypes.length > 0){
			NcellTypes.pop(0);
		}
		// console.log(NcellTypes);
		console.log(this.props.puzzle)
		for(var i = 0; i < obj.size; i++){
			var rowOfCellTypes = [];
			for(var k = 0; k < obj.size; k++){
				rowOfCellTypes[k] = String(i) + k + 'e';
			}
			NcellTypes.push(rowOfCellTypes);
		}
		
		// console.log(NcellTypes);
		for( var cell in obj){
			if(cell !== 'size'){
				var current = obj[cell];
				var x = current[0];
				var y = current[1];
				var cellType = current[2];
				
				if(cellType === "t"){
					//Tree
					NcellTypes[x][y] = x + y + 'T';
				}
				else if(cellType === 'b'){
					//Bush
					NcellTypes[x][y] = x + y + 'B';
				}
				
			}
		}
		console.log(this.props.size)
		// this.state.cellTypes = NcellTypes.slice();
	}
	handleClick(r){
		if(r.search("[tbe]") > 0){
			var x = r[0];
			var y = r[1];
			var type = r[2];
			
			if(r.search("e") > 0){
				type = 't';
			}
			else if(r.search("t") > 0){
				type = 'b';
			}
			else if(r.search("b") > 0){
				type = 'e';
			}
			
			var cellTypes = this.state.cellTypes.slice();
			cellTypes[x][y] = x + y + type;
			this.setState({cellTypes: cellTypes})
			
			this.testVictory();
		}
	}
	testVictory(){
		let rowsPassed = this.checkCounts('row');
		let colsPassed = this.checkCounts('col');
		let triplesPassed = this.checkTriples();
		let dupeRowsPassed = this.checkDuplicates('row')
		let dupeColsPassed = this.checkDuplicates('col')
		
		if(rowsPassed === true 
			&& colsPassed === true 
			&& triplesPassed === true 
			&& dupeRowsPassed === true
			&& dupeColsPassed === true
			){
				this.style.visibility = 'visible';
				console.log("Win!");
		}
		else{
			// console.log("rowsPassed: " + rowsPassed);
			// console.log("colsPassed: " + colsPassed);
			// console.log("triplesPassed: " + triplesPassed);
			 console.log("DupeRows: " + dupeRowsPassed);
			 console.log("DupeCols: " + dupeColsPassed);
		}
	}
	checkCounts(countDirection){
	//Test that row has same number of trees and bushes
	let gameCells = this.state.cellTypes;
	
	for(var i = 0; i < gameCells.length; i++){
		var treeCount = 0;
		var bushCount = 0;
		var cell = "";
		
		for(var k = 0; k < gameCells.length; k++){
			if(countDirection === 'row'){
				cell = gameCells[i][k];
			}
			else if(countDirection === 'col'){
				cell = gameCells[k][i];
			}
			else{
				return false;
			}
			
		
			if(cell.search("[bB]") > 0){
				bushCount += 1;
			}
			else if(cell.search("[tT]") > 0){
				treeCount += 1;
			}
			else{
				//Still an unfiled cell on the board
				return false;
			}
		}
		if(treeCount !== bushCount){
			return false;
		}
	}
	return true;
}
	checkTriples(){
		let gameCells = this.state.cellTypes
		for(var i = 0; i < gameCells.length; i++){
			for(var k = 0; k < gameCells.length; k++){
				
				var cell1 = "";
				var cell2 = "";
				var cell3 = "";
				
				if(i > 0 && i < gameCells.length - 1){
					//Check types
					cell1 = gameCells[i-1][k];
					cell2 = gameCells[i][k];
					cell3 = gameCells[i+1][k];
					
					if(cell1[2] === cell2[2] && cell1[2] === cell3[2]){
						return false;
					}
				}
				
				if(k > 0 && k < gameCells.length - 1){
					//Check types
					cell1 = gameCells[i][k-1];
					cell2 = gameCells[i][k];
					cell3 = gameCells[i][k+1];
					
					if(cell1[2] === cell2[2] && cell1[2] === cell3[2]){
						return false;
					}
				}
			}
		}
		return true;
	}
	checkDuplicates(testDirection){
		let gameCells = this.state.cellTypes;
		var cell1 = "";
		var cell2 = "";
		for(var i = 0; i < gameCells.length; i++){
			for(var j = i+1; j < gameCells.length; j++){
				for(var k = 0; k < gameCells.length; k++){
					//Decide rows or columns
					if(testDirection === 'row'){
						cell1 = gameCells[i][k];
						cell2 = gameCells[j][k];
						// console.log("Dir: " + testDirection + " i: " + i + " k: " + k + " j: " + j + " cell1: " + cell1 + " cell2: " + cell2);
					}
					else if(testDirection === 'col'){
						cell1 = gameCells[k][i];
						cell2 = gameCells[k][j];
					}
					else{return false;}
					
					// console.log("Dir: " + testDirection + " Cell1: " + cell1 + " Cell2: " + cell2)
					// console.log("cell1 === cell2: ")
					// console.log(cell1[2].toUpperCase() === cell2[2].toUpperCase())
					// console.log("End of row/col: " + k)
					// console.log(k === gameCells.length - 1)
				
					if(cell1[2].toUpperCase() === cell2[2].toUpperCase() && k === gameCells.length - 1){
						return false;
					}
					else if(cell1[2].toUpperCase() !== cell2[2].toUpperCase()){
						break;
					}
				}
			}
		}
		return true;
	}

	render(){
		return( 
			<div id="board">
				{this.state.cellTypes.map(c => {return c.map(r => {return <Cell type={r} onClick={() => this.handleClick(r)} masterWidth='400' sideCount={this.props.size} />})})}
				<div id="overlay" style={this.style}>
					<div id="overlayText">Victory!</div>
				</div>
			</div>
		)
	};
}
export default Gameboard;