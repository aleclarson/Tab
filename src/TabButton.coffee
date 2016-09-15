
{Type} = require "modx"

emptyFunction = require "emptyFunction"
fromArgs = require "fromArgs"
Button = require "Button"

Tab = require "./Tab"

type = Type "TabButton"

type.inherits Button

type.defineOptions
  tab: Tab.Kind.isRequired

type.defineValues

  tab: fromArgs "tab"

type.defineHooks

  __onTap: emptyFunction

  __onSelect: emptyFunction

  __onUnselect: emptyFunction

type.defineMountedListeners ->

  @didTap =>
    @tab.bar.activeTab = @tab
    @__onTap()

module.exports = type.build()
