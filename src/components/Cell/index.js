import React from 'react';

const Cell = props => {//ok
    
     let renderCell= () => {//ok
        if(props.data.isOpen){//ok 
            if(props.data.hasMine){
                return (
                    <div className="cell open" 
                        onClick={ () => props.open(props.data)}  
                        onContextMenu = {e =>{//ok
                        e.preventDefault();  //ok
                    }}
                    >
                       <i class="fas fa-sun"></i>
                    </div>
                );
            }
            else if(props.data.count===0){
                return (
                    <div className="cell open" 
                        onClick={ () => props.open(props.data)}  
                        onContextMenu = {e =>{
                        e.preventDefault();  
                        props.flag(props.data); 
                    }}
                    />
                );
            }
            else{
                return (
                    <div className="cell open" onClick={ () => props.open(props.data)}  onContextMenu = {e =>{
                        e.preventDefault();  
                        props.flag(props.data);
                    }}>
                        {props.data.count}
                    </div>
                );
            }
        }
        else if(props.data.hasFlag){
            return (
                <div 
                className="cell open" //ok
                onClick={ () => props.open(props.data)} //ok
                onContextMenu = {e =>{//ok
                e.preventDefault();  //ok
                props.flag(props.data);//ok
                }}
                >
                   <i class="far fa-flag"></i>
                </div>
            );
        }
        else{
            return(
                <div 
                className="cell" //ok
                onClick={() => props.open(props.data)} //ok
                onContextMenu = {e =>{ //ok
                e.preventDefault();  //ok
                props.flag(props.data); //ok
                }}
                />
            );
        }
     };
    return renderCell();//ok
};

export default Cell;