class Node {
    constructor(node) {}
    beforeInvoke = () => {};
    onInvoke = () => {};
    onDestory = () => {};
    next = () => {};
}

class generateNodeClass {
    constructor() {}
}

class nodeHandler {
    constructor() {
        this.flags = [];
        this.history = [];
        this.scene = []; // current displayed node
        this.currentScene = [];
        this.observers = [];
    }
    nodeEnter = (node) => {
        node.beforeInvoke();
        // this.scene.push
        this.notifyAllObservers();
    };

    nodeExit = (node) => {
        // this.scene.pop
        // this.history.push
        node.onDestory();
        this.notifyAllObservers();
    };

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
        for (let index = 0; index < this.observers.length; index++) {
            this.observers[index]([event, "data"]);
        }
    };
}