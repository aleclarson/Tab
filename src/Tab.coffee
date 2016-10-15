
{Type} = require "modx"

emptyFunction = require "emptyFunction"
Scene = require "Scene"
Event = require "Event"
isDev = require "isDev"

type = Type "Tab"

type.inherits Scene

type.defineOptions
  isHidden: Boolean.withDefault yes

type.defineValues

  index: null

  bar: null

type.defineProperties

  button: lazy: ->
    Button = @__loadButtonType() or Tab.Button
    button = Button {tab: this}
    if isDev and not (button instanceof Tab.Button)
      throw Error "Must return a type that inherits from Tab.Button!"
    return button

type.defineMethods

  _onSelect: (oldTab) ->
    @__setHidden no
    @__onSelect oldTab
    @button.__onSelect oldTab
    return

  _onUnselect: (newTab) ->
    @__setHidden yes
    @__onUnselect newTab
    @button.__onUnselect newTab
    return

type.defineHooks

  __setHidden: (isHidden) ->
    @isHidden = isHidden
    return

  __onSelect: emptyFunction

  __onUnselect: emptyFunction

  __loadButtonType: emptyFunction

module.exports = Tab = type.build()
