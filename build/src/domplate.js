(function() {
  var Domplate;

  Domplate = Backbone.View.extend({
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
    initialize: function() {
      _.bindAll(this);
      return _.each(this.$el.data('domplate').split(/\s+/), this.template);
    },
    template: function(attr) {
      var data, result, value;
      if (value = this.$el.attr(attr)) {
        data = this.model.toJSON();
        result = _.template(value, data, this.templateSettings);
        return this.$el.attr(attr, result);
      }
    }
  });

}).call(this);
