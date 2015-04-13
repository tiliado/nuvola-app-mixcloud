var testCount = 7;
var title, testCallback;
var scope = {};

// configs
casper.options.verbose = false;
casper.options.logLevel = "warning";
casper.options.loadImages = false;
casper.options.loadPlugins = false;
casper.options.viewportSize = {
  width: 1600,
  height: 1200
};

// tests
casper.test.begin("Testing Mixcloud", testCount, function mixcloudTest(test) {
  casper.start("https://www.mixcloud.com");

  casper.thenClick('.button[m-play-all-button]', function playAllClick() {
    casper.waitUntilVisible('.player-cloudcast-image img', function afterPlayAll() {

      scope.angular = casper.evaluate(function() {
        return typeof angular != "undefined" && typeof $ != "undefined";
      });

      title = "Angular is detected";
      test.assert(scope.angular, title);

      scope.global = casper.evaluate(function() {
        return $(__utils__.findOne('body')).scope();
      });

      title = "Angular scope : global";
      test.assertEquals(typeof scope.global.$id == "string" && scope.global.$id.length > 0, true,
              title);

      scope.player = casper.evaluate(function() {
        return $(__utils__.findOne('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
      });

      title = "Angular scope: player";
      test.assert(typeof scope.player.$id == "string" && scope.player.$id.length > 0, title);

      title = "Angular property : player.playing";
      test.assert(typeof scope.player.player.playing == "boolean", title);

      title = "Angular property : nowPlaying.currentDisplayTrack";
      test.assert(typeof scope.player.player.nowPlaying.currentDisplayTrack != "undefined", title);
      
      title = "Angular property : queue.cloudcastList";
      testCallback = function() {
        return $(__utils__.findOne('.ng-scope[ng-controller="PlayerQueueCtrl"]'))
        .scope().playerQueue.queue.cloudcastList.toArray().length > 0;
      };
      
      test.assertEval(testCallback, title);

      title = "Angular property: currentCloudcast";
      testCallback = function() {
        return typeof $(__utils__.findOne('.ng-scope[ng-controller="PlayerQueueCtrl"]'))
        .scope().player.currentCloudcast != "undefined";
      };
      test.assertEval(testCallback, title);

      // require('utils').dump(scope.player.player.nowPlaying);

      // screenshot
      casper.capture('tests/screenshot/snapshot.png');
    });
  });

  casper.run(function() {
    test.done();
  });
});