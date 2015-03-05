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

  // Create media player component
  var player = Nuvola.$object(Nuvola.MediaPlayer);

  // Handy aliases
  var PlaybackState = Nuvola.PlaybackState;
  var PlayerAction = Nuvola.PlayerAction;

  // Create new WebApp prototype
  var WebApp = Nuvola.$WebApp();
  
  // Mixcloud API
  var Mixcloud = {"config" : {"player" : "player-wrapper"}};
  
  // Initialization routines
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

  // Page is ready for magic
  WebApp._onPageReady = function()
  {
    // Connect handler for signal ActionActivated
    Nuvola.actions.connect("ActionActivated", this);
    
    // Start update routine
    this.update();
  };

  // Extract data from the web page
  WebApp.update = function()
  {
    var state, album_title, album_artist;
    var track = {}
//    
    try{
      if(!Mixcloud.hasOwnProperty("player")){
       var tmp =  angular.element(document.getElementsByClassName(Mixcloud.config.player)).scope();
       
       if(typeof tmp !== "undefined"){
         Mixcloud.player = tmp.player;
         console.log(tmp, tmp.player.currentCloudcast);
         return;
       }
      }else{
//        console.log(Mixcloud.player, Mixcloud.player.currentCloudcast);
//        console.log(tmp.player.currentCloudcast.title);
//      album_title = Mixcloud.player.currentCloudcast.title;
//      album_artist = Mixcloud.player.currentCloudcast.owner;
//  
//      track.album = Nuvola.format("{1} by {2}", album_title, album_artist);
//      track.artLocation = Mixcloud.player.currentCloudcast.wwwThumbnail;
//      track.title =  Mixcloud.player.nowPlaying.currentDisplayTrack.title;
//      track.artist = Mixcloud.player.nowPlaying.currentDisplayTrack.artist;
//      
//      player.setTrack(track);
      }
      
    }catch(e){
      console.error(e);
    }


//    try
//    {
//      if (Mixcloud.player.className.indexOf('pause-state') > -1 || Mixcloud.player.className.indexOf('loading-state') > -1)
//      {
//        state = PlaybackState.PLAYING;
//      } else
//      {
//        state = PlaybackState.PAUSED;
//      }
//    } catch (e)
//    {
//      state = PlaybackState.UNKNOWN;
//    }
//
//    player.setPlaybackState(state);
//
//    player.setCanPlay(state !== PlaybackState.PLAYING);
//    player.setCanPause(state === PlaybackState.PLAYING);
//
//    if (Mixcloud.refreshUpNextBtns){
//      try
//      {
//        Mixcloud.nextBtn = document.querySelector(".cloudcast-upnext-row.now-playing").nextElementSibling;
//        player.setCanGoNext(Mixcloud.nextBtn !== null);
//        Mixcloud.refreshUpNextBtns = false;
//      } catch (e)
//      {
//        player.setCanGoNext(false);
//      }
//      
//      try
//      {
//        Mixcloud.prevBtn = document.querySelector(".cloudcast-upnext-row.now-playing").previousElementSibling;
//        player.setCanGoPrev(Mixcloud.prevBtn !== null);
//        Mixcloud.refreshUpNextBtns = false;
//      } catch (e)
//      {
//        player.setCanGoPrev(false);
//      }
//    }
  
  
    // Schedule the next update
    setTimeout(this.update.bind(this), 500);
  };

  // Handler of playback actions
  WebApp._onActionActivated = function(emitter, name, param)
  {
//    switch (name)
//    {
//      case PlayerAction.TOGGLE_PLAY:
//      case PlayerAction.PLAY:
//      case PlayerAction.PAUSE:
//        Nuvola.clickOnElement(Mixcloud.player);
//        break;
//      case PlayerAction.STOP:
//        if (Mixcloud.player.className.indexOf('pause-state') > -1)
//        {
//          Nuvola.clickOnElement(Mixcloud.player);
//        }
//        break;
//      case PlayerAction.NEXT_SONG:
//        Nuvola.clickOnElement(Mixcloud.nextBtn.querySelector(".cloudcast-row-image"));
//        Mixcloud.refreshUpNextBtns = true;
//        break;
//      case PlayerAction.PREV_SONG:
//        Nuvola.clickOnElement(Mixcloud.prevBtn.querySelector(".cloudcast-row-image"));
//        Mixcloud.refreshUpNextBtns = true;
//        break;
//    }
  };
  
  WebApp.start();

})(this); // function(Nuvola)
