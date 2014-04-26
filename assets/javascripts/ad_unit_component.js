(function(){
  var bsa = document.createElement('script');
     bsa.type = 'text/javascript';
     bsa.async = true;
     bsa.src = 'http://s3.buysellads.com/ac/bsa.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
})();

var AdUnitComponent = Ember.Component.extend({
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

var AdMixinFactory = function(insertFunction) {
  return Ember.Mixin.create({
    injectAd: function() {
      var adUnit = this.createChildView(AdUnitComponent);
      this.set('bsaAdUnit', adUnit);
      var self = this;
      adUnit._insertElementLater(insertFunction(this, adUnit));
    }.on('didInsertElement'),

    removeAd: function() {
      if (this.get('bsaAdUnit')) {
        this.get('bsaAdUnit').destroy();
        this.set('bsaAdUnit', null);
      }
    }.on('willClearRender')
  });
};

var PrependAdMixin = AdMixinFactory(function(self, adUnit) {
  return function() { self.$().prepend(adUnit.$()); };
});

Discourse.DiscoveryTopicsView.reopen(PrependAdMixin);
