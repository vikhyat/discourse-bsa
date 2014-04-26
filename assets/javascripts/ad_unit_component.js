Discourse.AdUnitComponent = Ember.Component.extend({
  adId: "1293313",
  adClass: "257f81e798bd68dd81e60f42838f361f",
  classNames: ['ad-unit', 'container'],

  divId: function() { return "bsap_" + this.get('adId'); }.property('adId'),
  divClass: function() { return "bsarocks bsap_" + this.get('adClass'); }.property('adClass'),

  didInsertElement: function() {
    this.$().html("<div id='" + this.get('divId') + "' class='" + this.get('divClass') + "'></div>");
    if (typeof(_bsap) !== "undefined") { _bsap.exec(); }
  }
});
