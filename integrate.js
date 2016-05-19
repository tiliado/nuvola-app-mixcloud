/*
 * Copyright 2015 Samuel Mansour <nuvola-app-mixcloud@yay.ovh>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

var nuvola = (function(Nuvola) {
  // activate logs
  var _DEBUG = false;
  // log to nuvola app by default
  var _CONSOLE = Nuvola; // or "console"
  // media player component
  var _player = Nuvola.$object(Nuvola.MediaPlayer);
  // aliases
  var PlaybackState = Nuvola.PlaybackState;
  var PlayerAction = Nuvola.PlayerAction;

  // create new WebApp prototype
  var WebApp = Nuvola.$WebApp();

  // custom store
  var Mixcloud = {
    "nodes": {},
    "scopes": {},
    "track": {
      "title": null,
      "artist": null,
      "album": null,
      "artLocation": null
    },
    "cloudcast": {
      "next": null,
      "prev": null
    },
    "html": {
      "wrapper": ["div", {
        "style": "display:none"
      }],
      "playAll": ["span", {
        "m-play-all-button": ""
      }]
    },
    "state": PlaybackState.UNKNOWN,
    "stoped": false
  };

  // initialization
  WebApp._onInitWebWorker = function(emitter) {
    Nuvola.WebApp._onInitWebWorker.call(this, emitter);

    var state = document.readyState;
    if (state === "interactive" || state === "complete") {
      this._onPageReady();
    } else {
      document.addEventListener("DOMContentLoaded", this._onPageReady.bind(this));
    }
  };

  // page is ready for magic
  WebApp._onPageReady = function() {
    // connect handler for signal ActionActivated
    Nuvola.actions.connect("ActionActivated", this);
    // build up custom nodes to communicate with the JS API
    this._injectCustomNodestoDom();
    // start update routine
    this.timeout = setInterval(this._setCallback.bind(this), 250);
  };

  // callback function for Mixcloud JS API
  WebApp._setCallback = function() {
    try {
      // API ready
      this._loadApiObjects();
      // API loaded
      clearInterval(this.timeout);
      // reset playback states
      this._reset();
      // add custom listeners
      this._setupWatchers();
    } catch (e) {
      // JS API probably not ready yet
      _logger.error(e);
    }
  };

  // set defaults
  WebApp._reset = function() {
    _player.setCanPlay(false);
    _player.setCanPause(false);
    _player.setCanGoNext(false);
    _player.setCanGoPrev(false);
    _player.setPlaybackState(PlaybackState.UNKNOWN);
    _player.setTrack(Mixcloud.track);
    _logger.message("Nuvola reset", Mixcloud.track);
  };

  // load API scopes
  WebApp._loadApiObjects = function() {
    Mixcloud.scopes.global = $(document.body).scope();
    Mixcloud.scopes.PlayerQueueCtrl = $(document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
  };

  // watch data
  WebApp._setupWatchers = function() {
    try {
      // watch playback queue
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return $scope.playerQueue.queue.cloudcastList.toArray();
      }, function(cloudcastQueue) {
        if (!_isEmpty(cloudcastQueue)) {
          _logger.message("Playback queue changed!");
          _defer(function() {
            WebApp._refreshNextPrevCloudcast();
          });
        }
      });

      // sync playback state
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.playing;
      }, function(playing) {
        _logger.message('playback state updated!');
        _defer(function() {
          var state = (playing === true) ? PlaybackState.PLAYING : Mixcloud.stopped ? PlaybackState.UNKNOWN : PlaybackState.PAUSED;
          _player.setPlaybackState(state);
          _player.setCanPlay(state === PlaybackState.UNKNOWN || state === PlaybackState.PAUSED);
          _player.setCanPause(state === PlaybackState.PLAYING);
          Mixcloud.state = state;
        });
      });

      // watch track change
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast;
      }, function(track) {
        if (!_isEmpty(track)) {
          _defer(function() {
            WebApp._updateCurrentAlbum();
            WebApp._refreshNextPrevCloudcast();
          });
        }
      });

      // watch suggested tracks
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return _getPath(Mixcloud.scopes.PlayerQueueCtrl.playerQueue.queue, ["upNext", "nextCloudcast"]);
      }, function(nextCloudcast) {
        if (nextCloudcast !== null) {
          _logger.message("Suggested track detected!");
          _defer(function() {
            Mixcloud.cloudcast.suggested = nextCloudcast;
            _player.setCanGoNext(true);
            _logger.message("suggested tracks updated", Mixcloud.cloudcast.suggested);
          });
        }
      });
    } catch (e) {
      _logger.error(e);
    }
  };

  // update previous & next track
  WebApp._refreshNextPrevCloudcast = function() {
    var currentIndex = Mixcloud.scopes.PlayerQueueCtrl.playerQueue.queue.getNowPlayingIndex();

    Mixcloud.cloudcast.next = Mixcloud.scopes.PlayerQueueCtrl.playerQueue.queue.cloudcastList.get(currentIndex + 1);
    Mixcloud.cloudcast.prev = Mixcloud.scopes.PlayerQueueCtrl.playerQueue.queue.cloudcastList.get(currentIndex - 1);

    _player.setCanGoNext(typeof Mixcloud.cloudcast.next !== "undefined");
    _player.setCanGoPrev(typeof Mixcloud.cloudcast.prev !== "undefined");

    _logger.message("queue updated!", Mixcloud.cloudcast);
  };

  // sync album infos
  WebApp._updateCurrentAlbum = function() {
    var track = {};

    track.artist = _getPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast, ["owner"]);
    track.title = _getPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast, ["title"]);

    track.artLocation = _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast, "widgetImage") ? Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.widgetImage : null;

    this._syncTrack(track);
  };

  WebApp._syncTrack = function(track) {
    var track = _mergeObject(Mixcloud.track, track);
    _defer(function() {
      _player.setTrack(track);
      Mixcloud.track = track;
      _logger.message("current track updated", track);
    });
  };

  // build custom elements and attach to DOM
  WebApp._injectCustomNodestoDom = function() {
    // build
    Mixcloud.nodes.wrapper = Nuvola.makeElement.apply(this, Mixcloud.html.wrapper);
    Mixcloud.nodes.playAll = Nuvola.makeElement.apply(this, Mixcloud.html.playAll);
    // attach to wrapper
    Mixcloud.nodes.wrapper.appendChild(Mixcloud.nodes.playAll);
    // attach to DOM
    document.body.appendChild(Mixcloud.nodes.wrapper);
  };

  // resume or play all
  WebApp._doPlay = function() {
    if (Mixcloud.scopes.global.webPlayer.playerOpen === false) {
      Nuvola.clickOnElement(Mixcloud.nodes.playAll);
    } else {
      WebApp._doPause();
    }

    Mixcloud.stopped = false;
  };

  // pause track
  WebApp._doPause = function() {
    Mixcloud.scopes.PlayerQueueCtrl.player.togglePlayClick();
  };

  // stop track and seek to the start point
  WebApp._doStop = function() {
    Mixcloud.scopes.PlayerQueueCtrl.player.togglePlayClick();
    Mixcloud.scopes.PlayerQueueCtrl.$emit("slider:stop", 0);
    Mixcloud.stopped = true;
  };

  // playback actions controller
  WebApp._onActionActivated = function(emitter, name) {
    try {
      switch (name) {
      case PlayerAction.TOGGLE_PLAY:
        if (Mixcloud.state === PlaybackState.PLAYING) {
          WebApp._doPause();
        } else {
          WebApp._doPlay();
        }
        break;
      case PlayerAction.PLAY:
        if (Mixcloud.state !== PlaybackState.PLAYING) {
          WebApp._doPlay();
        }
        break;
      case PlayerAction.STOP:
        if (Mixcloud.state === PlaybackState.PLAYING) {
          WebApp._doStop();
        }
        break;
      case PlayerAction.PAUSE:
        if (Mixcloud.state === PlaybackState.PLAYING) {
          Mixcloud.scopes.PlayerQueueCtrl.player.togglePlayClick();
        }
        break;
      case PlayerAction.NEXT_SONG:
        if (Mixcloud.cloudcast.next) {
          _logger.message("play next!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.next);
        } else {
          _logger.message("play suggested!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playUpNext();
        }
        break;
      case PlayerAction.PREV_SONG:
        Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.prev);
        break;
      default:
        throw "Not supported action : " + name;
      }
    } catch (e) {
      _logger.error(e);
    }
  };

  // console wrapper
  var _logger = {
    "debug": function() {
      if (_DEBUG) {
        _CONSOLE.log.apply(this, arguments);
      }
    },
    "message": function(message, data) {
      if (_DEBUG) {
        message = "# " + message;
        _CONSOLE.log(message.toUpperCase(), JSON.stringify(data));
      }
    },
    "error": function(obj) {
      if (_DEBUG) {
        _CONSOLE.log(JSON.stringify(obj));
      }
    }
  };

  // should prevent angular "$digest already in progress" issue
  var _defer = function(callback) {
    if (null === Mixcloud.scopes.global.$$phase) {
      Mixcloud.scopes.global.$apply(callback);
    } else {
      setTimeout.call(this, _defer.bind(this, callback), 25);
      _logger.message("_defer will retry!");
    }
  };

  // checks empty object
  var _isEmpty = function(object) {
    if (object == null || typeof object != "object") return true;
    for ( var key in object) {
      if (object.hasOwnProperty(key) && object[key] !== null) return false;
    }
    return true;
  };

  // Returns the value of the given path or null if incorrect
  var _getPath = function(obj, keys) {
    if (typeof obj !== "object") {
      return null;
    } else if (typeof keys == "string") {
      keys = keys.split(".");
    }
    var numKeys = keys.length;
    if (obj === null && numKeys > 0) return null;
    if (!(keys[0] in obj)) return null;
    if (numKeys === 1) { return obj[keys]; }
    var first = keys.shift();
    return _getPath(obj[first], keys);
  };

  // Returns a boolean indicating whether there is a property at the path
  // described by the keys given in string or array format
  var _hasPath = function(obj, keys) {
    var value = _getPath.apply(this, arguments);
    return value !== null;
  };

  // Overwrites o1's values with o2's and adds o2's if non existent in o1
  var _mergeObject = function merge_options(o1, o2) {
    var o3 = {};
    for ( var attrname in o1) {
      o3[attrname] = o1[attrname];
    }
    for ( var attrname in o2) {
      o3[attrname] = o2[attrname];
    }
    return o3;
  };

  WebApp.start();

  return {
    "status": function() {
      return console && console.log(Mixcloud);
    }
  };

})(this);
