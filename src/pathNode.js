class PathNode {
  constructor(i, j) {
    this.location = { i, j };
    this.type = "unvisited";

    this.location.toString = function () {
      return `${i},${j}`;
    };

    this.distanceFromStart = Infinity;
    this.distanceFromAdj = 1;
    this.fScore = Infinity;
  }

  changeLocation = function (i, j) {
    this.location = { i, j };
  };
  getLocation = function () {
    return location;
  };

  isStartOrEnd = function () {
    return this.type == "startNode" || this.type == "endNode";
  };

  changeType = function (type) {
    switch (type) {
      case "startNode":
        if (this.type != "endNode") {
          this.distanceFromStart = 0;
          this.type = type;
          document.getElementById(this.location.toString()).className = type;
        }
        break;
      case "endNode":
        if (this.type != "startNode") {
          this.distanceFromStart = Infinity;
          this.type = type;
          document.getElementById(this.location.toString()).className = type;
        }
        break;
      case "unvisited":
        if (!this.isStartOrEnd()) {
          this.distanceFromStart = Infinity;
          this.type = type;
          this.distanceFromAdj = 1;
          document.getElementById(this.location.toString()).className = type;
        }
        break;
      case "visited":
        if (!this.isStartOrEnd() && this.type != "weight") {
          this.type = type;
          document.getElementById(this.location.toString()).className = type;
        }
        break;
      case "wall":
        if (!this.isStartOrEnd()) {
          this.distanceFromStart = Infinity;
          this.type != "wall"
            ? (this.type = "wall")
            : (this.type = "unvisited");
          document.getElementById(
            this.location.toString()
          ).className = this.type;
        }
        break;
      case "weight":
        if (!this.isStartOrEnd()) {
          this.distanceFromStart = Infinity;
          this.type != type ? (this.type = type) : (this.type = "unvisited");
          document.getElementById(
            this.location.toString()
          ).className = this.type;
          this.distanceFromAdj = 5;
        }
        break;
      case "path":
        if (!this.isStartOrEnd()) {
          //this.distanceFromStart = Infinity;
          this.type != type ? (this.type = type) : (this.type = "unvisited");
          document.getElementById(
            this.location.toString()
          ).className = this.type;
        }
        break;
      default:
        break;
    }
  };
  removeStartEndType = function () {
    this.type = "unvisited";
    this.distanceFromStart = Infinity;
    document.getElementById(this.location.toString()).className = "unvisited";
  };
}

export default PathNode;
