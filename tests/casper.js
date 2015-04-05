var Mixcloud = {
  "scopes": null,
  "timeout": null
};

//Mixcloud.ready = function() {
//  return window.angular != null;
//};

//Mixcloud.init = function() {
//  this.waitFor(Mixcloud.ready, Mixcloud.loaded, Mixcloud.retry);
//};
//
//Mixcloud.setup = function() {
//  Mixcloud.scopes.global = $(document.body).scope();
//  Mixcloud.scopes.PlayerQueueCtrl = $(
//          document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
//  
//  require('utils').dump(Mixcloud);
//};
//
//Mixcloud.retry = function(){
//  console.info("Angular not ready");
//};

var conf = {
  viewportSize: {
    width: 1024,
    height: 768
  },
  pageSettings: {
    "userAgent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
    "loadImages": false,
    "loadPlugins": false,
    "webSecurityEnabled": false,
    "ignoreSslErrors": true
  }
};

var testCount = 1;
conf.verbose = true;
conf.logLevel = "debug";

var casper = require('casper').create(conf);

casper.on('page.resource.requested', function(requestData, request) {
  if (requestData.url.indexOf('mixcloud.com') === -1) {
    request.abort();
  }
});

casper.start('https://www.mixcloud.com', Mixcloud.init);

casper.test.begin("Testing Mixcloud", testCount, function redditTest(test) {
  casper.start("https://www.mixcloud.com");
  casper.then(function() {
//    test.assertEval(function() {
//      return typeof $ != "undefined";
//    });
  });

  casper.run(function() {
    test.done();
  });
});