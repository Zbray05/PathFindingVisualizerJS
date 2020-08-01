export default function aStarStart(start, end, nodeArr) {
  //start and end are a pathNode object, nodeArr is a 2d arr of all nodes

  /* 

what do we need
start/end nodes and the node array
add start to close list and adj nodes to open list
calc node score. f = g + h
move to node with lowest f

*/

  let openlist = [start];
  let closedlist = [];
  let currentNode;
  let adjNodes;

  do {
    currentNode = openlist.pop();
    adjNodes = getAdjNodes(currentNode, nodeArr);

    adjNodes.forEach((node) => {
      if (onOpenlist(node, openlist, closedlist)) {
        let f = calcF(currentNode, node, end);
        if (f < node.fScore) node.fScore = f;
      }
    });

    closedlist.push(currentNode);
    openlist.sort((a, b) => b.fScore - a.fScore);
    recolorNode(currentNode);
  } while (currentNode.type != "endNode" && openlist.length > 0);

  if(currentNode.type = "endNode") displayPath(currentNode, nodeArr);

  resetFscore(nodeArr);
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
        if (adjNode.type != "wall") adjNodeArr.push(adjNode);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return adjNodeArr;
}

function calcH(currentNode, endNode) {
  let { i: currenti, j: currentj } = currentNode.location;
  let { i: endi, j: endj } = endNode.location;
  return Math.abs(currenti - endi) + Math.abs(currentj - endj);
}

function calcG(currentNode, adjNode) {
  let newDist = currentNode.distanceFromStart + adjNode.distanceFromAdj;

  if(newDist < adjNode.distanceFromStart) adjNode.distanceFromStart = newDist;
    
  return newDist;
}

function calcF(currentNode, adjNode, endNode) {
  return calcH(adjNode, endNode) + calcG(currentNode, adjNode);
}

function onOpenlist(node, openlist, closedlist) {
  if (closedlist.includes(node)) return false;
  if (!openlist.includes(node)) {
    openlist.push(node);
  }
  return true;
}

function displayPath(node, nodeArray) {
  if (node.type != "startNode") {
    let adjNodes = getAdjNodes(node, nodeArray);
    let closestNode;

    closestNode = adjNodes.reduce((closest, adj) =>
      adj.distanceFromStart < closest.distanceFromStart ? adj : closest
    );
    
    window.setTimeout(() => {
      node.changeType("path");
    }, 60 * node.distanceFromStart);

    displayPath(closestNode, nodeArray);
  }
}

function recolorNode(node) {
  let { i, j } = node.location;
  if (node.type != "startNode")
    window.setTimeout(() => {
      node.changeType("visited");
    }, 50 * node.distanceFromStart);
}

function resetFscore(nodeArray) {
  nodeArray.forEach((nodeSet) => {
    nodeSet.forEach((node) => node.fScore = Infinity);
  });
}