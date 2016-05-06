
{ Component } = require "component"
{ assert } = require "type-utils"

Scene = require "Scene"

type = Component.Model "Tab"

type.inherits Scene

type.defineProperties

  button: lazy: ->
    Button = @__loadButtonType()
    Button { tab: this }

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
    throw Error "Subclass must override!"

type.defineStatics

  Bar: lazy: ->
    require "./TabBar"

module.exports = type.build()
