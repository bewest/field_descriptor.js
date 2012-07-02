window.FieldDescriptor = Backbone.View.extend(
  ###
    FieldDescriptor automatically generates CSS selectors from a
    a Model by iterating over keys found in Model.toJSON( ).

    It binds to el passed to it using this basic template:
      $prefix.$key .value, $prefix.$key.value
    For most DOM nodes, we replace the text with the actual value.
    For inputs, we replace the values.  For inputs and checkboxes,
    we set the control's checked property if the value is the same.
  ###
  prefix: ''
  initialize: ( ) ->
    @model.on('change', _.bind(@render, @))
    @render( )
  render: (ev, delta) ->
    json = @model.toJSON( )
    if delta and delta.changes
      json = _.pick(json, _.keys(delta.changes))
    for own k, value of json
      @render_field(k, value)
    @

  select_field: (key) ->
    selector = "#{@prefix}.#{key} .value, #{@prefix}.#{key}.value"
    @$(selector)
  render_field: (k, value) ->
    update =
      values:  ':input:not(:radio,:checkbox)'
      checked: ':input:radio, :input:checkbox'
      text:    ':not(:input)'
      fields:  @select_field(k)

    filter = (select) ->
      return update.fields.filter(select)

    has_value = (i, el) ->
      return $j(el).val( ) == value

    filter(update.values).val(value)
    filter(update.checked).filter(has_value).prop('checked', true)
    filter(update.text).text(value)
    @
)
#####
# EOF
