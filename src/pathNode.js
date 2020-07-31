class PathNode {
  constructor(i, j) {
    this.location = { i, j };
    this.type = "unvisited";

    this.location.toString = function () {
      return `${i},${j}`;
    };

    this.distanceFromStart = Infinity;
    this.distanceFromAdj = 1;
  }

  changeLocation = function (i, j) {
    this.location = { i, j };
  };
  getLocation = function () {
    return location;
  };
  changeTypeHelper = function (type) {
    if (["startNode", "endNode"].includes(this.type)) return this.type;
    if (this.type == type) return "unvisited";
    return type;
  };
  changeType = function (type) {
    type = this.changeTypeHelper(type);
    this.type = type;
    document.getElementById(this.location.toString()).className = type;
  };
  removeStartEndType = function () {
    this.type = "unvisited";
    this.distance = Infinity;
    document.getElementById(this.location.toString()).className = "unvisited";
  }
}

export default PathNode;
