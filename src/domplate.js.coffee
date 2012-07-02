
window.Domplate = Backbone.View.extend(
  ###
  Domplate: is intended to run once in order to set up unique names
  ids, and things.  It integrates with html5's microdata to declare
  which attributes need their attributes re-written with specially
  templated values.  This is used to generate correct indices for
  items belonging to a row.
  ###
  templateSettings:
    interpolate: /\{\{(.+?)\}\}/g
    variable: 'model'
  initialize: ( ) ->
    _.bindAll(@)
    _.each(@$el.data('domplate').split(/\s+/), @template)
  template: (attr) ->
    if value = @$el.attr(attr)
      data   = @model.toJSON( )
      result = _.template(value, data, @templateSettings)
      @$el.attr(attr, result)
)


