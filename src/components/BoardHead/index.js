import React from 'react';

const BoardHead = props => {//ok
   let minutes = Math.floor(props.time/60); //ok
   let seconds = props.time - minutes * 60 || 0;//ok
   
   let formattedSeconds = seconds<10 ? `0${seconds}` : seconds;//ok

   let time= `${minutes}:${formattedSeconds}`;//ok

    return(//ok
        <div className="board-head">
            
            <div className="flag-count">{props.flagCount}</div>
            <button className="reset" onClick={props.reset}>Reset</button>
            <div className="timer">{time}</div>
        </div>
    );//ok
};

export default BoardHead;