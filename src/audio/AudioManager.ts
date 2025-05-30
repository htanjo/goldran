import {
  AudioEngineV2,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  SoundState,
  StaticSound,
} from '@babylonjs/core';
import { sounds } from '../settings/sounds';
import musicBackground from '../assets/music_background.mp3';
import soundBoom from '../assets/sound_boom.mp3';
import soundBoost from '../assets/sound_boost.mp3';
import soundBoot from '../assets/sound_boot.mp3';
import soundClunk from '../assets/sound_clunk.mp3';
import soundCrash from '../assets/sound_crash.mp3';
import soundDelay from '../assets/sound_delay.mp3';
import soundDown from '../assets/sound_down.mp3';
import soundElectric from '../assets/sound_electric.mp3';
import soundEngine from '../assets/sound_engine.mp3';
import soundFlash from '../assets/sound_flash.mp3';
import soundHero from '../assets/sound_hero.mp3';
import soundHover from '../assets/sound_hover.mp3';
import soundImpact from '../assets/sound_impact.mp3';
import soundLanding from '../assets/sound_landing.mp3';
import soundLightning from '../assets/sound_lightning.mp3';
import soundRelease from '../assets/sound_release.mp3';
import soundReturn from '../assets/sound_return.mp3';
import soundRise from '../assets/sound_rise.mp3';
import soundRoar from '../assets/sound_roar.mp3';
import soundSplash from '../assets/sound_splash.mp3';
import soundSwing from '../assets/sound_swing.mp3';
import soundTap from '../assets/sound_tap.mp3';
import soundWarn from '../assets/sound_warn.mp3';
import soundWhirl from '../assets/sound_whirl.mp3';

const soundUrls: { [key: string]: string } = {
  boom: soundBoom,
  boost: soundBoost,
  boot: soundBoot,
  clunk: soundClunk,
  crash: soundCrash,
  delay: soundDelay,
  down: soundDown,
  electric: soundElectric,
  engine: soundEngine,
  flash: soundFlash,
  hero: soundHero,
  hover: soundHover,
  impact: soundImpact,
  landing: soundLanding,
  lightning: soundLightning,
  release: soundRelease,
  return: soundReturn,
  rise: soundRise,
  roar: soundRoar,
  splash: soundSplash,
  swing: soundSwing,
  tap: soundTap,
  warn: soundWarn,
  whirl: soundWhirl,
};

export default class AudioManager {
  private audioEngine: AudioEngineV2 | null = null;

  private frame: number = 0;

  private previousFrame: number = 0;

  private backgroundMusicVolume: number = 0.25;

  private backgroundMusicPaused: boolean = false;

  private backgroundMusicTimeout: NodeJS.Timeout | null = null;

  private backgroundMusicFadeOutInterval: NodeJS.Timeout | null = null;

  private sounds: Map<string, StaticSound> = new Map();

  private backgroundMusic: StaticSound | null = null;

  public constructor() {
    this.createAudioEngine();
  }

  public applyFrame(frame: number, disableAudio?: boolean) {
    this.previousFrame = this.frame;
    this.frame = frame;
    if (this.audioEngine && !disableAudio) {
      sounds.forEach((sound) => {
        if (
          ((this.frame >= sound.frame && this.previousFrame < sound.frame) ||
            (this.frame <= sound.frame && this.previousFrame > sound.frame)) &&
          Math.abs(this.frame - this.previousFrame) < 100 * 2.5
        ) {
          const targetSound = this.sounds.get(sound.name);
          if (targetSound) {
            targetSound.stereo.pan = sound.pan;
            targetSound.play({ volume: sound.volume });
          }
        }
      });
    }
    // Clear the timeout if applyFrame is called again before it executes.
    if (this.backgroundMusicTimeout) {
      clearTimeout(this.backgroundMusicTimeout);
      this.backgroundMusicTimeout = null;
    }
    // If background music is not playing, start it.
    if (this.backgroundMusic && this.backgroundMusicPaused && !disableAudio) {
      this.fadeInBackgroundMusic();
    }
    // Stop music if applyFrame is not called for a while.
    this.backgroundMusicTimeout = setTimeout(() => {
      this.fadeOutBackgroundMusic();
    }, 5000);
  }

  public async loadAssets() {
    Object.keys(soundUrls).forEach(async (key) => {
      const soundUrl = soundUrls[key];
      const sound = await CreateSoundAsync(key, soundUrl, {
        stereoEnabled: true,
      });
      this.sounds.set(key, sound);
    });
    const backgroundMusic = await CreateSoundAsync(
      'background',
      musicBackground,
      {
        loop: true,
        volume: this.backgroundMusicVolume,
      },
    );
    this.backgroundMusic = backgroundMusic;
  }

  // Starts background music if it is not already playing.
  public async startBackgroundMusic() {
    if (
      this.audioEngine &&
      this.backgroundMusic &&
      (this.backgroundMusic.state === SoundState.Stopped ||
        this.backgroundMusic.state === SoundState.FailedToStart)
    ) {
      this.backgroundMusic.play();
    }
  }

  public mute() {
    if (this.audioEngine) {
      this.audioEngine.volume = 0;
    }
  }

  public unmute() {
    if (this.audioEngine) {
      this.audioEngine.volume = 1;
    }
  }

  private async createAudioEngine() {
    const audioEngine = await CreateAudioEngineAsync({
      disableDefaultUI: true,
      volume: 0.7,
    });
    await audioEngine.unlockAsync();
    this.audioEngine = audioEngine;
  }

  private fadeInBackgroundMusic(duration: number = 1000) {
    this.backgroundMusicPaused = false;
    if (this.backgroundMusicFadeOutInterval) {
      clearInterval(this.backgroundMusicFadeOutInterval);
    }
    if (this.backgroundMusic) {
      this.backgroundMusic.resume();
    }
    const intervalTime = 10; // milliseconds
    const interval = setInterval(() => {
      if (
        this.backgroundMusic &&
        this.backgroundMusic.volume < this.backgroundMusicVolume
      ) {
        this.backgroundMusic.volume +=
          (intervalTime / duration) * this.backgroundMusicVolume;
      } else {
        clearInterval(interval);
        if (this.backgroundMusic) {
          this.backgroundMusic.volume = this.backgroundMusicVolume;
        }
      }
    }, intervalTime);
  }

  private fadeOutBackgroundMusic(duration: number = 5000) {
    this.backgroundMusicPaused = true;
    const intervalTime = 10; // milliseconds
    const interval = setInterval(() => {
      if (this.backgroundMusic && this.backgroundMusic.volume > 0) {
        this.backgroundMusic.volume -=
          (intervalTime / duration) * this.backgroundMusicVolume;
      } else {
        clearInterval(interval);
        if (this.backgroundMusic) {
          this.backgroundMusic.volume = 0;
          this.backgroundMusic.pause();
        }
      }
    }, intervalTime);
    this.backgroundMusicFadeOutInterval = interval;
  }
}
