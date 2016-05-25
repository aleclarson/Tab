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

type.defineListeners(function() {
  return sync.each(this._tabs, (function(_this) {
    return function(tab) {
      return tab.button.didTap(function() {
        return tab.button.__onTap();
      });
    };
  })(this));
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

type.propTypes = {
  children: Children
};

type.defineStyles({
  bar: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  border: null
});

type.overrideMethods({
  __renderContent: function() {
    return View({
      style: this.styles.bar(),
      children: this.__renderChildren()
    });
  }
});

type.defineMethods({
  __renderChildren: function() {
    return [this.props.children, this.__renderButtons()];
  },
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

//# sourceMappingURL=../../map/src/TabBar.map
