
{ assert, assertType } = require "type-utils"
{ Component, View } = require "component"

Scene = require "Scene"
sync = require "sync"

Tab = require "./Tab"

type = Component.Model "TabBar"

type.inherits Scene

type.argumentTypes =
  tabs: Array

type.defineValues

  _activeTab: null

  _tabs: -> []

type.defineProperties

  activeTab:
    get: -> @_activeTab
    set: (newValue, oldValue) ->
      return if newValue is oldValue

      assertType newValue, Tab.Kind
      assert (this is newValue.bar), "Tab does not belong to this TabBar!"

      if oldTab?
        return if activeTab is oldTab
        oldTab.button.__onUnselect activeTab
        for scene in oldTab.scenes
          scene.isHidden = yes

      @_activeTab = activeTab
      activeTab.button.__onSelect oldTab
      for scene in activeTab.scenes
        scene.isHidden = no

type.initInstance (tabs) ->
  for tab in tabs
    assertType tab, Tab.Kind
    assert (tab.bar is null), "Tab already belongs to another TabBar!"
    tab.bar = this
    @_tabs.push tab
  return

type.defineStyles

  bar:
    flexDirection: "row"
    alignItems: "stretch"

type.render -> @__renderBar()

type.defineMethods

  __renderBar: (props) ->
    return View
      style: @styles.bar
      children: [
        props.children
        @__renderButtons()
      ]

  __renderButtons: ->
    sync.map @_tabs, (tab) ->
      tab.button.render()

# type.overrideMethods
#
#   __onInsert: (collection) ->
#     collection.insert tab for tab in @_tabs
#
#   __onRemove: (collection) ->
#     collection.remove tab for tab in @_tabs

module.exports = type.build()
