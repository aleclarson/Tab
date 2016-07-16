var Button, Component, Tab, fromArgs, type;

Component = require("component").Component;

fromArgs = require("fromArgs");

Button = require("Button");

Tab = require("./Tab");

type = Component.Type("TabButton");

type.inherits(Button);

type.optionTypes = {
  tab: Tab.Kind
};

type.defineValues({
  tab: fromArgs("tab")
});

type.defineMethods({
  __onTap: function() {
    return this.tab.bar.activeTab = this.tab;
  },
  __onSelect: emptyFunction,
  __onUnselect: emptyFunction
});

type.defineListeners(function() {
  return this.didTap((function(_this) {
    return function() {
      return _this.__onTap();
    };
  })(this));
});

module.exports = type.build();

//# sourceMappingURL=map/TabButton.map
