var Mixcloud = {
  "scopes": null,
  "timeout": null
};

var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var casper = require('casper').create ({
//  waitTimeout: 15000,
//  stepTimeout: 15000,
                  verbose: true,
                  logLevel: "debug",
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
                //,
//  onWaitTimeout: function() {
//    casper.echo('Wait TimeOut Occured');
//  },
//  onStepTimeout: function() {
//    casper.echo('Step TimeOut Occured');
//  }
                });

casper.start('https://www.mixcloud.com');

casper.then(function() {
  this.debugHTML();
});

casper.run(function() {
  this.exit();
});

// load API scopes
var loadApiObjects = function() {
  Mixcloud.scopes.global = $(document.body).scope();
  Mixcloud.scopes.PlayerQueueCtrl = $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
};

// callback function for Mixcloud JS API
var _setCallback = function() {
  try {
    // API ready
    loadApiObjects();

    // API loaded
    clearInterval(Mixcloud.timeout);

    // startTests
    startTests();
  } catch (e) {
    // JS API probably not ready yet
    console.log('retry');
  }
};

var startTests = function() {
  scopes.global = $(document.body).scope();
  scopes.PlayerQueueCtrl = $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
};