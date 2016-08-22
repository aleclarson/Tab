var Event, Scene, Tab, Type, emptyFunction, type;

Type = require("modx").Type;

emptyFunction = require("emptyFunction");

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
  _scenes: function() {
    return Scene.Chain({
      isHidden: this.isHidden
    });
  }
});

type.defineProperties({
  button: {
    lazy: function() {
      var button;
      button = this.__loadButtonType()({
        tab: this
      });
      if (!(button instanceof Tab.Button)) {
        throw Error("Must return a type that inherits from Tab.Button!");
      }
      return button;
    }
  }
});

type.defineGetters({
  activeScene: function() {
    return this._scenes.last;
  },
  scenes: function() {
    return this._scenes.scenes;
  },
  sceneNames: function() {
    return this.scenes.map(function(scene) {
      return scene.__name;
    });
  }
});

type.defineMethods({
  push: function(scene) {
    this._scenes.push(scene);
  },
  pop: function() {
    this._scenes.pop();
  },
  _onSelect: function(oldTab) {
    this.isHidden = false;
    this._scenes.isHidden = false;
    this.__onSelect(oldTab);
    this.button.__onSelect(oldTab);
  },
  _onUnselect: function(newTab) {
    this.isHidden = true;
    this._scenes.isHidden = true;
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
    return this._scenes.collection = collection;
  },
  __onRemove: function() {
    return this._scenes.collection = null;
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
