var Component, Event, Scene, Tab, assert, type;

Component = require("component").Component;

assert = require("assert");

Scene = require("Scene");

Event = require("event");

type = Component.Type("Tab");

type.inherits(Scene);

type.defineProperties({
  button: {
    lazy: function() {
      var Button, button;
      Button = this.__loadButtonType();
      button = Button({
        tab: this
      });
      assert(button instanceof Tab.Button, "Tab::__loadButtonType must return a type that inherits from Tab.Button!");
      return button;
    }
  },
  activeScene: {
    get: function() {
      return this._children.last;
    }
  },
  scenes: {
    get: function() {
      return this._children.scenes;
    }
  },
  sceneNames: {
    get: function() {
      return this.scenes.map(function(scene) {
        return scene.__name;
      });
    }
  }
});

type.defineValues({
  bar: null
});

type.defineFrozenValues({
  _children: function() {
    return Scene.Chain();
  }
});

type.initInstance(function() {
  return this._children.push(this);
});

type.definePrototype({
  _buttonType: {
    lazy: function() {
      return this.__loadButtonType();
    }
  }
});

type.defineMethods({
  push: function(scene) {
    this._children.push(scene);
    this._collection.insert(scene);
  },
  pop: function() {
    var scene;
    scene = this.activeScene;
    if (scene == null) {
      return;
    }
    this._children.pop();
    this._collection.remove(scene);
  },
  __loadButtonType: function() {
    return Tab.Button;
  }
});

type.overrideMethods({
  __getChildren: function() {
    return this._children;
  }
});

type.defineStatics({
  Bar: {
    lazy: function() {
      return require("./TabBar");
    }
  },
  Button: {
    lazy: function() {
      return require("./TabButton");
    }
  }
});

module.exports = Tab = type.build();

//# sourceMappingURL=../../map/src/Tab.map
