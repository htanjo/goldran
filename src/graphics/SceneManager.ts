import { AssetsManager } from '@babylonjs/core/Misc/assetsManager';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { PointLight } from '@babylonjs/core/Lights/pointLight';
import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { WebXRCamera } from '@babylonjs/core/XR/webXRCamera';
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience';
import { WebXREnterExitUIButton } from '@babylonjs/core/XR/webXREnterExitUI';
import { WebXRState } from '@babylonjs/core/XR/webXRTypes';
import '@babylonjs/core/Animations/animatable';
import '@babylonjs/loaders/glTF';
import i18n from 'i18next';
import Effects from './Effects';
import AudioManager from '../audio/AudioManager';
import { checkVrSupport, vrMode } from '../settings/general';
import { LightConfig, lightConfigs } from '../settings/lights';
import { assetConfigs } from '../settings/assets';
import { TextureConfig, textureConfigs } from '../settings/textures';
import { lightChangeFrame, vrSpeedRatio } from '../settings/frames';

export default class SceneManager {
  private scene: Scene;

  private camera: FreeCamera;

  private effects: Effects | null = null;

  private skyboxMaterial: StandardMaterial;

  private remainingLoaded: number = 0;

  private totalLoaded: number = 0;

  private frame: number = 0;

  private previousFrame: number = 0;

  private nextFrame: number = 0;

  private previousAnimationTime: number = 0;

  private smoothAnimationDone: boolean = true;

  private lightPeriod: 'former' | 'latter' = 'former';

  public inputX = 0; // -1 to 1

  public inputY = 0; // -1 to 1

  private minFov = 36 * (Math.PI / 180); // FOV for 16/9 landscape mode.

  private maxFov = 60 * (Math.PI / 180); // FOV for 9/16 portrait mode.

  private vrEnabled: boolean = false;

  private vrSwitching: boolean = false;

  private audioManager: AudioManager;

  private emitter: EventTarget;

  public constructor(scene: Scene, audioManager: AudioManager) {
    this.scene = scene;

    // Configure scene.
    this.scene.clearColor = Color4.FromHexString('#000000ff');
    this.scene.ambientColor = Color3.White();
    this.scene.fogMode = Scene.FOGMODE_EXP2;
    this.scene.fogColor = Color3.FromHexString('#413d38');
    this.scene.fogDensity = 0.02;
    this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
    // this.scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);

    // Create tentative camera as it's necessary for scene.
    const initialCamera = new FreeCamera(
      'initial_camera',
      Vector3.Zero(),
      scene,
    );
    initialCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    this.camera = initialCamera;

    // Create skybox.
    const skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
    const skyboxMaterial = new StandardMaterial('skybox', scene);
    skybox.material = skyboxMaterial;
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.fogEnabled = false;
    this.skyboxMaterial = skyboxMaterial;

    this.audioManager = audioManager;
    this.emitter = new EventTarget();
  }

  public applyFrame(frame: number, disableSmoothMove?: boolean) {
    const currentTime = Date.now();

    // In some conditions, go to target frame without delay.
    if (
      disableSmoothMove || // Disabled flag
      currentTime - this.previousAnimationTime < 10 || // Continuous move
      Math.abs(frame - this.frame) < 5 || // Very short move
      Math.abs(frame - this.frame) > 200 // Very long move
    ) {
      this.smoothAnimationDone = true;
      this.previousAnimationTime = currentTime;
      this.frame = frame;
      this.previousFrame = frame;
      this.nextFrame = frame;
      this.scene.animationGroups.forEach((animationGroup) => {
        animationGroup.goToFrame(this.frame);
      });
      this.toggleLights();
      return;
    }

    // For intermitted updates, simulate smooth animation.
    const transitionDuration = 1200; // ms
    let startTime: number;
    let previousTime: number;

    this.smoothAnimationDone = false;
    this.previousAnimationTime = currentTime;
    this.previousFrame = this.frame;
    this.nextFrame = frame;

    // Reference: https://easings.net/
    const easeOutCubic = (x: number): number => 1 - (1 - x) ** 3;

    const smoothAnimation = (timestamp: number) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }
      const elapsedTime = timestamp - startTime;
      if (previousTime !== timestamp) {
        const easingArgument = elapsedTime / transitionDuration;
        const easingFactor = easeOutCubic(easingArgument);
        const frameDiff = this.nextFrame - this.previousFrame;
        const transitionFrame = this.previousFrame + frameDiff * easingFactor;
        this.frame = transitionFrame;
        this.scene.animationGroups.forEach((animationGroup) => {
          animationGroup.goToFrame(this.frame);
        });
        this.toggleLights();
      }
      if (elapsedTime < transitionDuration) {
        previousTime = currentTime;
        if (!this.smoothAnimationDone) {
          window.requestAnimationFrame(smoothAnimation);
        }
      } else {
        this.smoothAnimationDone = true;
        this.frame = this.nextFrame;
        this.scene.animationGroups.forEach((animationGroup) => {
          animationGroup.goToFrame(this.frame);
        });
        this.toggleLights();
      }
    };

    window.requestAnimationFrame(smoothAnimation);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public applyRotation(x: number, y: number) {
    this.inputX = x;
    this.inputY = y;
  }

  public loadAssets() {
    const { scene } = this;
    const assetsManager = new AssetsManager(scene);

    // Hide built-in loading screen.
    assetsManager.useDefaultLoadingScreen = false;

    // Load assets.
    assetConfigs.forEach((assetConfig) => {
      const { type, name, url } = assetConfig;
      switch (type) {
        case 'mesh':
          assetsManager.addMeshTask(name, undefined, url, '');
          break;
        case 'texture':
          assetsManager.addTextureTask(name, url, undefined, false);
          break;
        case 'cubeTexture':
          assetsManager.addCubeTextureTask(name, url);
          break;
        // no default
      }
    });
    assetsManager.load();

    assetsManager.onProgress = (remaining, total) => {
      this.remainingLoaded = remaining;
      this.totalLoaded = total;
      this.emitter.dispatchEvent(new CustomEvent('assetsLoadingProgress'));
    };

    assetsManager.onFinish = () => {
      try {
        // Set up camera and effects.
        const animationCamera = scene.getCameraByName('Camera');
        if (!animationCamera || !(animationCamera instanceof FreeCamera)) {
          return;
        }
        animationCamera.minZ = 0.01;
        animationCamera.maxZ = 1200;
        scene.activeCamera = animationCamera;
        this.camera = animationCamera;
        this.effects = new Effects(this.scene, [this.camera]);

        // Configure textures loaded by assetsManager.
        textureConfigs.forEach((textureConfig) => {
          this.configureTexture(textureConfig);
        });

        // Create lights for specular lighting.
        lightConfigs.forEach((lightConfig) => {
          this.createLight(lightConfig);
        });
        this.toggleLights(this.lightPeriod);

        // Configure materials.
        scene.materials.forEach((material) => {
          if (material instanceof PBRMaterial) {
            // eslint-disable-next-line no-param-reassign
            material.maxSimultaneousLights = 5;
          }
        });

        // Make all animations controllable.
        scene.animationGroups.forEach((animationGroup) => {
          animationGroup.play();
          animationGroup.pause();
          animationGroup.goToFrame(0);
        });

        // Prepare for VR mode.
        if (vrMode) {
          this.initializeVr();
        }

        // Update camera offset every frame.
        scene.registerBeforeRender(() => this.updateCamera());

        // Dispatch onReady event for listeners.
        this.emitter.dispatchEvent(new CustomEvent('ready'));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw error;
      }
    };
  }

  public onAssetsLoaded(callback: (remaining: number, total: number) => void) {
    this.emitter.addEventListener('assetsLoadingProgress', () => {
      callback(this.remainingLoaded, this.totalLoaded);
    });
  }

  public onReady(callback: () => void) {
    this.emitter.addEventListener('ready', () => {
      callback();
    });
  }

  public onVrStateChange(
    callback: (enabled: boolean, switching: boolean) => void,
  ) {
    this.emitter.addEventListener('vrStateChange', () => {
      callback(this.vrEnabled, this.vrSwitching);
    });
  }

  private configureTexture(textureConfig: TextureConfig) {
    const { scene } = this;
    const { name, originalName, type } = textureConfig;
    const texture = scene.getTextureByName(originalName);
    if (!texture) {
      return;
    }

    switch (type) {
      case 'skybox':
        this.skyboxMaterial.reflectionTexture = texture;
        this.skyboxMaterial.reflectionTexture.coordinatesMode =
          Texture.SKYBOX_MODE;
        if (this.skyboxMaterial.reflectionTexture instanceof CubeTexture) {
          this.skyboxMaterial.reflectionTexture.rotationY = Math.PI * -0.5;
        }
        break;
      case 'reflection':
        scene.materials.forEach((material) => {
          if (
            material.name === 'skybox' ||
            !(material instanceof PBRMaterial)
          ) {
            return;
          }
          /* eslint-disable no-param-reassign */
          material.reflectionTexture = texture;
          material.reflectivityColor = Color3.White();
          if (texture instanceof CubeTexture) {
            texture.rotationY = Math.PI * 1.1;
          }
          material.environmentIntensity = 0.4;
          /* eslint-enable no-param-reassign */
        });
        break;
      // no default
    }

    // Override texture name.
    texture.name = name;
  }

  private createLight(lightConfig: LightConfig) {
    const { scene } = this;
    let light: PointLight | DirectionalLight;
    const {
      name,
      variant,
      position,
      intensity,
      diffuseColorHex,
      radius,
      includedMeshNames,
    } = lightConfig;
    switch (variant) {
      case 'DirectionalLight':
        light = new DirectionalLight(
          name,
          new Vector3(position.x, position.y, position.z),
          scene,
        );
        break;
      case 'PointLight':
      default:
        light = new PointLight(
          name,
          new Vector3(position.x, position.y, position.z),
          scene,
        );
    }
    light.intensity = intensity;
    light.diffuse = Color3.FromHexString(diffuseColorHex);
    light.radius = radius;
    light.shadowEnabled = false;
    if (includedMeshNames) {
      const includedMeshes = scene.meshes.filter((mesh) =>
        includedMeshNames.includes(mesh.name),
      );
      if (includedMeshes.length > 0) {
        light.includedOnlyMeshes = includedMeshes;
      }
    }
  }

  // Toggle lights based on the current frame.
  private toggleLights(period?: 'former' | 'latter') {
    const { frame, scene } = this;
    if (
      period === 'former' ||
      (frame <= lightChangeFrame && this.lightPeriod === 'latter')
    ) {
      lightConfigs.forEach((lightConfig) => {
        const { name, effectivePeriod } = lightConfig;
        const light = scene.getLightByName(name);
        if (light) {
          light.setEnabled(effectivePeriod === 'former');
        }
      });
      this.lightPeriod = 'former';
    } else if (
      period === 'latter' ||
      (frame > lightChangeFrame && this.lightPeriod === 'former')
    ) {
      lightConfigs.forEach((lightConfig) => {
        const { name, effectivePeriod } = lightConfig;
        const light = scene.getLightByName(name);
        if (light) {
          light.setEnabled(effectivePeriod === 'latter');
        }
      });
      this.lightPeriod = 'latter';
    }
  }

  private updateCamera() {
    const targetPosition = new Vector3(0, 0, 0);
    const targetRotation = new Vector3(0, Math.PI, 0);

    // Move camera position based on the distance between camera and target.
    let targetDistance = 2.0;
    const cameraParent = this.camera.parent;
    const cameraTarget = this.scene.getNodeByName('camera_target');
    if (
      cameraParent instanceof TransformNode &&
      cameraTarget instanceof TransformNode
    ) {
      targetDistance = Vector3.Distance(
        cameraParent.position,
        cameraTarget.position,
      );
    }

    // Adjust position and rotation based on user input.
    targetPosition.x -= this.inputX * targetDistance * 0.45;
    targetPosition.y += this.inputY * targetDistance * 0.225;
    targetRotation.x += this.inputY * (Math.PI * 0.075);
    targetRotation.y -= this.inputX * (Math.PI * 0.15);

    // Update camera state with tween animation.
    const deltaTime = this.scene.getEngine().getDeltaTime();
    let positionLerpAmount = deltaTime / 250;
    let rotationLerpAmount = deltaTime / 200;
    if (positionLerpAmount > 1) {
      positionLerpAmount = 1;
    }
    if (rotationLerpAmount > 1) {
      rotationLerpAmount = 1;
    }
    this.camera.position = Vector3.Lerp(
      this.camera.position,
      targetPosition,
      positionLerpAmount,
    );
    this.camera.rotation = Vector3.Lerp(
      this.camera.rotation,
      targetRotation,
      rotationLerpAmount,
    );
    this.updateFov();
  }

  private updateFov() {
    const canvas = this.scene.getEngine().getRenderingCanvas();
    if (canvas) {
      const aspectRatio = canvas.width / canvas.height;
      const minAspectRatio = 9 / 16;
      const maxAspectRatio = 16 / 9;
      if (aspectRatio < minAspectRatio) {
        this.camera.fov = this.maxFov;
      } else if (aspectRatio > maxAspectRatio) {
        this.camera.fov = this.minFov;
      } else {
        const fovExtensionRatio =
          (maxAspectRatio - aspectRatio) / (maxAspectRatio - minAspectRatio);
        this.camera.fov =
          this.minFov + (this.maxFov - this.minFov) * fovExtensionRatio;
      }
    }
  }

  private async initializeVr() {
    const { scene } = this;
    // const ground = MeshBuilder.CreatePlane('ground', { size: 20 });
    // ground.visibility = 0;
    // ground.rotation.x = Math.PI / 2;
    // const defaultXRExperience = await scene.createDefaultXRExperienceAsync({
    //   floorMeshes: [ground],
    // });
    const button = new WebXREnterExitUIButton(
      document.getElementById('vrButton') as HTMLElement,
      'immersive-vr',
      'local',
    );
    const defaultXRExperience = await WebXRDefaultExperience.CreateAsync(
      scene,
      {
        // disableDefaultUI: true,
        uiOptions: {
          customButtons: [button],
        },
        disableTeleportation: true,
      },
    );

    // If VR is not supported, redirect to the normal mode.
    const vrSupported = await checkVrSupport();
    if (!vrSupported) {
      // eslint-disable-next-line no-alert
      alert(
        i18n.t('デバイスがVRに対応していないようです。通常モードに戻ります。'),
      );
      const url = new URL(window.location.href);
      url.searchParams.delete('vr');
      window.location.href = url.toString();
      return;
    }

    const xrSessionManager = defaultXRExperience.baseExperience.sessionManager;
    const xrCamera = new WebXRCamera('xr_camera', scene, xrSessionManager);
    const moveXrCamera = () => {
      xrCamera.setTransformationFromNonVRCamera(this.camera);
      xrCamera.rotation = this.camera.absoluteRotation.toEulerAngles();
      xrCamera.position.y = this.camera.globalPosition.y * 0.9 + 0.5;
    };
    const syncFrame = () => {
      const currentFrame = scene.animationGroups[0].getCurrentFrame();
      this.applyFrame(currentFrame, true);
      this.audioManager.applyFrame(currentFrame);
    };

    defaultXRExperience.baseExperience.onStateChangedObservable.add((state) => {
      switch (state) {
        case WebXRState.ENTERING_XR:
          if (!this.vrEnabled || !this.vrSwitching) {
            this.vrEnabled = true;
            this.vrSwitching = true;
            this.emitter.dispatchEvent(new CustomEvent('vrStateChange'));
          }
          break;
        case WebXRState.IN_XR:
          if (!this.vrEnabled || this.vrSwitching) {
            this.vrEnabled = true;
            this.vrSwitching = false;
            this.emitter.dispatchEvent(new CustomEvent('vrStateChange'));
            this.effects?.disableLensEffects();
            scene.animationGroups.forEach((animationGroup) => {
              // eslint-disable-next-line no-param-reassign
              animationGroup.speedRatio = vrSpeedRatio;
              animationGroup.play(true);
            });
            scene.registerBeforeRender(moveXrCamera);
            scene.registerBeforeRender(syncFrame);
            this.audioManager.unmute();
            this.audioManager.startBackgroundMusic(); // Start background music if it'S not started yet.
          }
          break;
        case WebXRState.EXITING_XR:
          if (this.vrEnabled || !this.vrSwitching) {
            this.vrEnabled = false;
            this.vrSwitching = true;
            this.emitter.dispatchEvent(new CustomEvent('vrStateChange'));
            this.effects?.enableLensEffects();
            scene.animationGroups.forEach((animationGroup) => {
              animationGroup.pause();
              animationGroup.goToFrame(this.frame);
            });
            scene.unregisterBeforeRender(moveXrCamera);
            scene.unregisterBeforeRender(syncFrame);
            this.audioManager.mute();
          }
          break;
        case WebXRState.NOT_IN_XR:
          if (this.vrEnabled || this.vrSwitching) {
            this.vrEnabled = false;
            this.vrSwitching = false;
            this.emitter.dispatchEvent(new CustomEvent('vrStateChange'));
          }
          break;
        // no default
      }
    });
  }
}
