function createUnvisitedArr(arr) {
  //node array is a 2d array representing the grid/table being displayed
  let unvisitedNodes = [];
  arr.forEach((nodeSet) => {
    unvisitedNodes = [...unvisitedNodes, ...nodeSet];
  });
  return unvisitedNodes;
}

function reverseSort(arr) {
  //arr is an array of object
  //arr is reversed sorts so that pop() can be used

  return arr.sort((a, b) => b.distanceFromStart - a.distanceFromStart);
}

function updateAdjNodes(currentNode, nodeArray) {
  //loop 4 time fort the 4 adjacent nodes
  let adj = {
    up: [-1,0],
    down: [1,0],
    left: [0,-1],
    right: [0,1]
  }
  let currentLocation = currentNode.location;
  let adjNode;
  let newDist;

  for( let direction in adj){
    
    try {
      adjNode = nodeArray[currentLocation["i"] + adj[direction][0]][currentLocation["j"] + adj[direction][1]];
    } catch (e) {
    }
    //if statement needed because when nodeArray[i] exist but nodeArray[i][j] does not then undef is return. 
    //atm this set up works but will implement better way after algorthim is complete.
    if(adjNode){
      newDist = currentNode.distanceFromStart + adjNode.distanceFromAdj
      if(newDist < adjNode.distanceFromStart) adjNode.distanceFromStart = newDist
      if(adjNode.type == "endNode") console.log(adjNode);;
    }
  }
}

export default function startDijkstras(nodeArray) {
  let unvisitedNodes = createUnvisitedArr(nodeArray);
  unvisitedNodes = reverseSort(unvisitedNodes);

  let currentNode = unvisitedNodes.pop();

  while(unvisitedNodes.length > 0 && currentNode.distanceFromStart != Infinity){
    updateAdjNodes(currentNode, nodeArray);
    unvisitedNodes = reverseSort(unvisitedNodes);
    currentNode = unvisitedNodes.pop();
  }
  console.log("no more nodes");
}
