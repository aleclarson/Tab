
{Type} = require "modx"

emptyFunction = require "emptyFunction"
Scene = require "Scene"
Event = require "Event"

type = Type "Tab"

type.inherits Scene

type.defineOptions
  isHidden: Boolean.withDefault yes

type.defineValues

  bar: null

type.defineFrozenValues

  _scenes: -> Scene.Chain {@isHidden}

type.defineProperties

  button: lazy: ->
    button = @__loadButtonType() {tab: this}
    unless button instanceof Tab.Button
      throw Error "Must return a type that inherits from Tab.Button!"
    return button

type.defineGetters

  activeScene: ->
    @_scenes.last

  scenes: ->
    @_scenes.scenes

  sceneNames: ->
    @scenes.map (scene) -> scene.__name

type.defineMethods

  push: (scene) ->
    @_scenes.push scene
    return

  pop: ->
    @_scenes.pop()
    return

  _onSelect: (oldTab) ->
    @__onSelect oldTab
    @button.__onSelect oldTab
    return

  _onUnselect: (newTab) ->
    @__onUnselect newTab
    @button.__onUnselect newTab
    return

type.defineHooks

  __onSelect: ->
    @isHidden = no
    @_scenes.isHidden = no
    return

  __onUnselect: ->
    @isHidden = yes
    @_scenes.isHidden = yes
    return

  __loadButtonType: ->
    return Tab.Button

type.overrideMethods

  __onInsert: (collection) ->
    @_scenes.collection = collection

  __onRemove: ->
    @_scenes.collection = null

type.defineStatics

  Bar: lazy: ->
    require "./TabBar"

  Button: lazy: ->
    require "./TabButton"

module.exports = Tab = type.build()
