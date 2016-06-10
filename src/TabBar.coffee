
{ Component, View, Children } = require "component"

assertType = require "assertType"
assert = require "assert"
Scene = require "Scene"
sync = require "sync"

Tab = require "./Tab"

type = Component.Type "TabBar"

type.inherits Scene

type.defineValues

  _activeTab: null

  _tabs: -> []

type.defineProperties

  activeTab:
    get: -> @_activeTab
    set: (newValue, oldValue) ->
      return if newValue is oldValue
      assertType newValue, Tab.Kind
      assert this is newValue.bar, "Tab does not belong to this TabBar!"
      @_unselectTab oldValue, newValue if oldValue
      @_selectTab newValue, oldValue

  tabs:
    get: -> @_tabs
    set: (tabs) ->
      assert not @_tabs.length, "Tabs are already set!"
      for tab in tabs
        assertType tab, Tab.Kind
        assert (tab.bar is null), "Tab already belongs to another TabBar!"
        tab.bar = this
        @_tabs.push tab
      return

type.defineMethods

  _selectTab: (tab, oldTab) ->
    @_activeTab = tab
    tryCall tab.button, "__onSelect", oldTab
    for scene in tab.scenes
      scene.isHidden = no
    return

  _unselectTab: (tab, newTab) ->
    tryCall tab.button, "__onUnselect", newTab
    for scene in tab.scenes
      scene.isHidden = yes
    return

type.overrideMethods

  __onInsert: (collection) ->
    assert @_tabs.length, "Must add tabs before mounting!"
    collection.insert tab for tab in @_tabs

  __onRemove: (collection) ->
    collection.remove tab for tab in @_tabs

#
# Rendering
#

type.propTypes =
  children: Children

type.defineStyles

  bar:
    alignItems: "stretch"
    flexDirection: "row"
    backgroundColor: "#fff"
    position: "absolute"
    left: 0
    right: 0

  # If defined, a border will be rendered.
  border: null

type.overrideMethods

  __renderContent: ->
    return View
      style: @styles.bar()
      children: @__renderChildren()

  __renderChildren: -> [
    @__renderBorder()
    @props.children
    @__renderButtons()
  ]

type.defineMethods

  __renderButtons: ->
    sync.map @_tabs, (tab) ->
      tab.button.render()

  __renderBorder: ->
    return if not @styles.border
    return View
      style: @styles.border()

module.exports = type.build()

tryCall = (obj, key, arg) ->
  func = obj[key]
  if func and func.call
    return func.call obj, arg
  return
