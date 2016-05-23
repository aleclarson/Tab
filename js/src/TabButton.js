var Button, Component, Tab, getArgProp, type;

Component = require("component").Component;

getArgProp = require("getArgProp");

Button = require("Button");

Tab = require("./Tab");

type = Component.Type("TabButton");

type.inherits(Button);

type.optionTypes = {
  tab: Tab.Kind
};

type.defineValues({
  tab: getArgProp("tab")
});

type.defineMethods({
  __onTap: function() {
    return this.tab.bar.activeTab = this.tab;
  },
  __onSelect: emptyFunction,
  __onUnselect: emptyFunction
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/TabButton.map
