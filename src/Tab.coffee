
{Type} = require "modx"

emptyFunction = require "emptyFunction"
assert = require "assert"
Scene = require "Scene"
Event = require "Event"

type = Type "Tab"

type.inherits Scene

type.defineOptions
  isHidden: Boolean.withDefault yes

type.defineValues

  bar: null

type.defineFrozenValues

  _children: -> Scene.Chain { @isHidden }

type.defineProperties

  button: lazy: ->
    Button = @__loadButtonType()
    button = Button { tab: this }
    assert button instanceof Tab.Button, "Tab::__loadButtonType must return a type that inherits from Tab.Button!"
    return button

type.defineGetters

  activeScene: ->
    @_children.last

  scenes: ->
    @_children.scenes

  sceneNames: ->
    @scenes.map (scene) -> scene.__name

type.defineMethods

  push: (scene) ->
    @_children.push scene
    return

  pop: ->
    @_children.pop()
    return

  _onSelect: (oldTab) ->
    @isHidden = no
    @_children.isHidden = no
    @__onSelect oldTab
    @button.__onSelect oldTab
    return

  _onUnselect: (newTab) ->
    @isHidden = yes
    @_children.isHidden = yes
    @__onUnselect newTab
    @button.__onUnselect newTab
    return

type.defineHooks

  __onSelect: emptyFunction

  __onUnselect: emptyFunction

  __loadButtonType: ->
    return Tab.Button

type.overrideMethods

  __onInsert: (collection) ->
    @_children.collection = collection

  __onRemove: ->
    @_children.collection = null

type.defineStatics

  Bar: lazy: ->
    require "./TabBar"

  Button: lazy: ->
    require "./TabButton"

module.exports = Tab = type.build()
