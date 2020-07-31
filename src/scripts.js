import PathNode from "./pathNode.js";
import startDijkstras from "./dijkstras.js"

const row = 20;
const col = 30;
let nodeArray = [];
let mouseclicked = false;
let wPressed = false;
let startCoords = [0,0];
let endCoords = [row-1, col-1];
let draggingEndNode = false;
let draggingStartNode = false;

const table = document.querySelector(".gridTable");

function createGrid() {
  let gridHTML = "";
  for (let i = 0; i < row; i++) {
    gridHTML += "<tr id='row" + i.toString + "'>";
    nodeArray.push([]);
    for (let j = 0; j < col; j++) {
      gridHTML +=
        "<td id='" +
        i.toString() +
        "," +
        j.toString() +
        "' class='unexplored'></td>";
      nodeArray[i].push(new PathNode(i, j));
    }
    gridHTML += "</tr>";
  }
  table.innerHTML = gridHTML;
}

function clearGrid(e) {
  e.preventDefault();
  nodeArray.forEach((nodeSet) => {
    nodeSet.forEach((node) => node.changeType("unexplored"));
  });
}

function setStartNode(coords){
  //coords is a 2 element array. 0 is the row, 1 is the col
  startCoords = coords;
  nodeArray[coords[0]][coords[1]].changeType("startNode");
  nodeArray[coords[0]][coords[1]].distanceFromStart = 0;
}
function setEndNode(coords){
  //coords is a 2 element array. 0 is the row, 1 is the col
  endCoords = coords;
  nodeArray[coords[0]][coords[1]].changeType("endNode");
}

function cellhovered(i, j, e) {
  e.preventDefault();
  if(draggingEndNode){
    setEndNode([i,j]);
  };
  if(draggingStartNode){
    setStartNode([i,j]);
  };
  if (mouseclicked && !wPressed) nodeArray[i][j].changeType("wall");
  if (mouseclicked && wPressed) nodeArray[i][j].changeType("weight");
}

function startEndNodeDrag(i, j){
  if(draggingEndNode || draggingStartNode){
    nodeArray[i][j].removeStartEndType();
  }
}

function toggleDragging(i,j){
  if([i,j].toString() == startCoords.toString()){
    draggingStartNode = !draggingStartNode;
  }else if ([i,j].toString() == endCoords.toString()){
    draggingEndNode = !draggingEndNode;
  }
}

function nodeListeners(element, i, j) {
  element.addEventListener("mouseover", (e) => cellhovered(i, j, e));
  element.addEventListener("mousedown", (e) => {
    mouseclicked = true;
    cellhovered(i, j, e);
  });
  element.addEventListener('click', () => toggleDragging(i,j));
  element.addEventListener('mouseout', () => startEndNodeDrag(i,j));
}

function addNodeListeners() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      nodeListeners(document.getElementById(`${i},${j}`), i, j);
    }
  }
}

function addWindowsListeners() {
  window.addEventListener("mousedown", () => (mouseclicked = true));
  window.addEventListener("mouseup", () => (mouseclicked = false));
  window.addEventListener("keydown", (e) => {
    if (e.which == 87) wPressed = true;
  });
  window.addEventListener("keyup", (e) => {
    if (e.which == 87) wPressed = false;
  });
}

createGrid();
addWindowsListeners();
table.addEventListener("mousedown", (e) => e.preventDefault());
document
  .getElementById("clearButton")
  .addEventListener("click", (e) => clearGrid(e));
addNodeListeners();
setStartNode(startCoords);
setEndNode(endCoords);


startDijkstras(nodeArray);


















//TODO
//bug while dragging start/end the other can be deleted by hovering over it
//hold click drag start/end