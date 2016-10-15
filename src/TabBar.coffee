
{Type, Children} = require "modx"
{View} = require "modx/views"

assertType = require "assertType"
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
    set: (activeTab, oldTab) ->
      return if activeTab is oldTab
      assertType activeTab, Tab.Kind
      if activeTab.bar isnt this
        throw Error "Tab does not belong to this TabBar!"

      @_activeTab = activeTab
      oldTab and oldTab._onUnselect activeTab
      activeTab._onSelect oldTab

  tabs:
    get: -> @_tabs
    set: (tabs) ->

      if @_tabs.length
        throw Error "Tabs are already set!"

      tabs.forEach (tab, index) =>
        assertType tab, Tab.Kind
        if tab.bar isnt null
          throw Error "Tab already belongs to another TabBar!"

        tab.index = index
        tab.bar = this
        @_tabs.push tab
      return

type.overrideMethods

  __onInsert: (collection) ->

    if not @_tabs.length
      throw Error "Must add tabs before mounting!"

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

type.defineProps
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
    return no if not @styles.border
    return View
      style: @styles.border()

module.exports = type.build()

tryCall = (obj, key, arg) ->
  func = obj[key]
  if func and func.call
    return func.call obj, arg
  return
