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

(function(Nuvola)
{

  // media player component
  var player = Nuvola.$object(Nuvola.MediaPlayer);

  // aliases
  var PlaybackState = Nuvola.PlaybackState;
  var PlayerAction = Nuvola.PlayerAction;

  // Create new WebApp prototype
  var WebApp = Nuvola.$WebApp();

  // Mixcloud API
  var Mixcloud = {
    "config": {
      "global": "html.ng-scope",
      "player": "div.player-wrapper"
    }
  };

  // initialization
  WebApp._onInitWebWorker = function(emitter)
  {
    Nuvola.WebApp._onInitWebWorker.call(this, emitter);

    var state = document.readyState;
    if (state === "interactive" || state === "complete")
    {
      this._onPageReady();
    } else
    {
      document.addEventListener("DOMContentLoaded", this._onPageReady.bind(this));
    }
  };

  // page is ready for magic
  WebApp._onPageReady = function()
  {
    // connect handler for signal ActionActivated
    Nuvola.actions.connect("ActionActivated", this);

    // start update routine
    this.timeout = setInterval(this._setCallback.bind(this), 100);
  };

  // callback function for Mixcloud JS API
  WebApp._setCallback = function()
  {
    try
    {
      // Angular scope is ready
      Mixcloud.globalScope = $(document.querySelector(Mixcloud.config.global)).scope();

      // API loaded
      clearInterval(this.timeout);
      
      // Start update routine
      this.update();
    } catch (e)
    {
      // JS API probably not ready yet
    }
  };

  // Extract data from the web page
  WebApp.update = function()
  {
    var track = {
      title: null,
      artist: null,
      album: null,
      artLocation: null
    };

    try
    {
      if (Mixcloud.globalScope.webPlayer.playerOpen === false || Mixcloud.globalScope.webPlayer.paused === true || playerScope.playing === false)
      {
        this.state = PlaybackState.PAUSED;
      } else if (playerScope.playing === true)
      {
        this.state = PlaybackState.PLAYING;
      } else
      {
        this.state = PlaybackState.UNKNOWN;
      }
      
      if (Mixcloud.globalScope.webPlayer.playerOpen === true)
      {
        var playerScope = $(document.querySelector(Mixcloud.config.player)).scope().player;
        
        track.album = {};
        track.album.title = playerScope.currentCloudcast.title;
        track.album.artist = playerScope.currentCloudcast.owner;
        track.artLocation = Nuvola.format("https:{1}", playerScope.currentCloudcast.widgetImage);
        track.album = Nuvola.format("{1} by {2}", track.album.title, track.album.artist);

        if (playerScope.nowPlaying.currentDisplayTrack == null)
        {
          track.title = track.artist = null;
        } else
        {
          track.title = playerScope.nowPlaying.currentDisplayTrack.title;
          track.artist = playerScope.nowPlaying.currentDisplayTrack.artist;
        }
      }
    } catch (e)
    {
      console.log(e);
    }

    player.setTrack(track);
    player.setPlaybackState(this.state || PlaybackState.UNKNOWN);
    player.setCanPlay(this.state === PlaybackState.PAUSED);
    player.setCanPause(this.state === PlaybackState.PLAYING);

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
    setTimeout(this.update.bind(this), 5000);
  };

  // Handler of playback actions
  WebApp._onActionActivated = function(emitter, name, param)
  {
    try{
     switch (name)
     {
     case PlayerAction.TOGGLE_PLAY:
     case PlayerAction.PLAY:
       if(Mixcloud.globalScope.webPlayer.playerOpen === false){
         Nuvola.clickOnElement(document.querySelector('.sub-header-play-button'));
       }else{
         
       }
    // case PlayerAction.PAUSE:
    // Nuvola.clickOnElement(Mixcloud.player);
     break;
    // case PlayerAction.STOP:
    // if (Mixcloud.player.className.indexOf('pause-state') > -1)
    // {
    // Nuvola.clickOnElement(Mixcloud.player);
    // }
    // break;
    // case PlayerAction.NEXT_SONG:
    // Nuvola.clickOnElement(Mixcloud.nextBtn.querySelector(".cloudcast-row-image"));
    // Mixcloud.refreshUpNextBtns = true;
    // break;
    // case PlayerAction.PREV_SONG:
    // Nuvola.clickOnElement(Mixcloud.prevBtn.querySelector(".cloudcast-row-image"));
    // Mixcloud.refreshUpNextBtns = true;
    // break;
     }
    }catch(e){
      console.log(e);
    }
  };

  WebApp.start();

})(this); // function(Nuvola)
