import {
  AudioEngineV2,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  StaticSound,
} from '@babylonjs/core';
import { sounds } from '../settings/sounds';
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
import soundImpact from '../assets/sound_impact.mp3';
import soundLightning from '../assets/sound_lightning.mp3';
import soundRelease from '../assets/sound_release.mp3';
import soundReturn from '../assets/sound_return.mp3';
import soundRoar from '../assets/sound_roar.mp3';
import soundSplash from '../assets/sound_splash.mp3';
import soundSwing from '../assets/sound_swing.mp3';
import soundTap from '../assets/sound_tap.mp3';
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
  impact: soundImpact,
  lightning: soundLightning,
  release: soundRelease,
  return: soundReturn,
  roar: soundRoar,
  splash: soundSplash,
  swing: soundSwing,
  tap: soundTap,
  whirl: soundWhirl,
};

export default class AudioManager {
  private audioEngine: AudioEngineV2 | null = null;

  private frame: number = 0;

  private previousFrame: number = 0;

  private sounds: Map<string, StaticSound> = new Map();

  public constructor() {
    this.createAudioEngine();
  }

  public applyFrame(frame: number) {
    this.previousFrame = this.frame;
    this.frame = frame;
    if (this.audioEngine) {
      sounds.forEach((sound) => {
        if (
          (this.frame >= sound.frame && this.previousFrame < sound.frame) ||
          (this.frame <= sound.frame && this.previousFrame > sound.frame)
        ) {
          this.sounds.get(sound.name)?.play({ volume: sound.volume });
        }
      });
    }
  }

  private async createAudioEngine() {
    const audioEngine = await CreateAudioEngineAsync({
      disableDefaultUI: true,
    });
    Object.keys(soundUrls).forEach(async (key) => {
      const soundUrl = soundUrls[key];
      const sound = await CreateSoundAsync(key, soundUrl);
      this.sounds.set(key, sound);
    });
    await audioEngine.unlockAsync();
    this.audioEngine = audioEngine;
  }
}
