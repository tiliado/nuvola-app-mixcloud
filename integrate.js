/*
 * Copyright 2015 Samuel Mansour <nuvola-app-mixcloud@yay.ovh>
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer. 2. Redistributions in
 * binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other
 * materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
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
  }

  // Page is ready for magic
  WebApp._onPageReady = function()
  {
    // Connect handler for signal ActionActivated
    Nuvola.actions.connect("ActionActivated", this);

    // Start update routine
    this.update();
  }

  // Extract data from the web page
  WebApp.update = function()
  {
    var elm, state, album_title, album_artist, enabled;
    var track = {}

    elm = document.querySelector(".player-cloudcast-details .player-cloudcast-title");
    album_title = elm ? elm.innerText || null : null;

    elm = document.querySelector(".player-cloudcast-details .player-cloudcast-author-link");
    album_artist = elm ? elm.innerText || null : null;

    track.album = album_title && album_artist ? Nuvola.format("{1} by {2}", album_title, album_artist) : null;

    elm = document.querySelector(".player-wrapper .player-cloudcast-image img");
    track.artLocation = elm ? elm.src || null : null;

    elm = document.querySelector(".player-current-audio .current-track	");
    track.title = elm ? elm.innerText || null : null;

    elm = document.querySelector(".player-current-audio .current-artist span");
    track.artist = elm ? elm.innerText || null : null;

    player.setTrack(track);

    try
    {
      elm = document.querySelector(".player-control");

      if (elm.className.indexOf('pause-state') > -1 || elm.className.indexOf('loading-state') > -1)
      {
        state = PlaybackState.PLAYING;
      } else
      {
        state = PlaybackState.UNKNOWN;
      }
    } catch (e)
    {
      state = PlaybackState.UNKNOWN;
    }

    player.setPlaybackState(state);

    try
    {
      elm = document.querySelector(".pause-state") || document.querySelector(".loading-state");
      enabled = elm == null;
    } catch (e)
    {
      enabled = false;
    }
    player.setCanPlay(enabled);
    player.setCanPause(!enabled);

    if (!enabled)
    {
      try
      {
        player.setCanGoNext(document.querySelector(".cloudcast-upnext-row.now-playing").nextElementSibling);
      } catch (e)
      {
        player.setCanGoNext(false);
      }

      try
      {
        player.setCanGoPrev(document.querySelector(".cloudcast-upnext-row.now-playing").previousElementSibling);
      } catch (e)
      {
        player.setCanGoPrev(false);
      }
    } else
    {
      player.setCanGoPrev(false);
      player.setCanGoNext(false);
    }

    // Schedule the next update
    setTimeout(this.update.bind(this), 500);
  }

  // Handler of playback actions
  WebApp._onActionActivated = function(emitter, name, param)
  {
    switch (name)
    {
      case PlayerAction.TOGGLE_PLAY:
      case PlayerAction.PLAY:
      case PlayerAction.PAUSE:
        Nuvola.clickOnElement(document.querySelector(".player-control"));
        break;
      case PlayerAction.STOP:
        if (document.querySelector(".pause-state"))
        {
          Nuvola.clickOnElement(document.querySelector(".player-control"));
        }
        break;
      case PlayerAction.NEXT_SONG:
        Nuvola.clickOnElement(document.querySelector(".cloudcast-upnext-row.now-playing").nextElementSibling);
        break;
      case PlayerAction.PREV_SONG:
        Nuvola.clickOnElement(document.querySelector(".cloudcast-upnext-row.now-playing").previousElementSibling);
        break;
    }
  }

  WebApp.start();

})(this); // function(Nuvola)
