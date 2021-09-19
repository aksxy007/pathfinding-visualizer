export default function djkstras(grid, startNode, EndNode) {
  let visitedNodes = [];
  startNode.isWall=false;
  EndNode.isWall = false;
  let shortestPathNodes = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesbyDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall && closestNode!==EndNode)
     continue;
    if(closestNode.isWall && closestNode===EndNode){
      closestNode.isWall=false;
      shortestPathNodes = getNodesInShortestPathOrder(EndNode);
    }
    if (closestNode.distance === Infinity)
      return { shortestPathNodes, visitedNodes };
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    updateNeighbour(closestNode, grid);
    if (closestNode === EndNode ) {
      shortestPathNodes = getNodesInShortestPathOrder(EndNode);
      break;
    }
  }
  return { shortestPathNodes, visitedNodes };
}

function sortNodesbyDistance(unvisitedNodes) {
  unvisitedNodes.sort((A, B) => A.distance - B.distance);
}

function updateNeighbour(node, grid) {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (const nieghbor of unvisitedNeighbours) {
    // if(!nieghbor.isWall){
    nieghbor.distance = node.distance + 1;
    nieghbor.previous = node;
    // }
  }
}

function getUnvisitedNeighbours(node, grid) {
  const neighbors = [];
  let i = node.x;
  let j = node.y;
  if (i > 0) neighbors.push(grid[i - 1][j]);
  if (i < grid.length - 1) neighbors.push(grid[i + 1][j]);
  if (j > 0) neighbors.push(grid[i][j - 1]);
  if (j < grid[0].length - 1) neighbors.push(grid[i][j + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== undefined) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  return nodesInShortestPathOrder;
}