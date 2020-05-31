import React, {Component} from "react";
import Row from "../Row";//ok

class Board extends Component{
    constructor(props){//ok
        super(props); //ok

        this.state={//ok
            rows:this.createBoard(props)//ok
        };
    }
    componentWillReceiveProps(nextProps){
        if(this.props.openCells > nextProps.openCells){
            this.setState({
                rows: this.createBoard(nextProps)
            });
        }  
    }

    createBoard = props =>{ //ok
        let board =[];//ok
        
        for(let i=0; i<props.rows;i++){//ok
            board.push([]);//ok
            for(let j=0;j<props.columns;j++){//ok
                board[i].push({//ok
                    x: j,//ok
                    y: i,//ok
                    count: 0, //ok
                    isOpen: false, //ok
                    hasMine:false, //ok
                    hasFlag:false //ok
                });
            }
        }
        //Despues de crear el tablero, se agregan las minas
        for(let i=0;i<props.mines;i++){//ok
            let randomRow=Math.floor(Math.random() * props.rows);//ok
            let randomCol=Math.floor(Math.random() * props.columns);//ok

            let cell = board[randomRow][randomCol];//ok

            if(cell.hasMine){//ok
                i--;//ok
            }
            else{
                cell.hasMine=true;//ok
            }
        }
       return board;//ok
    };

    open =cell => {

        if(this.props.status==="ended"){
            return;
        }

        let asyncCountMines= new Promise(resolve =>{
            let mines=this.findMines(cell);
            resolve(mines);
        });

    asyncCountMines.then(numberOfMines =>{

        let rows =this.state.rows; //ok
        let current =rows[cell.y][cell.x]; //ok

        if(current.hasMine && this.props.openCells ===0){ //ok
            console.log("La celda tiene una mina, reinicia el juego!!"); //ok
            let newRows =this.createBoard(this.props); //ok
            this.setState({ //ok
                rows:newRows //ok
            }, () =>{
                this.open(cell); //ok
            })
        }else{
            if(!cell.hasFlag && !current.isOpen){ //ok
                this.props.openCellClick(); //ok
                current.isOpen=true; //ok
                current.count=numberOfMines;
                //console.log(current);
                this.setState({rows}); //ok
                //console.log(this.state.rows);

                if(!current.hasMine && numberOfMines ===0){
                    this.findAroundCell(cell);
                }

                if(current.hasMine && this.props.openCells !==0){
                    this.props.endGame();
                }
             }
        }
    });  
    };

    flag = cell =>{
        if(this.props.status==="ended"){
            return;
        }

        if(!cell.isOpen){
            let rows=this.state.rows;
            cell.hasFlag=!cell.hasFlag;
            this.setState({rows});
            this.props.changeFlagAmount(cell.hasFlag ? -1:1);
        } 
    };

    findMines = cell => {
        let minesInProximity =0;//ok
        for(let row=-1; row <= 1;row++){//ok
            for(let col=-1;col<=1;col++){//ok
                if(cell.y + row >= 0 && cell.x + col >= 0){//ok
                    if(
                        cell.y + row < this.state.rows.length &&//ok
                        cell.x + col < this.state.rows[0].length//ok
                    ){
                       if(
                           this.state.rows[cell.y + row][cell.x + col].hasMine &&//ok
                           !(row===0 && col ===0)//ok
                        ){
                            minesInProximity++;//ok
                        }
                    }
                }
            }
        }
    return minesInProximity;//ok
};

    findAroundCell =cell =>{
        let rows= this.state.rows;

        for(let row=-1;row<=1;row++){
            for(let col=-1;col<=1;col++){
                if(cell.y + row >= 0 && cell.x + col >= 0){//ok
                    if(
                        cell.y + row < rows.length &&//ok
                        cell.x + col < rows[0].length//ok
                    ){
                        if(!rows[cell.y + row][cell.x + col].hasMine && 
                            !rows[cell.y + row ][cell.x + col].isOpen
                        ){
                            this.open(rows[cell.y + row][cell.x + col]);
                        }
                    }
                }
            }
        }
    }

    render(){
        let rows=this.state.rows.map((row, index) => {//ok
            return <Row cells={row}  key={index} open={this.open} flag={this.flag}/>;
        });
        return <div className="board">{rows}</div>;//ok
           
    }
}
export default Board;