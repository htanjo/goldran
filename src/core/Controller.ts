import { Scene } from '@babylonjs/core/scene';
import VirtualScroll, { VirtualScrollEvent } from 'virtual-scroll';
import SceneManager from '../graphics/SceneManager';
import { hasPointingDevice, hasTouchscreen, vrMode } from '../settings/general';
import {
  maxFrame as maxFrameSetting,
  moveSpeed as moveSpeedSetting,
} from '../settings/frames';

interface DeviceOrientation {
  alpha: number;
  beta: number;
  gamma: number;
}

export default class Controller {
  public frame = 0;

  private maxFrame = maxFrameSetting;

  private moveSpeed = moveSpeedSetting; // Number of frames advanced by 1px scroll input.

  private contentHeight = this.maxFrame / this.moveSpeed;

  private touchMultiplier = 2;

  private usePointerInput = false;

  private useOrientationInput = false;

  private maxDeviceRotation = 20; // degrees

  private baseDeviceOrientation: DeviceOrientation | null = null;

  private deviceOrientation: DeviceOrientation | null = null;

  private loadingScreenEnabled = true;

  private loadingProgress = 0;

  private startScreenEnabled = false;

  private startScreenProgress = 0; // 0 to 1

  private startScreenScroll = 0; // pixels

  private startScreenLength = 1000; // pixels

  private endScreenEnabled = false;

  private endScreenLength = 100; // pixels

  private autoplayEnabled = false;

  private contentFinished = false;

  private vrEnabled = false;

  private vrSwitching = false;

  public sceneManager: SceneManager;

  private emitter: EventTarget;

  private virtualScroll: VirtualScroll | null = null;

  private pointermoveListener: (event: PointerEvent) => void;

  private deviceOrientationListener: (event: DeviceOrientationEvent) => void;

  private orientationChangeListener: (event: Event) => void;

  public constructor(scene: Scene) {
    this.usePointerInput = hasPointingDevice;
    this.useOrientationInput =
      !this.usePointerInput && !!window.DeviceOrientationEvent && !vrMode; // TODO: More precisely, the input should only be disabled when VR is activated.
    this.pointermoveListener = this.handlePointermove.bind(this);
    this.deviceOrientationListener = this.handleDeviceOrientation.bind(this);
    this.orientationChangeListener = this.handleOrientationChange.bind(this);

    // Prepare for custom events.
    this.emitter = new EventTarget();

    // Set up 3D scene.
    this.sceneManager = new SceneManager(scene);

    // Load glTF and textures.
    this.sceneManager.loadAssets();

    // Update loading progress.
    this.sceneManager.onAssetsLoaded((remaining, total) => {
      // Add +1 for final rendering task.
      this.loadingProgress = 1 - (remaining + 1) / (total + 1);
      this.emitter.dispatchEvent(new CustomEvent('loadingProgress'));
    });

    // Attach input events after assets loaded.
    this.sceneManager.onReady(() => {
      this.virtualScroll = new VirtualScroll({
        touchMultiplier: this.touchMultiplier,
      });
      this.virtualScroll.on(this.handleScroll.bind(this));

      if (this.usePointerInput) {
        window.addEventListener('pointermove', this.pointermoveListener);
      }
      if (this.useOrientationInput) {
        window.addEventListener(
          'deviceorientation',
          this.deviceOrientationListener,
        );
        window.screen.orientation.addEventListener(
          'change',
          this.orientationChangeListener,
        );
      }

      this.sceneManager.onVrStateChange((enabled, switching) => {
        this.vrEnabled = enabled;
        this.vrSwitching = switching;
        this.emitter.dispatchEvent(new CustomEvent('vrStateChange'));
      });

      // Hide loading screen and show start screen.
      // Slightly delay it to prevent frame drop due to the initial rendering.
      setTimeout(() => {
        this.loadingProgress = 1;
        this.loadingScreenEnabled = false;
        this.startScreenEnabled = true;
        this.emitter.dispatchEvent(new CustomEvent('loadingProgress'));
        this.emitter.dispatchEvent(new CustomEvent('loadingScreenToggle'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
      }, 500);
    });
  }

  public onLoadingScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('loadingScreenToggle', () => {
      callback(this.loadingScreenEnabled);
    });
  }

  public onLoadingProgress(callback: (progress: number) => void) {
    this.emitter.addEventListener('loadingProgress', () => {
      callback(this.loadingProgress);
    });
  }

  public onStartScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('startScreenToggle', () => {
      callback(this.startScreenEnabled);
    });
  }

  public onStartScreenProgress(
    callback: (progress: number, scroll: number) => void,
  ) {
    this.emitter.addEventListener('startScreenProgress', () => {
      callback(this.startScreenProgress, this.startScreenScroll);
    });
  }

  public onEndScreenToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('endScreenToggle', () => {
      callback(this.endScreenEnabled);
    });
  }

  public onFrameProgress(
    callback: (frame: number, maxFrame: number, moveSpeed: number) => void,
  ) {
    this.emitter.addEventListener('frameProgress', () => {
      callback(this.frame, this.maxFrame, this.moveSpeed);
    });
  }

  public onAutoplayToggle(callback: (enabled: boolean) => void) {
    this.emitter.addEventListener('autoplayToggle', () => {
      callback(this.autoplayEnabled);
    });
  }

  public onContentFinish(callback: (finished: boolean) => void) {
    this.emitter.addEventListener('contentFinish', () => {
      callback(this.contentFinished);
    });
  }

  public onVrStateChange(
    callback: (enabled: boolean, switching: boolean) => void,
  ) {
    this.emitter.addEventListener('vrStateChange', () => {
      callback(this.vrEnabled, this.vrSwitching);
    });
  }

  public enableAutoplay(delay?: number) {
    if (this.autoplayEnabled) {
      return;
    }
    this.autoplayEnabled = true;
    this.emitter.dispatchEvent(new CustomEvent('autoplayToggle'));
    let previousTime: number;
    const autoScroll = (timestamp: number) => {
      if (!this.autoplayEnabled) {
        return;
      }
      if (previousTime === undefined) {
        previousTime = timestamp;
        window.requestAnimationFrame(autoScroll);
        return;
      }
      const frameTime = timestamp - previousTime;
      this.handleScrollInput(frameTime * 0.6);
      previousTime = timestamp;
      if (this.frame >= this.maxFrame) {
        this.autoplayEnabled = false;
      } else {
        window.requestAnimationFrame(autoScroll);
      }
    };
    if (delay !== undefined) {
      setTimeout(() => {
        window.requestAnimationFrame(autoScroll);
      }, delay);
    } else {
      window.requestAnimationFrame(autoScroll);
    }
  }

  public disableAutoplay() {
    this.autoplayEnabled = false;
    this.emitter.dispatchEvent(new CustomEvent('autoplayToggle'));
  }

  public restartAutoplay() {
    const scrollOffset = this.frame / this.moveSpeed;
    this.handleScrollInput(-scrollOffset, true);
    this.enableAutoplay(1500);
  }

  public destroy() {
    if (this.virtualScroll) {
      this.virtualScroll.destroy();
    }
    if (this.usePointerInput) {
      window.removeEventListener('pointermove', this.pointermoveListener);
    }
    if (this.useOrientationInput) {
      window.removeEventListener(
        'deviceorientation',
        this.deviceOrientationListener,
      );
      window.screen.orientation.removeEventListener(
        'change',
        this.orientationChangeListener,
      );
    }
    // TODO: Remove custom event listeners.
    // if (this.emitter) {
    // }
  }

  private inputMove(value: number, disableSmoothMove?: boolean) {
    const frameIncrement = value;
    let nextContentFinished = false;

    // Handle frame update.
    if (frameIncrement !== 0) {
      const newFrame = this.frame + frameIncrement;
      if (newFrame < 0) {
        this.frame = 0;
      } else if (newFrame >= this.maxFrame) {
        this.frame = this.maxFrame;
        nextContentFinished = true;
      } else {
        // Otherwise, just update the frame number.
        this.frame = newFrame;
      }
      this.emitter.dispatchEvent(new CustomEvent('frameProgress'));
      this.sceneManager.applyFrame(this.frame, disableSmoothMove);
      if (this.contentFinished !== nextContentFinished) {
        this.contentFinished = nextContentFinished;
        if (this.contentFinished) {
          this.emitter.dispatchEvent(new CustomEvent('contentFinish'));
          if (this.autoplayEnabled) {
            this.autoplayEnabled = false;
            this.emitter.dispatchEvent(new CustomEvent('autoplayToggle'));
          }
        }
      }
    }
  }

  private inputRotation(x: number, y: number) {
    this.sceneManager.applyRotation(x, y); // Each value ranges from -1 to 1.
  }

  private resetOrientation() {
    this.baseDeviceOrientation = this.deviceOrientation
      ? { ...this.deviceOrientation }
      : null;
  }

  private handleScrollInput(scrollLength: number, disableSmoothMove?: boolean) {
    // Update frame.
    const frameIncrement = scrollLength * this.moveSpeed;
    this.inputMove(frameIncrement, disableSmoothMove);

    // Check if start screen is visible.
    const totalScrollLength = (this.frame / this.maxFrame) * this.contentHeight;
    if (
      totalScrollLength <= this.startScreenLength &&
      !this.startScreenEnabled
    ) {
      this.startScreenEnabled = true;
      this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
    }
    // Check if end screen is visible.
    if (
      totalScrollLength >= this.contentHeight - this.endScreenLength &&
      !this.endScreenEnabled
    ) {
      this.endScreenEnabled = true;
      this.emitter.dispatchEvent(new CustomEvent('endScreenToggle'));
    } else if (
      totalScrollLength < this.contentHeight - this.endScreenLength &&
      this.endScreenEnabled
    ) {
      this.endScreenEnabled = false;
      this.emitter.dispatchEvent(new CustomEvent('endScreenToggle'));
    }

    // In the start screen, update progress as well.
    if (this.startScreenEnabled) {
      const scrollMultiplier = hasTouchscreen ? this.touchMultiplier : 1;
      this.startScreenScroll += scrollLength / scrollMultiplier;
      if (this.startScreenScroll < 0) {
        this.startScreenScroll = 0;
      }
      this.startScreenProgress += scrollLength / this.startScreenLength;
      if (this.startScreenProgress < 0) {
        // Stop at the initial position.
        this.startScreenProgress = 0;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
      } else if (this.startScreenProgress > 1) {
        // Hide the start screen and start playable mode.
        this.startScreenProgress = 1;
        this.startScreenEnabled = false;
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
        this.emitter.dispatchEvent(new CustomEvent('startScreenToggle'));
      } else {
        // Play animations during the start screen.
        this.emitter.dispatchEvent(new CustomEvent('startScreenProgress'));
      }
    }
  }

  private handleScroll(event: VirtualScrollEvent) {
    // Do nothing during the loading screen.
    if (this.loadingScreenEnabled) {
      return;
    }
    // Scroll event cancels autoplay.
    if (this.autoplayEnabled) {
      this.disableAutoplay();
    }
    const scrollLength = -event.deltaY;
    this.handleScrollInput(scrollLength);
  }

  private handlePointermove(event: PointerEvent) {
    const { innerWidth, innerHeight } = window;
    if (innerWidth > 0 && innerHeight > 0) {
      const xInput = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const yInput = (event.clientY - innerHeight / 2) / (innerHeight / 2);
      this.inputRotation(xInput, yInput);
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    const { alpha, beta, gamma } = event;
    if (alpha !== null && beta !== null && gamma !== null) {
      if (!this.baseDeviceOrientation) {
        this.baseDeviceOrientation = { alpha, beta, gamma };
      }
      this.deviceOrientation = { alpha, beta, gamma };

      let betaInput: number;
      const betaRotation =
        this.deviceOrientation.beta - this.baseDeviceOrientation.beta;
      if (betaRotation < -this.maxDeviceRotation) {
        betaInput = -1;
      } else if (betaRotation > this.maxDeviceRotation) {
        betaInput = 1;
      } else {
        betaInput = betaRotation / this.maxDeviceRotation;
      }

      let gammaInput: number;
      const gammaRotation =
        this.deviceOrientation.gamma - this.baseDeviceOrientation.gamma;
      if (gammaRotation < -this.maxDeviceRotation) {
        gammaInput = 1;
      } else if (gammaRotation > this.maxDeviceRotation) {
        gammaInput = -1;
      } else {
        gammaInput = -gammaRotation / this.maxDeviceRotation;
      }

      let xInput: number;
      let yInput: number;
      switch (window.screen.orientation.type) {
        case 'portrait-primary':
          xInput = gammaInput;
          yInput = -betaInput;
          break;
        case 'portrait-secondary':
          xInput = -gammaInput;
          yInput = betaInput;
          break;
        case 'landscape-primary':
          xInput = -betaInput;
          yInput = -gammaInput;
          break;
        case 'landscape-secondary':
          xInput = betaInput;
          yInput = gammaInput;
          break;
        default:
          xInput = gammaInput;
          yInput = -betaInput;
      }
      this.inputRotation(xInput, yInput);
    }
  }

  private handleOrientationChange() {
    this.resetOrientation();
  }
}
