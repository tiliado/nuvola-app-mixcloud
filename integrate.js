/*
 * Copyright 2018 Jiří Janoušek <janousek.jiri@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
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

(function (Nuvola) {
  const ACTION_LOVE_TRACK = 'love-track'

  const C_ = Nuvola.Translate.pgettext
  const player = Nuvola.$object(Nuvola.MediaPlayer)
  const PlaybackState = Nuvola.PlaybackState
  const PlayerAction = Nuvola.PlayerAction
  const WebApp = Nuvola.$WebApp()

  WebApp._onInitAppRunner = function (emitter) {
    Nuvola.WebApp._onInitAppRunner.call(this, emitter)
    Nuvola.actions.addAction('playback', 'win', ACTION_LOVE_TRACK, C_('Action', 'Favorite track'),
      null, null, null, false)
  }

  WebApp._onInitWebWorker = function (emitter) {
    Nuvola.WebApp._onInitWebWorker.call(this, emitter)
    const state = document.readyState
    if (state === 'interactive' || state === 'complete') {
      this._onPageReady()
    } else {
      document.addEventListener('DOMContentLoaded', this._onPageReady.bind(this))
    }
  }

  WebApp._onPageReady = function () {
    Nuvola.actions.connect('ActionActivated', this)
    player.addExtraActions([ACTION_LOVE_TRACK])
    this.update()
  }

  WebApp.update = function () {
    try {
      const track = {
        title: null,
        artist: null,
        album: null,
        artLocation: null,
        rating: null,
        length: null
      }
      let elm = null
      elm = document.querySelector('.player .player-cloudcast-title')
      if (elm) {
        track.title = elm.textContent || null
      }
      elm = document.querySelector('.player .player-cloudcast-author .player-cloudcast-author-link')
      if (elm) {
        track.artist = elm.textContent || null
      }
      elm = document.querySelector('.player .player-cloudcast-image img')
      if (elm) {
        track.artLocation = elm.src.replace('/52x52/', '/480x480/') || null
      }
      const trackTime = this.trackTime()
      track.length = trackTime.total
      player.setTrack(track)
      player.setTrackPosition(trackTime.now)

      let state = PlaybackState.UNKNOWN
      const buttons = this.buttons()
      if (buttons.play) {
        state = PlaybackState.PAUSED
      } else if (buttons.pause) {
        state = PlaybackState.PLAYING
      }
      const volume = this.volume()
      player.updateVolume(volume)
      player.setPlaybackState(state)
      player.setCanSeek(state !== PlaybackState.UNKNOWN)
      player.setCanChangeVolume(volume !== null)
      player.setCanPlay(state !== PlaybackState.UNKNOWN && !!buttons.play)
      player.setCanPause(state !== PlaybackState.UNKNOWN && !!buttons.pause)

      const loveButton = this.loveButton()
      Nuvola.actions.updateEnabledFlag(ACTION_LOVE_TRACK, state !== PlaybackState.UNKNOWN && !!loveButton.button)
      Nuvola.actions.updateState(ACTION_LOVE_TRACK, loveButton.state)
    } finally {
      setTimeout(this.update.bind(this), 500)
    }
  }

  WebApp._onActionActivated = function (emitter, name, parameter) {
    const buttons = this.buttons()
    switch (name) {
      case PlayerAction.TOGGLE_PLAY:
        Nuvola.clickOnElement(buttons.play || buttons.pause)
        break
      case PlayerAction.PLAY:
        Nuvola.clickOnElement(buttons.play)
        break
      case PlayerAction.PAUSE:
        Nuvola.clickOnElement(buttons.pause)
        break
      case PlayerAction.STOP:
        Nuvola.clickOnElement(buttons.pause)
        break
      case PlayerAction.SEEK: {
        const trackTime = this.trackTime()
        const total = trackTime.total
        if (parameter >= 0 && parameter <= total) {
          Nuvola.clickOnElement(
            document.querySelector('.player .player-playbar .player-scrubber-buffered'), parameter / total, 0.5)
        }
        break
      }
      case PlayerAction.CHANGE_VOLUME: {
        const elm = document.querySelector('.player .player-volume-container')
        const bar = document.querySelector('.player .player-volume-toggle .player-volume-track')
        if (elm && bar) {
          const height = elm.style.height
          elm.style.height = '155px'
          Nuvola.clickOnElement(bar, 0.5, 1 - parameter)
          elm.style.height = height
        }
        break
      }
      case ACTION_LOVE_TRACK: {
        const loveButton = this.loveButton().button
        if (loveButton) {
          Nuvola.clickOnElement(loveButton)
        }
        break
      }
      default:
        throw Error('Action "' + name + '" not supported.')
    }
  }

  WebApp.trackTime = function () {
    const now = document.querySelector('.player .player-time')
    const end = document.querySelector('.player .player-time.end-time')
    const time = { now: null, total: null }
    if (now && end) {
      time.now = Nuvola.parseTimeUsec(now.textContent)
      time.total = time.now - Nuvola.parseTimeUsec(end.textContent)
    }
    return time
  }

  WebApp.volume = function () {
    const elm = document.querySelector('.player .player-volume-toggle .player-volume-percent')
    return elm && elm.style.height.endsWith('%') ? elm.style.height.slice(0, -1) / 100 : null
  }

  WebApp.buttons = function () {
    const elm = document.querySelector('.player .player-control')
    const buttons = {
      play: null,
      pause: null
    }
    if (elm) {
      buttons[elm.classList.contains('pause-state') ? 'pause' : 'play'] = elm
    }
    return buttons
  }

  WebApp.loveButton = function () {
    const button = document.querySelector('.player .player-icons.favorite')
    const state = button && button.classList.contains('favorite-state')
    return { button: button, state: state }
  }

  WebApp.start()
})(this)
