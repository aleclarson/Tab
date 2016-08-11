
{Type, Children} = require "modx"
{View} = require "modx/views"

assertType = require "assertType"
assert = require "assert"
Scene = require "Scene"
sync = require "sync"

Tab = require "./Tab"

type = Type "TabBar"

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
      @_activeTab = newValue
      oldValue and oldValue._onUnselect newValue
      newValue._onSelect oldValue

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

type.overrideMethods

  __onInsert: (collection) ->
    assert @_tabs.length, "Must add tabs before mounting!"
    for tab in @_tabs
      collection.insert tab
    return

  __onRemove: (collection) ->
    for tab in @_tabs
      collection.remove tab
    return

#
# Rendering
#

type.propTypes =
  children: Children

type.defineStyles

  bar:
    left: 0
    right: 0
    position: "absolute"
    alignItems: "stretch"
    flexDirection: "row"
    backgroundColor: "#fff"

type.overrideMethods

  __renderChildren: ->
    return View
      style: @styles.bar()
      children: [
        @__renderBorder()
        @props.children
        @__renderButtons()
      ]

type.defineHooks

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
