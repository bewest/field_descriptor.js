
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
  domplate: 'domplate'
  initialize: ( ) ->
    _.bindAll(@)
    if @model
      @json(@model.toJSON( ))
      @render_domplates( )
    @
  render_domplates: (json, binding) ->
    if binding
      @templateSettings.variable = binding
    if @json(json)
      _.each(@$el.data(@domplate).split(/\s+/), @template)
    @
  json: (json) ->
    if json
      @_json = json
    @_json
  template: (attr) ->
    if formatter = @$el.data("#{@domplate}-#{attr}") or
       formatter = @$el.attr(attr)
      data   = @json( )
      result = _.template(formatter, data, @templateSettings)
      @$el.attr(attr, result)
)


