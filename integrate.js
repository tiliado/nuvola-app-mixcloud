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
"use strict";

var nuvola = (function(Nuvola) {
  // verbose mode
  var _debug = false;

  // activate logs
  var _log = false;

  // log to nuvola app by default
  var _console = false;

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

    // start nuvola logger
    _logger = _logger.call(Nuvola);

    // build up custom nodes to communicate with the JS API
    this._injectCustomNodestoDom();

    // start update routine
    this.timeout = setInterval(this._setCallback.bind(this), 250);
  };

  // callback function for Mixcloud JS API
  WebApp._setCallback = function() {
    try {
      // Scopes are ready
      this._loadCustomScopes();

      // API loaded
      clearInterval(this.timeout);

      // reset playback states
      this._reset();

      // load initial playback state
      this._setupWatchers();
    } catch (e) {
      // JS API probably not ready yet
      _logger.error(e);
    }
  };

  // Extract data from the JS API
  WebApp._updatePlaybackInfos = function() {
    if (Mixcloud.scopes.PlayerQueueCtrl.player.buffering) {
      state = PlaybackState.UNKNOWN;
    } else if (Mixcloud.scopes.PlayerQueueCtrl.player.playing) {
      state = PlaybackState.PLAYING;
    } else {
      state = PlaybackState.PAUSED;
    }

    _player.setPlaybackState(state);
    _player.setCanPlay(state === PlaybackState.PAUSED);
    _player.setCanPause(state === PlaybackState.PLAYING);

    _player.setCanGoNext(Mixcloud.cloudcast.next !== null);
    _player.setCanGoPrev(Mixcloud.cloudcast.prev !== null);
  };

  WebApp._updateCurrentTrackInfos = function() {
    var track = {};
    if (_hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["currentCloudcast"])) {
      track.album = {};

      track.album.artist = _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              ["owner"]) ? Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.owner : null;

      track.album.title = _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              ["title"]) ? Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.title : null;

      track.album = Nuvola.format("{1} by {2}", track.album.title, track.album.artist);

      track.artLocation = _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              "widgetImage") ? Nuvola.format("https:{1}",
              Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.widgetImage) : null;
    } else {
      track.album = track.artLocation = null;
    }

    if (_hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["nowPlaying", "currentDisplayTrack"])) {
      track.artist = _hasPath(
              Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack, "artist")
              ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack.artist : null;

      track.title = _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack,
              "title")
              ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack.title : null;
    } else {
      track.artist = Mixcloud.track.title = null;
    }

    _player.setTrack(track);
    Mixcloud.track = track;

    _logger.success();
  };

  // Wipe the current playstate
  WebApp._reset = function() {
    _logger.event("Nuvola reset");
    _player.setCanPlay(false);
    _player.setCanPause(false);
    _player.setCanGoNext(false);
    _player.setCanGoPrev(false);
    _player.setPlaybackState(PlaybackState.UNKNOWN);
    _player.setTrack(Mixcloud.track);
    _logger.success();
  };

  // build up custom scopes
  WebApp._loadCustomScopes = function() {
    Mixcloud.scopes.global = $(document.body).scope();
    Mixcloud.scopes.PlayerQueueCtrl = $(
            document.querySelector('.ng-scope[ng-controller="PlayerQueueCtrl"]')).scope();
  }

  // watch data
  WebApp._setupWatchers = function() {
    try {
      // watch playback queue
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return JSON.stringify($scope.playerQueue.cloudcastQueue);
      }, function(cloudcastQueue, oldValue, scope) {
        if (!_isEmpty(cloudcastQueue)) {
          _logger.event("Playback queue changed!");
          WebApp._refreshNextPrevCloudcast();
        }
      });

      // sync playback state
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.playing;
      }, function(playing) {
        _logger.event('playback state updated!');
        var state = (playing === true) ? PlaybackState.PLAYING : PlaybackState.PAUSED;
        _player.setPlaybackState(state);
        _player.setCanPlay(state === PlaybackState.PAUSED);
        _player.setCanPause(state === PlaybackState.PLAYING);
        Mixcloud.state = state;
        _logger.success();
      });

      // watch track change
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast;
      }, function(track, oldValue, scope) {
        if (!_isEmpty(track)) {
          _logger.event('Track loaded into the player!');
          _defer(function() {
            WebApp._updateCurrentTrackInfos()
          });
        }
      });

      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return _hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["nowPlaying",
            "currentDisplayTrack"])
                ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack : null;
      }, function(track) {
        _logger.event('Track title changed in the player!');
        _defer(function() {
          WebApp._updateCurrentTrackInfos();
        });
      });

      // watch suggested tracks
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.playerQueue.upNext;
      }, function(upNext) {
        if (_hasPath(upNext, ["nextCloudcast"])) {
          _logger.event("Suggested track detected!");

          Mixcloud.cloudcast.suggested = upNext.nextCloudcast;
          _player && _player.setCanGoNext(Mixcloud.cloudcast.suggested !== null);

          _logger.success();
        }
      });
    } catch (e) {
      _logger.error(e);
    }
  };

  // update previous & next track
  WebApp._refreshNextPrevCloudcast = function() {
    // pick now playing track
    for (var i = 0; i < Mixcloud.scopes.PlayerQueueCtrl.playerQueue.cloudcastQueue.length; i++) {
      if (Mixcloud.scopes.PlayerQueueCtrl.playerQueue.cloudcastQueue[i].nowPlaying) {
        this._getSiblings(i);
        _player.setCanGoNext(Mixcloud.cloudcast.next !== null);
        _player.setCanGoPrev(Mixcloud.cloudcast.prev !== null);
        _logger.success();
        return void 0;
      }
    }

    // reset on fail
    Mixcloud.cloudcast = {
      "next": null,
      "prev": null
    };

    _player && _player.setCanGoNext(false) && _player.setCanGoPrevious(false);
  };

  // extract next and previous track candidate
  WebApp._getSiblings = function(currentCloudcastIndex) {
    var siblings = {
      "next": null,
      "prev": null
    };

    try {
      siblings.next = currentCloudcastIndex < (Mixcloud.scopes.PlayerQueueCtrl.playerQueue.cloudcastQueue.length - 1)
              ? Mixcloud.scopes.PlayerQueueCtrl.playerQueue.cloudcastQueue[currentCloudcastIndex + 1]
              : null;
      siblings.prev = currentCloudcastIndex > 0
              ? Mixcloud.scopes.PlayerQueueCtrl.playerQueue.cloudcastQueue[currentCloudcastIndex - 1]
              : null;
    } catch (e) {
      _logger.error(e);
    }

    Mixcloud.cloudcast = siblings;
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

  // Handler of playback actions
  WebApp._onActionActivated = function(emitter, name, param) {
    var index;
    try {
      switch (name) {
      case PlayerAction.TOGGLE_PLAY:
      case PlayerAction.PLAY:
        if (Mixcloud.scopes.global.webPlayer.playerOpen === false) {
          Nuvola.clickOnElement(Mixcloud.nodes.playAll);
        } else {
          Mixcloud.scopes.PlayerQueueCtrl.player.togglePlayClick();
        }
        break;
      case PlayerAction.STOP:
      case PlayerAction.PAUSE:
        Mixcloud.scopes.PlayerQueueCtrl.player.togglePlayClick();
        break;
      case PlayerAction.NEXT_SONG:
        if (Mixcloud.cloudcast.next) {
          _logger.log("play next!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.next);
        } else {
          _logger.log("play suggested!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playUpNext();
        }
        break;
      case PlayerAction.PREV_SONG:
        Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.prev);
        break;
      default:
        throw {
          "message": "Not supported."
        };
      }
      throw nuvola;
    } catch (e) {
      _logger.error(e);
    }
  };

  // internal logger that can push to console
  var _logger = function() {
    var state = null, logger = null, console = typeof window.console == "object", internal = {};

    // Nuvola log
    internal.log = this.log.bind(this);

    state = _console && console;
    logger = state ? window.console : internal;

    return {
      // route to console if flag is true
      "logToConsole": function(flag) {
        if (typeof flag !== "boolean") {
          throw "this call require a boolean parameter";
        } else if (flag && flag !== state && window.console) {
          logger = window.console;
          state = flag;
          _hasPath(window, ["console", "info"]) && window.console.info("log to console activated!");
        } else if (!flag && flag !== state) {
          logger = internal;
          state = flag;
          _hasPath(window, ["console", "info"])
                  && window.console.info("log to internal app activated!");
        } else {
          throw "Debug is already set to : " + state;
        }
      },
      "log": function() {
        _log && logger.log.apply(state && window.console ? window.console : this, arguments);
      },
      "success": function() {
        if (_log) {
          var message = "> Nuvola sync done!";
          this.log.call(this, message.toUpperCase());
        }
      },
      "event": function(message) {
        if (_log) {
          message = "# " + message;
          this.log.call(this, message.toUpperCase());
        }
      },
      "error": function(obj) {
        if (_debug && _log) {
          state ? logger.error.call(window.console, obj) : this.log.call(this, JSON.stringify(obj));
        }
      }
    };
  };

  // should prevent angular "$digest already in progress" issue
  var _defer = function(callback) {
    return setTimeout.call(this, callback, 333.333);
  };

  // checks empty object
  var _isEmpty = function(object) {
    for ( var key in object) {
      if (object.hasOwnProperty(key)) return false;
    }
    return true;
  };

  // Returns a boolean indicating whether there is a property at the path 
  // described by the keys given in string or array format
  var _hasPath = function hasPath(obj, keys) {
    if (typeof keys == "string") keys = keys.split(".");
    var numKeys = keys.length;
    if (obj == null && numKeys > 0) return false;
    if (!(keys[0] in obj)) return false;
    if (numKeys === 1) return true;
    var first = keys.shift();
    return hasPath(obj[first], keys);
  }

  WebApp.start();

  return {
    "status": function() {
      return (_debug || _log) && console && console.log(Mixcloud);
    },
    "debug": function(flag) {
      _logger.logToConsole.call(this, flag);
    }
  };

})(this); // function(Nuvola)