import { MutableRefObject, useCallback, useState } from 'react';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { useAfterRender, useScene } from 'babylonjs-hook';
import clsx from 'clsx';
import Icon from './Icon';
import Controller from '../core/Controller';
import classes from './Debugger.module.scss';

interface DebuggerProps {
  controllerRef: MutableRefObject<Controller | null>;
}

function Debugger({ controllerRef }: DebuggerProps) {
  const scene = useScene();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [fps, setFps] = useState('');
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [freeCameraEnabled, setFreeCameraEnabled] = useState(false);
  const [, setRenderRequestStub] = useState(false);

  // Update state to force re-rendering.
  const updateControllerData = useCallback(
    () => setRenderRequestStub((stub) => !stub),
    [],
  );

  const toggleDebugger = useCallback(() => {
    setDebuggerEnabled((currentDebuggerEnabled) => !currentDebuggerEnabled);
  }, []);

  useAfterRender((currentScene: Scene) => {
    setFps(currentScene.getEngine().getFps().toFixed());
    if (controllerRef.current && debuggerEnabled) {
      updateControllerData();
    }
  });

  // If controller is not ready, hide debugger.
  if (!controllerRef.current) {
    return null;
  }

  // If debugger is not active, render minimum data.
  if (!debuggerEnabled) {
    return (
      <div className={classes.debugger}>
        <button
          type="button"
          className={classes.button}
          onClick={toggleDebugger}
        >
          <Icon name="toggle_off" className={classes.icon} />
          <span className={classes.label}>Debugger</span>
        </button>
        <div className={classes.stats}>
          <div className={classes.section}>FPS: {fps}</div>
        </div>
      </div>
    );
  }

  // Otherwise, if debugger is active, enable detailed features below.
  const { frame } = controllerRef.current;

  const toggleInspector = async () => {
    await import('@babylonjs/inspector');
    if (scene?.debugLayer) {
      setInspectorEnabled((currentInspectorEnabled) => {
        if (!currentInspectorEnabled) {
          scene.debugLayer.show({ embedMode: true, overlay: true });
          return true;
        }
        scene.debugLayer.hide();
        return false;
      });
    }
  };

  const toggleCamera = () => {
    setFreeCameraEnabled((currentFreeCameraEnabled) => {
      // If scene is not ready, do nothing.
      if (!scene) {
        return currentFreeCameraEnabled;
      }
      const routeCamera = scene.getCameraByName('Camera') as FreeCamera;
      let freeCamera = scene.getCameraByName('free_camera') as FreeCamera;
      // Initialize FreeCamera for the first time.
      if (!freeCamera) {
        freeCamera = new FreeCamera('free_camera', Vector3.Zero(), scene);
        freeCamera.rotation.y = 180 * (Math.PI / 180);
        freeCamera.minZ = 0.01;
        freeCamera.maxZ = 2000;
        freeCamera.speed = 0.1;
        freeCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        freeCamera.keysUp.push(87); // W
        freeCamera.keysDown.push(83); // S
        freeCamera.keysLeft.push(65); // A
        freeCamera.keysRight.push(68); // D
      }
      // Toggle active camera.
      if (currentFreeCameraEnabled) {
        scene.activeCamera = routeCamera;
      } else {
        freeCamera.position = routeCamera.position.clone();
        freeCamera.rotation = routeCamera.rotation.clone();
        freeCamera.fov = routeCamera.fov;
        scene.activeCamera = freeCamera;
      }
      return !currentFreeCameraEnabled;
    });
  };

  return (
    <div className={classes.debugger}>
      <button
        type="button"
        className={`${classes.button} ${classes.active}`}
        onClick={toggleDebugger}
      >
        <Icon name="toggle_on" className={classes.icon} />
        <span className={classes.label}>Debugger</span>
      </button>
      <button
        type="button"
        className={clsx(classes.button, inspectorEnabled && classes.active)}
        onClick={toggleInspector}
      >
        <Icon
          name="frame_inspect"
          className={classes.icon}
          aria-label="Toggle Inspector"
        />
      </button>
      <button
        type="button"
        className={clsx(classes.button, freeCameraEnabled && classes.active)}
        onClick={toggleCamera}
      >
        <Icon
          name="videocam"
          className={classes.icon}
          aria-label="Toggle Camera"
        />
      </button>
      <div className={classes.stats}>
        <div className={classes.section}>
          [Movement]
          <br />
          Frame: {frame.toFixed(2)}
          <br />
        </div>
        <div className={classes.section}>
          [Graphics]
          <br />
          Camera Mode: {freeCameraEnabled ? 'free' : 'default'}
          <br />
          FPS: {fps}
        </div>
      </div>
    </div>
  );
}

export default Debugger;