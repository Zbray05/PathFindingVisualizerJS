function createUnvisitedArr(arr) {
  //node array is a 2d array representing the grid/table being displayed
  let unvisitedNodes = [];
  unvisitedNodes = unvisitedNodes.concat(...arr);
  return unvisitedNodes;
}

function reverseSort(arr) {
  //arr is an array of object
  //arr is reversed sorts so that pop() can be used
  return arr.sort((a, b) => b.distanceFromStart - a.distanceFromStart);
}

function getAdjNodes(currentNode, nodeArray) {
  //loop 4 time fort the 4 adjacent nodes
  let adj = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };
  let adjNode;
  let adjNodeArr = [];
  let { i, j } = currentNode.location;

  for (let direction in adj) {
    try {
      if (
        nodeArray[i + adj[direction][0]] != undefined &&
        nodeArray[i + adj[direction][0]][j + adj[direction][1]] != undefined
      ) {
        adjNode = nodeArray[i + adj[direction][0]][j + adj[direction][1]];
        if(adjNode.type != "wall")adjNodeArr.push(adjNode);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return adjNodeArr;
}
function updateAdjNodes(currentNode, adjNodeArray) {
  let newDist;

  adjNodeArray.forEach((adjNode) => {
    newDist = currentNode.distanceFromStart + adjNode.distanceFromAdj;
    if (newDist < adjNode.distanceFromStart)
      adjNode.distanceFromStart = newDist;
  });
}

function recolorNode(node) {
  let { i, j } = node.location;
  if(node.type != "startNode") window.setTimeout(() => {node.changeType("visited")}, 50 * node.distanceFromStart);
}

function nextNodeDist(arr){
  let nextNode = arr[arr.length - 1];
  return nextNode.distanceFromStart;

}

export default function startDijkstras(nodeArray) {
  let unvisitedNodes = createUnvisitedArr(nodeArray);
  unvisitedNodes = reverseSort(unvisitedNodes);

  let currentNode;
  let adjNodes;

  do {
    currentNode = unvisitedNodes.pop();
    adjNodes = getAdjNodes(currentNode, nodeArray);
    updateAdjNodes(currentNode, adjNodes);
    unvisitedNodes = reverseSort(unvisitedNodes);
    recolorNode(currentNode);
    adjNodes.forEach((node) => {
      if (node.type == "endNode") {
        currentNode = node;
      }
    });
  } while (
    currentNode.type != "endNode" &&
    unvisitedNodes.length > 0 &&
    nextNodeDist(unvisitedNodes) != Infinity
  );

  if (currentNode.type == "endNode") {
    console.log("FOUND THE END");
  } else {
    console.log("no more nodes");
  }
}
