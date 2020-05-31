import React, { Component } from 'react';
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";


class Minesweeper extends Component{ //ok
  constructor(){//ok
    super();//ok
    this.state={ //ok
      status: "waiting", //waiting, running, ended
      rows: 10, //ok
      columns:10, //ok
      flags:10, //ok
      mines:10, //ok
      time:0,//ok
      openCells: 0//ok
    };
    this.baseState= this.state;
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.status === "running"){
      this.checkForWinner();
    }
  }

  endGame = () =>{
    this.setState({
      status:"ended"
    })
  }

  checkForWinner = () =>{
    if(this.state.mines + this.state.openCells >= this.state.columns * this.state.rows){
      this.setState({
        status: "winner"
      }, alert('Ganaste, felicidades!!!'))
    }
  }

  reset = () =>{
    this.intervals.map(clearInterval);
    this.setState({...this.baseState},()=>{
      this.intervals=[];
    })

  }

  componentWillMount(){
    this.intervals=[];
  }

  tick = () =>{//ok
    if(this.state.openCells>0 && this.state.status === "running"){//ok
      let time= this.state.time + 1;//ok
      this.setState({time})//ok
    }
  }

  setInterval = (fn,t) =>{//ok
    this.intervals.push(setInterval(fn,t));//ok
  } 

  handleCellClick = () => {//ok
    if (this.state.openCells === 0 && this.state.status !== "running"){//ok
      this.setState({//ok
        status:"running"//ok
      }, () =>{//ok
        this.setInterval(this.tick,1000);//ok
      })
    }
    this.setState(prevState =>{
      return {openCells: prevState.openCells +1};
    })
  }

  changeFlagAmount = (amount) => {
    this.setState({flags:this.state.flags + amount })
  }

  render(){
    return(
      <div className="minesweeper">
        <h1>Buscaminas</h1>
        <BoardHead time={this.state.time} flagCount={this.state.flags} reset={this.reset}/>
          <Board 
          status={this.state.status}
          changeFlagAmount={this.changeFlagAmount}
          endGame={this.endGame}
          rows={this.state.rows} //ok
          columns={this.state.columns} //ok
          mines={this.state.mines} //ok
          openCells={this.state.openCells}//ok
          openCellClick={this.handleCellClick}//ok
          />

      </div>
    );
  }
}

export default Minesweeper;
