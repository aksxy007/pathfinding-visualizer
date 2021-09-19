import React, { useState, useEffect } from 'react';
import Node from "./node";
import "./pathfind1.css";
import Astar from "../Algorithm/Astar";
import Djkstras from "../Algorithm/djkstras";
const cols = 50;
const rows = 23;

let NODE_START_ROW = 10;
let NODE_START_COL = 10;
let NODE_END_ROW = 10;
let NODE_END_COL = 32 ;

const Pathtemp = () => {
    const [Grid, setGrid] = useState([]);
    // const [ShortestPathNodes, setPath] = useState([]);
    // const [VisitedNodes, setVisitedNodes] = useState([]);
  
    useEffect(() => {
      initializeGrid();
    }, []);
  
    const initializeGrid = () => {
      const grid = new Array(rows);
  
      for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
      }
  
      createSpot(grid);
  
      setGrid(grid);
  
      const startNode = grid[NODE_START_ROW][NODE_START_COL];
      const endNode = grid[NODE_END_ROW][NODE_END_COL];
      startNode.isWall = false;
      endNode.isWall = false;
    };
  
    const createSpot = (grid) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid[i][j] = new Spot(i, j);
        }
      }
    };
  
    function Spot(i, j) {
      this.x = i;
      this.y = j;
      this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
      this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
      this.g = 0;
      this.h = 0;
      this.f = 0;
      this.distance = Infinity;
      this.isVisited = false;
      this.neighbors = [];
      this.isWall = false;
      if(Math.random(1)<0.3){
        this.isWall=true;
    }
      this.previous = undefined;
    }
  
    const gridwithNode = (
      <div className="wrapper">
        {Grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((col, colIndex) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <Node
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                    isWall={isWall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  
    const visualizeDjkstras = () => {
      const startNode = Grid[NODE_START_ROW][NODE_START_COL];
      const endNode = Grid[NODE_END_ROW][NODE_END_COL];
      startNode.isWall = false;
      endNode.isWall = false;
      let path = Djkstras(Grid, startNode, endNode);
      const visitedNodes = path.visitedNodes;
      const shortestPathNodes = path.shortestPathNodes;
      visualizePath(visitedNodes, shortestPathNodes);
    };
  
    const visualizeAstar = () => {
      const startNode = Grid[NODE_START_ROW][NODE_START_COL];
      const endNode = Grid[NODE_END_ROW][NODE_END_COL];
      startNode.isWall = false;
      endNode.isWall = false;
      let path = Astar(Grid, startNode, endNode);
      const visitedNodes = path.visitedNodes;
      const shortestPathNodes = path.path;
      visualizePath(visitedNodes, shortestPathNodes);
    };
  
    const visualizeShortestPath = (shortestPathNodes) => {
      for (let i = 0; i < shortestPathNodes.length; i++) {
        setTimeout(() => {
          const node = shortestPathNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortest-path";
        }, 5 * i);
      }
    };
  
    const visualizePath = (visitedNodes, shortestPathNodes) => {
      for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
          setTimeout(() => {
            visualizeShortestPath(shortestPathNodes);
          }, 10 * i);
        } else {
          setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className =
              "node node-visited";
          }, 10 * i);
        }
      }
    };
  
    const resetScreen = () => {
      window.location.reload(true);
    };
    //   console.log(Path);
    return (
      <div>
        <div className="butdiv">
          <button className="buttons" onClick={visualizeDjkstras}>
            Visualise Djkstras
          </button>
          <button className="buttons" onClick={visualizeAstar}>
            Visualize AStar
          </button>
          <button className="buttons" onClick={resetScreen}>
            Reset Screen
          </button>
        </div>
        {gridwithNode}
      </div>
    );
  };
  
  export default Pathtemp;
  