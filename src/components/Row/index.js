import React from 'react';
import Cell from "../Cell";//ok

const Row = props =>{ //ok
    let cells=props.cells.map((data,index)=>{//ok
        return(
            <Cell key={index} data={data} open={props.open} flag ={props.flag}/>//ok
        )
    })
return(
    <div className= "row"> 
        {cells} 
    </div>//okokok
);
};

export default Row;