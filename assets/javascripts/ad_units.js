(function(){
  var bsa = document.createElement('script');
     bsa.type = 'text/javascript';
     bsa.async = true;
     bsa.src = '//s3.buysellads.com/ac/bsa.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
})();

var AdUnitComponent = Ember.Component.extend({
  adId: Discourse.computed.setting('bsa_ad_id'),
  adClass: Discourse.computed.setting('bsa_ad_class'),
  classNames: ['ad-unit', 'container'],

  divId: function() { return "bsap_" + this.get('adId'); }.property('adId'),
  divClass: function() { return "bsarocks bsap_" + this.get('adClass'); }.property('adClass'),

  didInsertElement: function() {
    this.$().attr("aria-hidden", "true");
    this.$().html("<div id='" + this.get('divId') + "' class='" + this.get('divClass') + "'></div>");
    if (typeof(_bsap) !== "undefined") { _bsap.exec(); }
  }
});

var AdMixinFactory = function(insertFunction) {
  return Ember.Mixin.create({
    injectAd: function() {
      var adUnit = this.createChildView(AdUnitComponent);
      this.set('bsaAdUnit', adUnit);
      Ember.run.scheduleOnce('afterRender', this, function() {
        insertFunction(this, adUnit);
      });
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

var AfterAdMixin = AdMixinFactory(function(self, adUnit) {
  return function() { self.$().append(adUnit.$()); };
});

var BeforeAdMixin = AdMixinFactory(function(self, adUnit) {
  return function() { self.$().before(adUnit.$()); };
});

var AfterUserAboutAdMixin = AdMixinFactory(function(self, adUnit) {
  return function() { self.$(".user-main .about").after(adUnit.$()); };
});

Discourse.DiscoveryTopicsView.reopen(PrependAdMixin);
Discourse.TopicFooterButtonsView.reopen(AfterAdMixin);
Discourse.UserView.reopen(AfterUserAboutAdMixin);
