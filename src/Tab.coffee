
{ Component } = require "component"

assert = require "assert"
Scene = require "Scene"
Event = require "event"

type = Component.Type "Tab"

type.inherits Scene

type.defineProperties

  button: lazy: ->
    Button = @__loadButtonType()
    button = Button { tab: this }
    assert button instanceof Tab.Button, "Tab::__loadButtonType must return a type that inherits from Tab.Button!"
    return button

  activeScene: get: ->
    @_children.last

  scenes: get: ->
    @_children.scenes

  sceneNames: get: ->
    @scenes.map (scene) -> scene.__name

type.defineValues

  bar: null

type.defineFrozenValues

  _children: -> Scene.Chain()

type.initInstance ->

  @_children.push this

type.definePrototype

  _buttonType: lazy: ->
    @__loadButtonType()

type.defineMethods

  push: (scene) ->
    @_children.push scene
    @_collection.insert scene
    return

  pop: ->
    scene = @activeScene
    return unless scene?
    @_children.pop()
    @_collection.remove scene
    return

  __loadButtonType: ->
    Tab.Button

type.overrideMethods

  __getChildren: ->
    @_children

type.defineStatics

  Bar: lazy: ->
    require "./TabBar"

  Button: lazy: ->
    require "./TabButton"

module.exports = Tab = type.build()
