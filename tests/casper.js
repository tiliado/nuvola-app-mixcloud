var testCount = 1;

//casper.options.clientScripts = ["tests/mockup.js", "integrate.js"];
casper.options.verbose = true;
casper.options.logLevel = "debug";
casper.options.pageSettings.loadImages = false;
casper.options.loadPlugins = false;

casper.test.begin("Testing Mixcloud", testCount, function redditTest(test) {
  casper.start("https://www.mixcloud.com");

  casper.then(function() {
    test.assertEval(function() {
      return typeof $ != "undefined";
    }, "Angular");
    
    test.assertEval(function(){
      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
      return obj && obj != null && typeof obj.scope() == "object";
    }, "Angular global scope");
    
    test.assertEval(function(){
      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
      return  obj && obj != null && typeof obj.scope() == "object";
    }, "Angular player scope");
    
    test.assertEval(function(){
      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
      return  obj && obj != null && typeof obj.scope() == "object" && obj.scope().queue.cloudcastList;
    }, "Angular player scope : playlist");
  });
  
  casper.then(function(){
    Casper.clickLabel('Play Chart');
    casper.waitForSelector('').success();
  });

  casper.run(function() {
    test.done();
  });
});