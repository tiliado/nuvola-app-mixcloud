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

  // custom objects
  var Mixcloud = {
    "scope": {
      "global": "html.ng-scope",
      "player": "div.player-wrapper"
    },
    "html": {
      "wrapper": ["div", {
        "style": "display:none"
      }],
      "playAllBtn": ["span", {
        "m-play-all-button": ""
      }],
      "playBtn": ["span", {
        "m-player-play-button": ""
      }]
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

    // JS API will compile our custom scope
    Mixcloud.customWrapper = Nuvola.makeElement.apply(this, Mixcloud.html.wrapper);
    Mixcloud.playAllBtn = Nuvola.makeElement.apply(this, Mixcloud.html.playAllBtn);
    Mixcloud.playBtn = Nuvola.makeElement.apply(this, Mixcloud.html.playBtn);
    Mixcloud.customWrapper.appendChild(Mixcloud.playAllBtn);
    Mixcloud.customWrapper.appendChild(Mixcloud.playBtn)
    document.body.appendChild(Mixcloud.customWrapper);

    // start update routine
    this.timeout = setInterval(this._setCallback.bind(this), 100);
  };

  // callback function for Mixcloud JS API
  WebApp._setCallback = function() {
    try {
      // Scopes are ready
      Mixcloud.globalScope = $(document.querySelector(Mixcloud.scope.global)).scope();
      Mixcloud.playerScope = $(document.querySelector(Mixcloud.scope.player)).scope();

      // API loaded
      clearInterval(this.timeout);

      // Start update routine
      this.update();
    } catch (e) {
      // JS API probably not ready yet
    }
  };

  // Extract data from the web page
  WebApp.update = function() {
    var track = {
      title: null,
      artist: null,
      album: null,
      artLocation: null
    }, state = PlaybackState.UNKNOWN;

    try {
      if (Mixcloud.globalScope.webPlayer.playerOpen) {
        if (Mixcloud.playerScope.player.buffering) {
          state = PlaybackState.UNKNOWN;
        } else if (Mixcloud.playerScope.player.playing) {
          state = PlaybackState.PLAYING;
        } else {
          state = PlaybackState.PAUSED;
        }

        track.album = {};
        track.album.title = Mixcloud.playerScope.player.currentCloudcast.title;
        track.album.artist = Mixcloud.playerScope.player.currentCloudcast.owner;
        track.artLocation = Nuvola.format("https:{1}", Mixcloud.playerScope.player.currentCloudcast.widgetImage);
        track.album = Nuvola.format("{1} by {2}", track.album.title, track.album.artist);

        if (Mixcloud.playerScope.player.nowPlaying.currentDisplayTrack == null) {
          track.title = track.artist = null;
        } else {
          track.title = Mixcloud.playerScope.player.nowPlaying.currentDisplayTrack.title;
          track.artist = Mixcloud.playerScope.player.nowPlaying.currentDisplayTrack.artist;
        }
      } else {
        state = PlaybackState.PAUSED;
      }
    } catch (e) {
      // gracefull fallback
      console.log(e);
    }

    player.setTrack(track);
    player.setPlaybackState(state);
    player.setCanPlay(state === PlaybackState.PAUSED);
    player.setCanPause(state === PlaybackState.PLAYING);

    // if (Mixcloud.refreshUpNextBtns){
    // try
    // {
    // Mixcloud.nextBtn =
    // document.querySelector(".cloudcast-upnext-row.now-playing").nextElementSibling;
    // player.setCanGoNext(Mixcloud.nextBtn !== null);
    // Mixcloud.refreshUpNextBtns = false;
    // } catch (e)
    // {
    // player.setCanGoNext(false);
    // }
    //      
    // try
    // {
    // Mixcloud.prevBtn =
    // document.querySelector(".cloudcast-upnext-row.now-playing").previousElementSibling;
    // player.setCanGoPrev(Mixcloud.prevBtn !== null);
    // Mixcloud.refreshUpNextBtns = false;
    // } catch (e)
    // {
    // player.setCanGoPrev(false);
    // }
    // }

    // Schedule the next update
    setTimeout(this.update.bind(this), 500);
  };

  // Handler of playback actions
  WebApp._onActionActivated = function(emitter, name, param) {
    try {
      switch (name) {
      case PlayerAction.TOGGLE_PLAY:
      case PlayerAction.PLAY:
        if (Mixcloud.globalScope.webPlayer.playerOpen === false) {
          Nuvola.clickOnElement(Mixcloud.playAllBtn);
        } else {
          Mixcloud.playerScope.player.togglePlayClick();
        }
      case PlayerAction.STOP:
      case PlayerAction.PAUSE:
        Mixcloud.playerScope.player.togglePlayClick();
        break;
      // case PlayerAction.NEXT_SONG:
      // Nuvola.clickOnElement(Mixcloud.nextBtn.querySelector(".cloudcast-row-image"));
      // Mixcloud.refreshUpNextBtns = true;
      // break;
      // case PlayerAction.PREV_SONG:
      // Nuvola.clickOnElement(Mixcloud.prevBtn.querySelector(".cloudcast-row-image"));
      // Mixcloud.refreshUpNextBtns = true;
      // break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  WebApp.start();

})(this); // function(Nuvola)
