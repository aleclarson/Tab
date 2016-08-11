var Button, Tab, Type, emptyFunction, fromArgs, type;

Type = require("modx").Type;

emptyFunction = require("emptyFunction");

fromArgs = require("fromArgs");

Button = require("Button");

Tab = require("./Tab");

type = Type("TabButton");

type.inherits(Button);

type.defineOptions({
  tab: Tab.Kind.isRequired
});

type.defineValues({
  tab: fromArgs("tab")
});

type.defineHooks({
  __onTap: emptyFunction,
  __onSelect: emptyFunction,
  __onUnselect: emptyFunction
});

type.defineListeners(function() {
  return this.didTap((function(_this) {
    return function() {
      _this.tab.bar.activeTab = _this.tab;
      return _this.__onTap();
    };
  })(this));
});

module.exports = type.build();

//# sourceMappingURL=map/TabButton.map
