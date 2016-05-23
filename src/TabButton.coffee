
{ Component } = require "component"

getArgProp = require "getArgProp"
Button = require "Button"

Tab = require "./Tab"

type = Component.Type "TabButton"

type.inherits Button

type.optionTypes =
  tab: Tab.Kind

type.defineValues

  tab: getArgProp "tab"

type.defineMethods

  __onTap: ->
    @tab.bar.activeTab = @tab

  __onSelect: emptyFunction

  __onUnselect: emptyFunction

module.exports = type.build()
