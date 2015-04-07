var testCount = 3;
var title;

casper.options.verbose = true;
casper.options.logLevel = "debug";
casper.options.loadImages = false;
casper.options.loadPlugins = false;
casper.options.viewportSize = {
  width: 1600,
  height: 1200
};

casper.test.begin("Testing Mixcloud", testCount, function mixcloudTest(test) {
  casper.start("https://www.mixcloud.com");

  casper.thenClick('.button[m-play-all-button]', function playAllClick() {
    casper.waitForSelector('div.player-wrapper:not(.ng-hide)', function afterPlayAll() {

      var scope = {};

      scope.angularType = casper.evaluate(function() {
        return typeof angular;
      });

      scope.global = casper.evaluate(function() {
        return $(__utils__.findOne('body')).scope();
      });

      scope.player = casper.evaluate(function() {
        return $(__utils__.findOne('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
      });

      title = "Angular";
      test.assertNotEquals(scope.angularType, "undefined", title);

      title = "Angular global scope";
      test.assertEquals(typeof scope.global.$id == "string" && scope.global.$id.length > 0, true,
              title);

      title = "Angular player scope";
      test.assertEquals(typeof scope.player.$id == "string" && scope.player.$id.length > 0, true,
              title);
      
      title = "Angular playlist";
      scope.player = casper.evaluate(function() {
        return $(__utils__.findOne('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
      });
      
      casper.log(scope.player);
      
//      test.assertEval(function() {
//        var scope = $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
//        casper.log("ok","warning");
//        return true;
////        return typeof utils.getPropertyPath(scope, 'playerQueue.queue.cloudcastList.length') != "undefined";
//      }, title);

//      casper.log(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]'), "debug");

      // screenshot
      casper.capture('tests/screenshot/snapshot.png');
    });
  });

  casper.run(function() {
    test.done();
  });
});