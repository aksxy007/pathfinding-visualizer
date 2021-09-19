
function Astar(grid,StartNode,EndNode){
    let openset =[];
    let closedset=[];
    let path=[];
    let visitedNodes=[];

    openset.push(StartNode);
    while(openset.length>0){
        let leastIndex =0;
        for(let i=0;i<openset.length;i++){
            if(openset[i].f<openset[leastIndex].f){
                leastIndex=i;
            }
        }

        let current =openset[leastIndex];
        // console.log(current);
        visitedNodes.push(current);
        if(current===EndNode)
        {
            let temp=current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp=temp.previous;
            }
            // console.log(path);
            return {path,visitedNodes};
            // console.log("Yay!! path has been found!")
        }

        openset=openset.filter((elt)=> elt!==current);
        closedset.push(current);
    
        let neighbors = addneighbors(current,grid);
        // console.log(current.neighbors);
        for(let i=0;i<neighbors.length;i++){
            let neighbor=neighbors[i];
            if(!closedset.includes(neighbor)&& !neighbor.isWall){
                let tempG=current.g+1;
                let newPath=false;
                if(openset.includes(neighbor)&& !neighbor.isWall){
                   if(tempG<neighbor.g){
                       neighbor.g=tempG;
                       newPath=true;
                   } 
                }
                else{
                    neighbor.g=tempG;
                    newPath=true;
                    openset.push(neighbor);
                }

                if(newPath){
                    neighbor.h=heruistic(neighbor,EndNode);
                    neighbor.f=neighbor.g + neighbor.h;
                    neighbor.previous=current;
                }
            }
        }
    }

    return {path,visitedNodes, error:"No path found"};
}

function heruistic(a,b){
    let d= Math.abs(a.x-a.y)+Math.abs(b.x-b.y);
    return d;
}

const addneighbors = (node, grid) => {
    let i = node.x;
    let j = node.y;
    // console.log(i);
    // console.log(j);
    let neighbors = [];
    if (i > 0 ) neighbors.push(grid[i - 1][j]);
    if (i < grid.length - 1) neighbors.push(grid[i + 1][j]);
    if (j > 0 ) neighbors.push(grid[i][j - 1]);
    if (j < grid[0].length - 1) neighbors.push(grid[i][j + 1]);
    // console.log(neighbors);
    return neighbors;
  };

export default Astar;