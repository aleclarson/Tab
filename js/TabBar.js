var Children, Scene, Tab, Type, View, assert, assertType, ref, sync, tryCall, type;

ref = require("modx"), Type = ref.Type, Children = ref.Children;

View = require("modx/views").View;

assertType = require("assertType");

assert = require("assert");

Scene = require("Scene");

sync = require("sync");

Tab = require("./Tab");

type = Type("TabBar");

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
      this._activeTab = newValue;
      oldValue && oldValue._onUnselect(newValue);
      return newValue._onSelect(oldValue);
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

type.overrideMethods({
  __onInsert: function(collection) {
    var i, len, ref1, tab;
    assert(this._tabs.length, "Must add tabs before mounting!");
    ref1 = this._tabs;
    for (i = 0, len = ref1.length; i < len; i++) {
      tab = ref1[i];
      collection.insert(tab);
    }
  },
  __onRemove: function(collection) {
    var i, len, ref1, tab;
    ref1 = this._tabs;
    for (i = 0, len = ref1.length; i < len; i++) {
      tab = ref1[i];
      collection.remove(tab);
    }
  }
});

type.defineProps({
  children: Children
});

type.defineStyles({
  bar: {
    left: 0,
    right: 0,
    position: "absolute",
    alignItems: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff"
  }
});

type.overrideMethods({
  __renderChildren: function() {
    return View({
      style: this.styles.bar(),
      children: [this.__renderBorder(), this.props.children, this.__renderButtons()]
    });
  }
});

type.defineHooks({
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
