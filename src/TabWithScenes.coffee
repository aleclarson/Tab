
{Type} = require "modx"

Scene = require "Scene"

Tab = require "./Tab"

type = Type "TabWithScenes"

type.inherits Tab

type.defineFrozenValues

  _scenes: -> Scene.Chain {@isHidden}

type.defineGetters

  activeScene: -> @_scenes.last

  scenes: -> @_scenes.scenes

  sceneNames: -> @scenes.map (scene) -> scene.__name

type.defineMethods

  push: (scene) ->
    @_scenes.push scene
    return

  pop: ->
    @_scenes.pop()
    return

type.overrideMethods

  __setHidden: (isHidden) ->
    @isHidden = isHidden
    @_scenes.isHidden = isHidden
    return

  __onInsert: (collection) ->
    @_scenes.collection = collection
    return

  __onRemove: ->
    @_scenes.collection = null
    return

module.exports = type.build()
