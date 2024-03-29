import React from 'react';
import "./node.css";

const node =({isStart,isEnd, row, col, isWall})=>{
        const classes = isStart? "node-start":isWall? "isWall" :isEnd ? "node-end":"";
    return(
            <div className={`node ${classes}`} id={`node-${row}-${col}`}>
        </div>
    );
};

export default node;