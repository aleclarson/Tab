var Component, Scene, Tab, View, assert, assertType, ref, ref1, sync, type;

ref = require("type-utils"), assert = ref.assert, assertType = ref.assertType;

ref1 = require("component"), Component = ref1.Component, View = ref1.View;

Scene = require("Scene");

sync = require("sync");

Tab = require("./Tab");

type = Component.Model("TabBar");

type.inherits(Scene);

type.argumentTypes = {
  tabs: Array
};

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
      var i, j, len, len1, ref2, ref3, results, scene;
      if (newValue === oldValue) {
        return;
      }
      assertType(newValue, Tab.Kind);
      assert(this === newValue.bar, "Tab does not belong to this TabBar!");
      if (typeof oldTab !== "undefined" && oldTab !== null) {
        if (activeTab === oldTab) {
          return;
        }
        oldTab.button.__onUnselect(activeTab);
        ref2 = oldTab.scenes;
        for (i = 0, len = ref2.length; i < len; i++) {
          scene = ref2[i];
          scene.isHidden = true;
        }
      }
      this._activeTab = activeTab;
      activeTab.button.__onSelect(oldTab);
      ref3 = activeTab.scenes;
      results = [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        scene = ref3[j];
        results.push(scene.isHidden = false);
      }
      return results;
    }
  }
});

type.initInstance(function(tabs) {
  var i, len, tab;
  for (i = 0, len = tabs.length; i < len; i++) {
    tab = tabs[i];
    assertType(tab, Tab.Kind);
    assert(tab.bar === null, "Tab already belongs to another TabBar!");
    tab.bar = this;
    this._tabs.push(tab);
  }
});

type.defineStyles({
  bar: {
    flexDirection: "row",
    alignItems: "stretch"
  }
});

type.render(function() {
  return this.__renderBar();
});

type.defineMethods({
  __renderBar: function(props) {
    return View({
      style: this.styles.bar,
      children: [props.children, this.__renderButtons()]
    });
  },
  __renderButtons: function() {
    return sync.map(this._tabs, function(tab) {
      return tab.button.render();
    });
  }
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/TabBar.map
