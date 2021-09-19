function Mazegen(grid,startNode,endNode){
    let wall=[];
    let visited=[];
    let start=grid[Math.floor(Math.random()*grid.length)][Math.floor(Math.random()*grid[0].length)]
    if(start===startNode||start===endNode){
        start=grid[Math.floor(Math.random()*grid.length)][Math.floor(Math.random()*grid[0].length)]
    }
    let i = start.x;
    let j = start.y;
    if (i > 1) wall.push(grid[i - 2][j]);
    if (i < grid.length - 2) wall.push(grid[i + 2][j]);
    if (j > 1) wall.push(grid[i][j - 2]);
    if (j < grid[0].length - 2) wall.push(grid[i][j + 2]);
    start.isWall = true
    start.isVisited=true;
    visited.push(start)
    // console.log(wall)
    i =Math.floor(Math.random()*wall.length);
    let cell=wall[i];
    if(cell===startNode||cell===endNode){
        i =Math.floor(Math.random()*wall.length);
        cell=wall[i];
    }
    while(!!wall.length){
        // console.log(cell)
        let neighbors=getUnvisitedNeighbours(cell,grid,endNode);
        // console.log(neighbors);
        j=Math.floor(Math.random()*neighbors.length);
        // console.log(j)
        let neighbor=neighbors[j]
        if(neighbors.length>0 && !visited.includes(neighbor)){
            neighbor.isVisited=true;
            neighbor.isWall = true;
            visited.push(neighbor)
            cell.isVisited=true;
            cell.isWall=true;
            visited.push(cell)
            let {x,y}=getBetweenCell(neighbor,cell);
            let betweenCell=grid[x][y];
            betweenCell.isWall=true;
            betweenCell.isVisited=true;
            visited.push(betweenCell);
        }
        for(let k=0;k<neighbors.length;k++){
            if(!visited.includes(neighbors[k]))
            {
                wall.push(neighbors[k]);
            }
        }
        
        wall=wall.filter((elt)=>elt!==cell)
        cell=neighbors[j];
        // console.log(wall)
    }
    // console.log(visited);
    // return visited;
}

function getBetweenCell(neighbor,cell)
{   
    let x=undefined;
    let y=undefined;
    let nx=neighbor.x;
    let ny=neighbor.y;
    let cx=cell.x
    let cy=cell.y;
    // console.log(neighbor,cell)
    x=(nx+cx)/2
    y=(ny+cy)/2
    // node=(neighbor+cell)/2
    // console.log(x,y);
    return {x,y};
}

function getUnvisitedNeighbours(node, grid,endNode) {
    const neighbours = [];
    let i = node.x;
    let j = node.y;
    if (i > 1 && grid[i - 2][j]!==endNode) neighbours.push(grid[i - 2][j]);
    if (i < grid.length - 2&& grid[i + 2][j]!==endNode) neighbours.push(grid[i + 2][j]);
    if (j > 1&& grid[i][j - 2]!==endNode) neighbours.push(grid[i][j - 2]);
    if (j < grid[0].length - 2 && grid[i][j + 2]!==endNode) neighbours.push(grid[i][j + 2]);
    // console.log(neighbours.filter((neighbor) => neighbor.isVisited))
    // return neighbours.filter((neighbor) => !neighbor.isVisited);
    return neighbours;
  }
  

  export default Mazegen;