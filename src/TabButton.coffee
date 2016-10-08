
{Type} = require "modx"

emptyFunction = require "emptyFunction"
Button = require "Button"

Tab = require "./Tab"

type = Type "TabButton"

type.inherits Button

type.defineOptions
  tab: Tab.Kind.isRequired

type.defineValues (options) ->

  tab: options.tab

type.defineHooks

  __onTap: ->
    @tab.bar.activeTab = @tab
    return

  __onSelect: emptyFunction

  __onUnselect: emptyFunction

type.defineMountedListeners ->

  @didTap => @__onTap()

module.exports = type.build()
