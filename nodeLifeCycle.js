class nodeHandler {
  constructor(template) {
    this.template = template;
    this.flags = [];
    this.history = [];
    this.currentScene = []; // current displayed node
    this.observers = [];
    this.initial = template.data.initial;
    this.currentNode;
  }
  addFlag = (flag) => {};
  isFlagExist = (flag) => {}; // return if flag existe in this.flags or not
  getNode = (keyNode) => {}; // get node from template and return  {key,schema}
  getNodeSchema = (keyNode) => {}; // get schema from template and return schema
  createNode = (keyNode) => {}; // use NodeFactory to create node instance
  nodeEnter = (node) => {
    node.beforeInvoke();
    this.currentScene.push(node);
    this.notifyAllObservers();
  };
  nodeExit = (node) => {
    // this.currentScene.shift
    // this.history.push
    // TODO : maybe search for node in currentScene and delete
    node.onDestory();
    this.notifyAllObservers();
  };

  // Observer functions
  subscribeObserver = (observer) => {
    var index = this.observers.indexOf(observer);
    if (index === -1) {
      this.observers.push(observer);
      return;
    }
    console.error(
      `this observer ${observer.name} exist in observers ${this.observers}`
    );
  };
  unsubscribeObserver = (observer) => {
    var index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  };
  notifyObserver = (observer) => {
    var index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers[index]("data");
    }
  };
  notifyAllObservers = (event = "default") => {
    // event used to define the type of the action (add,delete,modify)
    for (let index = 0; index < this.observers.length; index++) {
      this.observers[index]([event, "data"]);
    }
  };
}

class Node {
  constructor(node, controller) {
    // node definition
    this.uniqueId;
    this.nodeFlags = [];
    this.divert = null;
    this.general = schema[0];
    this.schema = node.schema;
    this.key = node.key;
    // node control
    this.calledNext = false;
  }
  init = () => {};
  beforeInvoke = () => {};
  onInvoke = () => {};
  onDestory = () => {};
  next = () => {};
  onEnd = () => {};
  equal = (node) => {};
  next = (nodeKey) => {};
}

class VideoNode extends Node {
  constructor(node, controller) {
    super(node, controller);
  }
}

class GateNode extends Node {
  constructor(node, controller) {
    super(node, controller);
    // node definition
    this.options = [];
  }
  gateInit = () => {};
}

class NodeFactory {
  constructor(node, ...props) {
    if (type === "video") return new VideoNode(node, ...props);
    if (type === "gate") return new GateNode(node, ...props);
    if(type === "text") return new TextNode(node, ...props);
    if(type === "imageFromVideo") return ImageFromVideoNode(node, ...props)
    if(type === "image") return ImageNode(node, ...props)
  }
}
