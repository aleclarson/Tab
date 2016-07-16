var Children, Component, Scene, Tab, View, assert, assertType, ref, sync, tryCall, type;

ref = require("component"), Component = ref.Component, View = ref.View, Children = ref.Children;

assertType = require("assertType");

assert = require("assert");

Scene = require("Scene");

sync = require("sync");

Tab = require("./Tab");

type = Component.Type("TabBar");

type.inherits(Scene);

type.defineValues({
  _activeTab: null,
  _tabs: function() {
    return [];
  }
});

type.defineProperties({
  activeTab: {
    get: function() {
      return this._activeTab;
    },
    set: function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      assertType(newValue, Tab.Kind);
      assert(this === newValue.bar, "Tab does not belong to this TabBar!");
      if (oldValue) {
        this._unselectTab(oldValue, newValue);
      }
      return this._selectTab(newValue, oldValue);
    }
  },
  tabs: {
    get: function() {
      return this._tabs;
    },
    set: function(tabs) {
      var i, len, tab;
      assert(!this._tabs.length, "Tabs are already set!");
      for (i = 0, len = tabs.length; i < len; i++) {
        tab = tabs[i];
        assertType(tab, Tab.Kind);
        assert(tab.bar === null, "Tab already belongs to another TabBar!");
        tab.bar = this;
        this._tabs.push(tab);
      }
    }
  }
});

type.defineMethods({
  _selectTab: function(tab, oldTab) {
    var i, len, ref1, scene;
    this._activeTab = tab;
    tryCall(tab.button, "__onSelect", oldTab);
    ref1 = tab.scenes;
    for (i = 0, len = ref1.length; i < len; i++) {
      scene = ref1[i];
      scene.isHidden = false;
    }
  },
  _unselectTab: function(tab, newTab) {
    var i, len, ref1, scene;
    tryCall(tab.button, "__onUnselect", newTab);
    ref1 = tab.scenes;
    for (i = 0, len = ref1.length; i < len; i++) {
      scene = ref1[i];
      scene.isHidden = true;
    }
  }
});

type.overrideMethods({
  __onInsert: function(collection) {
    var i, len, ref1, results, tab;
    assert(this._tabs.length, "Must add tabs before mounting!");
    ref1 = this._tabs;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      tab = ref1[i];
      results.push(collection.insert(tab));
    }
    return results;
  },
  __onRemove: function(collection) {
    var i, len, ref1, results, tab;
    ref1 = this._tabs;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      tab = ref1[i];
      results.push(collection.remove(tab));
    }
    return results;
  }
});

type.propTypes = {
  children: Children
};

type.defineStyles({
  bar: {
    alignItems: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0
  },
  border: null
});

type.overrideMethods({
  __renderContent: function() {
    return View({
      style: this.styles.bar(),
      children: this.__renderChildren()
    });
  },
  __renderChildren: function() {
    return [this.__renderBorder(), this.props.children, this.__renderButtons()];
  }
});

type.defineMethods({
  __renderButtons: function() {
    return sync.map(this._tabs, function(tab) {
      return tab.button.render();
    });
  },
  __renderBorder: function() {
    if (!this.styles.border) {
      return;
    }
    return View({
      style: this.styles.border()
    });
  }
});

module.exports = type.build();

tryCall = function(obj, key, arg) {
  var func;
  func = obj[key];
  if (func && func.call) {
    return func.call(obj, arg);
  }
};

//# sourceMappingURL=map/TabBar.map