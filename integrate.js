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

(function(Nuvola) {

  // media player component
  var player = Nuvola.$object(Nuvola.MediaPlayer);

  // aliases
  var PlaybackState = Nuvola.PlaybackState;
  var PlayerAction = Nuvola.PlayerAction;

  // create new WebApp prototype
  var WebApp = Nuvola.$WebApp();

  // Service config
  var Mixcloud = {
    "nodes": {},
    "scopes": {},
    "html": {
      "wrapper": ["div", {
        "style": "display:none"
      }],
      "playAll": ["span", {
        "m-play-all-button": ""
      }],
      "play": ["span", {
        "m-player-play-button": ""
      }],
      "queue": ["span", {
        "m-player-queue": ""
      }],
      "playerQueue": ["span", {
        "class": "ng-scope",
        "m-source-detail": "Player",
        "ng-controller": "PlayerQueueCtrl"
      }]
    },
    config: {
      "curTrack": ".cloudcast-row.now-playing"
    }
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

      // load initial playback state
      this._watchPlaybackStatusAndUpdateNodes();

      // Start update routine
      this.update();
    } catch (e) {
      // JS API probably not ready yet
//      console.log(e);
    }
  };

  // Extract data from the web page
  WebApp.update = function() {
    var track = {
      title: null,
      artist: null,
      album: null,
      artLocation: null
    }, state = PlaybackState.UNKNOWN, nextTrack, prevTrack;

    try {
      if (Mixcloud.scopes.global.webPlayer.playerOpen) {
        if (Mixcloud.scopes.playerQueue.player.buffering) {
          state = PlaybackState.UNKNOWN;
        } else if (Mixcloud.scopes.playerQueue.player.playing) {
          state = PlaybackState.PLAYING;
        } else {
          state = PlaybackState.PAUSED;
        }

        track.album = {};
        track.album.title = Mixcloud.scopes.playerQueue.player.currentCloudcast.title;
        track.album.artist = Mixcloud.scopes.playerQueue.player.currentCloudcast.owner;
        track.artLocation = Nuvola.format("https:{1}", Mixcloud.scopes.playerQueue.player.currentCloudcast.widgetImage);
        track.album = Nuvola.format("{1} by {2}", track.album.title, track.album.artist);

        if (Mixcloud.scopes.playerQueue.player.nowPlaying.currentDisplayTrack == null) {
          track.title = track.artist = null;
        } else {
          track.title = Mixcloud.scopes.playerQueue.player.nowPlaying.currentDisplayTrack.title;
          track.artist = Mixcloud.scopes.playerQueue.player.nowPlaying.currentDisplayTrack.artist;
        }
      } else {
        state = PlaybackState.PAUSED;
      }
    } catch (e) {
      // gracefull fallback width default settings
    }

    player.setTrack(track);
    player.setPlaybackState(state);
    player.setCanPlay(state === PlaybackState.PAUSED);
    player.setCanPause(state === PlaybackState.PLAYING);

//    player.setCanGoNext(!!Mixcloud.nodes.nextTrack);
//    player.setCanGoPrev(!!Mixcloud.nodes.prevTrack);
    
  player.setCanGoNext(!!Mixcloud.scopes.nextTrack);
  player.setCanGoPrev(!!Mixcloud.scopes.prevTrack);

    // Schedule the next update
    setTimeout(this.update.bind(this), 500);
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
          Mixcloud.scopes.playerQueue.player.togglePlayClick();
        }
        break;
      case PlayerAction.STOP:
      case PlayerAction.PAUSE:
        Mixcloud.scopes.playerQueue.player.togglePlayClick();
        break;
      case PlayerAction.NEXT_SONG:
//        console.log('Mixcloud.scopes.playerQueue.playerQueue', Mixcloud.scopes.playerQueue.playerQueue);
//        console.log('$(Mixcloud.nodes.prevTrack).scope()', $(Mixcloud.nodes.prevTrack).scope());
//        console.log('$(Mixcloud.nodes.nextTrack).scope()', $(Mixcloud.nodes.nextTrack).scope());

//        Mixcloud.scopes.playerQueue.playerQueue.playFromQueue($(Mixcloud.nodes.nextTrack).scope());
//        Mixcloud.scopes.playerQueue.playerQueue.playFromQueue($(Mixcloud.nodes.nextTrack).scope().$index);
        
        console.log('playerQueue', Mixcloud.scopes.playerQueue);
//        if (index === null) {
//        Mixcloud.scopes.playerQueue.playerQueue.upNext = null;
//          Mixcloud.scopes.playerQueue.playerQueue.playUpNext(Mixcloud.scopes.playerQueue.player);
//        } else {
          Mixcloud.scopes.playerQueue.player.currentCloudcast = Mixcloud.scopes.nextTrack.cloudcast;
          Mixcloud.scopes.playerQueue.playerQueue.playFromQueue(Mixcloud.scopes.nextTrack.cloudcast);
//        }
        break;
      case PlayerAction.PREV_SONG:
        console.log(Mixcloud.scopes.playerQueue)
//        console.log(Mixcloud.nodes);
//        Nuvola.clickOnElement(Nuvola.clickOnElement(Mixcloud.nodes.prevTrack));
//        Mixcloud.scopes.playerQueue.playerQueue.playFromQueue($(Mixcloud.nodes.prevTrack).scope().$index);
        break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // build custom elements and attach to DOM
  WebApp._injectCustomNodestoDom = function() {
    // build
    Mixcloud.nodes.wrapper = Nuvola.makeElement.apply(this, Mixcloud.html.wrapper);
    Mixcloud.nodes.playerQueue = Nuvola.makeElement.apply(this, Mixcloud.html.playerQueue);
    Mixcloud.nodes.play = Nuvola.makeElement.apply(this, Mixcloud.html.play);
    Mixcloud.nodes.playAll = Nuvola.makeElement.apply(this, Mixcloud.html.playAll);
//    Mixcloud.nodes.queue = Nuvola.makeElement.apply(this, Mixcloud.html.queue);

    // attach to wrapper
    Mixcloud.nodes.wrapper.appendChild(Mixcloud.nodes.playAll);
    Mixcloud.nodes.wrapper.appendChild(Mixcloud.nodes.play);
    Mixcloud.nodes.wrapper.appendChild(Mixcloud.nodes.playerQueue);
//    Mixcloud.nodes.wrapper.appendChild(Mixcloud.nodes.queue); 

    // attach to DOM
    document.body.appendChild(Mixcloud.nodes.wrapper);
  }

  // build up custom scopes
  WebApp._loadCustomScopes = function() {
    Mixcloud.scopes.global = $(document.body).scope();
    Mixcloud.scopes.playerQueue = $(Mixcloud.nodes.playerQueue).scope();
//    Mixcloud.scopes.queue = $(Mixcloud.nodes.queue).scope();

    console.log('intial scopes', Mixcloud.scopes);
  }

  // current track playback detection by watching buffer
  WebApp._watchPlaybackStatusAndUpdateNodes = function() {
    try {
      Mixcloud.scopes.playerQueue.$watch(function($scope) {
        return $scope.player.buffering;
      }, function(buffering, wasBuffering, scope) {
        if (!buffering && scope.player.playing) {
          Mixcloud.nodes.curTrack = Mixcloud.nodes.nextTrack = Mixcloud.nodes.prevTrack = null;
          Mixcloud.nodes.curTrack = document.querySelector(Mixcloud.config.curTrack);

          Mixcloud.scopes.curTrack = Mixcloud.nodes.curTrack === null ? null : $(Mixcloud.nodes.curTrack).scope();
          
          console.log('curCloudcast', Mixcloud.scopes.curTrack);
          
          if(Mixcloud.scopes.curTrack){
            if(Mixcloud.scopes.curTrack.$$nextSibling){
              Mixcloud.scopes.nextTrack = Mixcloud.scopes.curTrack.$$nextSibling.cloudcast ? Mixcloud.scopes.curTrack.$$nextSibling : null;
            }else{
              // select suggestion
            }
          }else{
            Mixcloud.scopes.nextTrack = null;
          }
          
          Mixcloud.scopes.prevTrack = Mixcloud.scopes.curTrack && Mixcloud.scopes.curTrack.$$prevSibling.cloudcast ? Mixcloud.scopes.curTrack.$$prevSibling : null;

//          console.log('Mixcloud.nodes', Mixcloud.nodes);

          console.log('playerQueue', Mixcloud.scopes.playerQueue);
          console.log('currentCloudcast via player', Mixcloud.scopes.playerQueue.player.currentCloudcast);

//          console.log('curCloudcast', $(Mixcloud.nodes.curTrack).scope());
//          console.log('nextCloudcast', Mixcloud.nodes.nextTrack ? $(Mixcloud.nodes.nextTrack).scope() : null);
//          console.log('prevCloudcast', Mixcloud.nodes.prevTrack ? $(Mixcloud.nodes.prevTrack).scope() : null);

          console.log('nextCloudcast', Mixcloud.scopes.nextTrack);
          console.log('prevCloudcast', Mixcloud.scopes.prevTrack);
        }
      });
    } catch (e) {

    }
  }

  WebApp.start();

})(this); // function(Nuvola)
