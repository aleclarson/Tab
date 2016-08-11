var Event, Scene, Tab, Type, assert, emptyFunction, type;

Type = require("modx").Type;

emptyFunction = require("emptyFunction");

assert = require("assert");

Scene = require("Scene");

Event = require("Event");

type = Type("Tab");

type.inherits(Scene);

type.defineOptions({
  isHidden: Boolean.withDefault(true)
});

type.defineValues({
  bar: null
});

type.defineFrozenValues({
  _children: function() {
    return Scene.Chain({
      isHidden: this.isHidden
    });
  }
});

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
  }
});

type.defineGetters({
  activeScene: function() {
    return this._children.last;
  },
  scenes: function() {
    return this._children.scenes;
  },
  sceneNames: function() {
    return this.scenes.map(function(scene) {
      return scene.__name;
    });
  }
});

type.defineMethods({
  push: function(scene) {
    this._children.push(scene);
  },
  pop: function() {
    this._children.pop();
  },
  _onSelect: function(oldTab) {
    this.isHidden = false;
    this._children.isHidden = false;
    this.__onSelect(oldTab);
    this.button.__onSelect(oldTab);
  },
  _onUnselect: function(newTab) {
    this.isHidden = true;
    this._children.isHidden = true;
    this.__onUnselect(newTab);
    this.button.__onUnselect(newTab);
  }
});

type.defineHooks({
  __onSelect: emptyFunction,
  __onUnselect: emptyFunction,
  __loadButtonType: function() {
    return Tab.Button;
  }
});

type.overrideMethods({
  __onInsert: function(collection) {
    return this._children.collection = collection;
  },
  __onRemove: function() {
    return this._children.collection = null;
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

//# sourceMappingURL=map/Tab.map
