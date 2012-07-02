(function() {
  var __hasProp = {}.hasOwnProperty;

  window.FieldDescriptor = Backbone.View.extend({
    /*
        FieldDescriptor automatically generates CSS selectors from a
        a Model by iterating over keys found in Model.toJSON( ).
    
        It binds to el passed to it using this basic template:
          $prefix.$key .value, $prefix.$key.value
        For most DOM nodes, we replace the text with the actual value.
        For inputs, we replace the values.  For inputs and checkboxes,
        we set the control's checked property if the value is the same.
    */

    prefix: '',
    initialize: function() {
      this.model.on('change', _.bind(this.render, this));
      return this.render();
    },
    render: function(ev, delta) {
      var json, k, value;
      json = this.model.toJSON();
      if (delta && delta.changes) {
        json = _.pick(json, _.keys(delta.changes));
      }
      for (k in json) {
        if (!__hasProp.call(json, k)) continue;
        value = json[k];
        this.render_field(k, value);
      }
      return this;
    },
    select_field: function(key) {
      var selector;
      selector = "" + this.prefix + "." + key + " .value, " + this.prefix + "." + key + ".value";
      return this.$(selector);
    },
    render_field: function(k, value) {
      var filter, has_value, update;
      update = {
        values: ':input:not(:radio,:checkbox)',
        checked: ':input:radio, :input:checkbox',
        text: ':not(:input)',
        fields: this.select_field(k)
      };
      filter = function(select) {
        return update.fields.filter(select);
      };
      has_value = function(i, el) {
        return $j(el).val() === value;
      };
      filter(update.values).val(value);
      filter(update.checked).filter(has_value).prop('checked', true);
      filter(update.text).text(value);
      return this;
    }
  });

}).call(this);
