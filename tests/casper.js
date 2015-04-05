var testCount = 1;

//casper.options.clientScripts = ["integrate.js"];
casper.options.verbose = true;
casper.options.logLevel = "debug";

casper.on('page.resource.requested', function(requestData, request) {
  if (requestData.url.indexOf('mixcloud.com') === -1) {
    request.abort();
  }
});

casper.test.begin("Testing Mixcloud", testCount, function redditTest(test) {
  casper.start("https://www.mixcloud.com");

  casper.then(function() {
    this.log(typeof nuvola, "warning");    
  });

//  casper.then(function(){
//    test.assertEval(function() {
//      casper.log(typeof nuvola, "debug");
//      return typeof nuvola != "undefined";
//    }, "nuvola");
//  });
//  
//  
//  casper.then(function() {
//    test.assertEval(function() {
//      return typeof $ != "undefined";
//    }, "Angular");
//    
//    test.assertEval(function(){
//      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
//      return obj && obj != null && typeof obj.scope() == "object";
//    }, "Angular global scope");
//    
//    test.assertEval(function(){
//      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
//      return  obj && obj != null && typeof obj.scope() == "object";
//    }, "Angular player scope");
//    
//    test.assertEval(function(){
//      var obj = $ && $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'));
//      return  obj && obj != null && typeof obj.scope() == "object" && obj.scope().queue.cloudcastList;
//    }, "Angular player scope : playlist");
//  });

  casper.run(function() {
    test.done();
  });
});