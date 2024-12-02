import { Camera } from '@babylonjs/core/Cameras/camera';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { ColorGradingTexture } from '@babylonjs/core/Materials/Textures/colorGradingTexture';
import { DefaultRenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline';
import { ImageProcessingConfiguration } from '@babylonjs/core/Materials/imageProcessingConfiguration';
import { Scene } from '@babylonjs/core/scene';
import colorGradingTextureUrl from '../assets/lut_64.3dl?url';

export default class Effects {
  private pipeline: DefaultRenderingPipeline;

  public constructor(scene: Scene, cameras: Camera[]) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const canvasWidth = canvas?.width || 1024;
    const canvasHeight = canvas?.height || 1024;
    const cameraFov = scene.activeCamera?.fov || 55;

    // Blur factor
    const verticalSize = canvasHeight / cameraFov;

    // Vignette factor
    const aspectRatio = canvasWidth / canvasHeight;
    let vignetteCameraFov: number;
    const minVignetteCameraFov = 0.55;
    const maxVignetteCameraFov = 0.75;
    const minAspectRatio = 9 / 16;
    const maxAspectRatio = 16 / 9;
    if (aspectRatio < minAspectRatio) {
      vignetteCameraFov = maxVignetteCameraFov;
    } else if (aspectRatio > maxAspectRatio) {
      vignetteCameraFov = minVignetteCameraFov;
    } else {
      const fovExtensionRatio =
        (maxAspectRatio - aspectRatio) / (maxAspectRatio - minAspectRatio);
      vignetteCameraFov =
        minVignetteCameraFov +
        (maxVignetteCameraFov - minVignetteCameraFov) * fovExtensionRatio;
    }

    // Add post processing effects.
    const pipeline = new DefaultRenderingPipeline(
      'effects',
      true,
      scene,
      cameras,
    );
    pipeline.samples = 4; // Enable MSAA.
    // pipeline.fxaaEnabled = true; // Enable FXAA.
    pipeline.sharpenEnabled = true;
    pipeline.sharpen.edgeAmount = 0.3;
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.08;
    pipeline.bloomWeight = 0.2;
    pipeline.bloomKernel = verticalSize * 0.25; // Effect size. Large value may cause flickering.
    pipeline.bloomScale = 0.5; // Large value reduces flickering, but hits performance.

    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 40;
    pipeline.chromaticAberration.radialIntensity = 1;

    // pipeline.grainEnabled = true;
    // pipeline.grain.animated = true;
    // pipeline.grain.intensity = 10;

    // pipeline.imageProcessing.contrast = 1.2;
    // pipeline.imageProcessing.exposure = 1.3;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 3.5;
    pipeline.imageProcessing.vignetteCameraFov = vignetteCameraFov;
    pipeline.imageProcessing.vignetteStretch = 0;
    pipeline.imageProcessing.vignetteColor = Color4.FromHexString('#0f2c3eff');
    pipeline.imageProcessing.colorGradingEnabled = true;
    const colorGradingTexture = new ColorGradingTexture(
      colorGradingTextureUrl,
      scene,
    );
    pipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
    pipeline.imageProcessing.colorGradingTexture.level = 0.7;
    pipeline.imageProcessing.toneMappingEnabled = true;
    pipeline.imageProcessing.toneMappingType =
      ImageProcessingConfiguration.TONEMAPPING_STANDARD;

    this.pipeline = pipeline;

    scene.onNewCameraAddedObservable.add((camera) => {
      this.pipeline.addCamera(camera);
    });

    // const lensEffect = new LensRenderingPipeline(
    //   'lensEffect',
    //   {
    //     chromatic_aberration: 0,
    //     edge_blur: 0.8,
    //     distortion: 0.5,
    //     dof_gain: 1,
    //     dof_aperture: 1,
    //     blur_noise: true,
    //     grain_amount: 1.0,
    //   },
    //   scene,
    //   1.0,
    //   cameras,
    // );

    // TODO: update effects when canvas resized.
  }

  public enableLensEffects() {
    this.pipeline.samples = 4;
    this.pipeline.sharpenEnabled = true;
    this.pipeline.bloomEnabled = true;
    this.pipeline.chromaticAberrationEnabled = true;
    this.pipeline.imageProcessing.vignetteEnabled = true;
    this.pipeline.imageProcessing.colorGradingEnabled = true;
  }

  public disableLensEffects() {
    this.pipeline.samples = 2;
    this.pipeline.sharpenEnabled = false;
    this.pipeline.bloomEnabled = false;
    this.pipeline.chromaticAberrationEnabled = false;
    this.pipeline.imageProcessing.vignetteEnabled = false;
    this.pipeline.imageProcessing.colorGradingEnabled = false;
  }
}
