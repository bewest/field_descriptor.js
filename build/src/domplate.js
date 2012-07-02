(function() {

  window.Domplate = Backbone.View.extend({
    /*
      Domplate: is intended to run once in order to set up unique names
      ids, and things.  It integrates with html5's microdata to declare
      which attributes need their attributes re-written with specially
      templated values.  This is used to generate correct indices for
      items belonging to a row.
    */

    templateSettings: {
      interpolate: /\{\{(.+?)\}\}/g,
      variable: 'model'
    },
    domplate: 'domplate',
    initialize: function() {
      _.bindAll(this);
      if (this.model) {
        this.json(this.model.toJSON());
        this.render_domplates();
      }
      return this;
    },
    render_domplates: function(json, binding) {
      if (binding) {
        this.templateSettings.variable = binding;
      }
      if (this.json(json)) {
        _.each(this.$el.data(this.domplate).split(/\s+/), this.template);
      }
      return this;
    },
    json: function(json) {
      if (json) {
        this._json = json;
      }
      return this._json;
    },
    template: function(attr) {
      var data, formatter, result;
      if (formatter = this.$el.data("" + this.domplate + "-" + attr) || (formatter = this.$el.attr(attr))) {
        data = this.json();
        result = _.template(formatter, data, this.templateSettings);
        return this.$el.attr(attr, result);
      }
    }
  });

}).call(this);
