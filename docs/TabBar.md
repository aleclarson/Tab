
# Tab.Bar

`Tab.Bar` inherits from the [`Scene`](github.com/aleclarson/Scene) type.

**NOTE:** No extra options are currently added to `Scene.optionTypes`.

### Properties

`Tab.Bar` provides a few core properties.

```coffee
# Get the currently selected tab.
this.activeTab

# Get an array of all tabs.
this.tabs
```

### Styles

`Tab.Bar` provides some default styles.

**NOTE:** Remember that styles are also inherited from `Scene.styles`!

```coffee
# The base style of the tab bar.
contents:
  left: 0
  right: 0
  position: "absolute"
  alignItems: "stretch"
  flexDirection: "row"
  backgroundColor: "#fff"
```

### Hooks

`Tab.Bar` provides some hooks for safe overriding.

```coffee
__renderButtons: ->
  # Returns an array of ReactElement objects,
  # one element for each tab.

__renderBorder: ->
  # Returns a border if `styles.border`
  # is defined by the subclass.
```

#### Internal Overrides

`Tab.Bar` overrides some methods internally.
If you must override one of these methods,
call `this.__super(arguments)` if you don't
want to lose the functionality below.

```coffee
__onInsert: ->
  # When the Tab.Bar is inserted into a Scene.Collection,
  # it inserts each of its tabs into the same collection.

__onRemove: ->
  # When the Tab.Bar is removed from its Scene.Collection,
  # it removes each of its tabs from the same collection.

__renderChildren: ->
  # Renders this hierarchy:
  #   border (optional)
  #   `props.children`
  #   tab buttons
```
