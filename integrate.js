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

  // media player component
  var _player = Nuvola.$object(Nuvola.MediaPlayer);

  // aliases
  var PlaybackState = Nuvola.PlaybackState;
  var PlayerAction = Nuvola.PlayerAction;

  // create new WebApp prototype
  var WebApp = Nuvola.$WebApp();

  // Service store
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

  // should prevent $digest already in progress
  var _defer = function(callback) {
    setTimeout.call(this, callback, 100);
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
    this.timeout = setInterval(this._setCallback.bind(this), 100);
  };

  // callback function for Mixcloud JS API
  WebApp._setCallback = function() {
    try {
      // Scopes are ready
      this._loadCustomScopes();

      // API loaded
      clearInterval(this.timeout);

      // reset playback states
      this._loadDefaultStates();

      // load initial playback state
      this._setupWatchers();
    } catch (e) {
      // JS API probably not ready yet
      console.log(e);
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
    if (WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["currentCloudcast"])) {
      track.album = {};

      track.album.artist = WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              ["owner"]) ? Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.owner : null;

      track.album.title = WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              ["title"]) ? Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.title : null;

      track.album = Nuvola.format("{1} by {2}", track.album.title, track.album.artist);

      track.artLocation = WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast,
              "widgetImage") ? Nuvola.format("https:{1}",
              Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast.widgetImage) : null;
    } else {
      track.album = track.artLocation = null;
    }

    if (WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["nowPlaying",
        "currentDisplayTrack"])) {
      track.artist = WebApp._hasPath(
              Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack, "artist")
              ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack.artist : null;

      track.title = WebApp._hasPath(
              Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack, "title")
              ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack.title : null;
    } else {
      track.artist = Mixcloud.track.title = null;
    }

    _player.setTrack(track);
    Mixcloud.track = track;

    console.log("so we updated track infos..");
  };

  WebApp._loadDefaultStates = function() {
    console.log("purge Nuvola's old data..")
    _player.setCanPlay(false);
    _player.setCanPause(false);
    _player.setCanGoNext(false);
    _player.setCanGoPrev(false);
    _player.setPlaybackState(PlaybackState.UNKNOWN);

    _player.setTrack(Mixcloud.track);
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
        if (!WebApp._isEmpty(cloudcastQueue)) {
          console.log("# playback queue changed!");
          WebApp._refreshNextPrevCloudcast();
        }
      });

      // sync playback state
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.playing;
      }, function(playing) {
        console.log('# playback state updated!');
        var state = (playing === true) ? PlaybackState.PLAYING : PlaybackState.PAUSED;
        _player.setPlaybackState(state);
        _player.setCanPlay(state === PlaybackState.PAUSED);
        _player.setCanPause(state === PlaybackState.PLAYING);
        Mixcloud.state = state;
        console.log("so we updated playback states..");
      });

      // watch track change
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.player.currentCloudcast;
      }, function(track, oldValue, scope) {
        if (!WebApp._isEmpty(track)) {
          console.info('# Track loaded into the player!');
            _defer(function() {
              WebApp._updateCurrentTrackInfos()
            });
        }
      });

      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return WebApp._hasPath(Mixcloud.scopes.PlayerQueueCtrl.player, ["nowPlaying",
            "currentDisplayTrack"])
                ? Mixcloud.scopes.PlayerQueueCtrl.player.nowPlaying.currentDisplayTrack : null;
      }, function(track) {
        console.log('# Track title changed in the player!');
        _defer(function() {
          WebApp._updateCurrentTrackInfos();
        });
      });

      // watch suggested tracks
      Mixcloud.scopes.PlayerQueueCtrl.$watch(function($scope) {
        return Mixcloud.scopes.PlayerQueueCtrl.playerQueue.upNext;
      }, function(upNext) {
        if (WebApp._hasPath(upNext, ["nextCloudcast"])) {
          console.log("# suggested track detected!");

          Mixcloud.cloudcast.suggested = upNext.nextCloudcast;
          _player && _player.setCanGoNext(Mixcloud.cloudcast.suggested !== null);

          console.log("so we updated the next suggested track..");
        }
      });
    } catch (e) {
      // silent fallback
      console.log(e);
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
        console.log("so we updated previous and next track");
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
      console.log(e);
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
          console.log("play next!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.next);
        } else {
          console.log("play suggested!");
          Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playUpNext();
        }
        break;
      case PlayerAction.PREV_SONG:
        Mixcloud.scopes.PlayerQueueCtrl.playerQueue.playFromQueue(Mixcloud.cloudcast.prev);
        break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // checks empty object
  WebApp._isEmpty = function(object) {
    for ( var key in object) {
      if (object.hasOwnProperty(key)) return false;
    }
    return true;
  };

  // Returns a boolean indicating whether there is a property at the path 
  // described by the keys given in string or array format
  WebApp._hasPath = function hasPath(obj, keys) {
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
    "debug": function() {
      console && console.log(Mixcloud);
    }
  };

})(this); // function(Nuvola)