import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Scene } from '@babylonjs/core/scene';
import SceneComponent, { useScene } from 'babylonjs-hook';
import Controller from './Controller';
import StartScreen from '../ui/StartScreen';
import LoadingScreen from '../ui/LoadingScreen';
import Hud from '../ui/Hud';
import Scrollbar from '../ui/Scrollbar';
import {
  maxFrame as maxFrameSetting,
  moveSpeed as moveSpeedSetting,
} from '../settings/frames';
import classes from './Screen.module.scss';

const Debugger = lazy(() => import('../ui/Debugger'));

function Screen() {
  const sceneInstance = useScene();
  const [loadingScreenEnabled, setLoadingScreenEnabled] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startScreenEnabled, setStartScreenEnabled] = useState(false);
  const [startScreenProgress, setStartScreenProgress] = useState(0);
  const [startScreenScroll, setStartScreenScroll] = useState(0);
  const [endScreenEnabled, setEndScreenEnabled] = useState(false);
  const [frameValue, setFrameValue] = useState(0);
  const [maxFrameValue, setMaxFrameValue] = useState(maxFrameSetting);
  const [moveSpeedValue, setMoveSpeedValue] = useState(moveSpeedSetting);
  const [autoPlaying, setAutoPlaying] = useState(false);
  // const [contentFinished, setContentFinished] = useState(false);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const [debugMode] = useState(
    new URLSearchParams(window.location.search).get('debug') === 'true', // Enable debug mode if URL has "?debug=true".
  );
  const controllerRef = useRef<Controller | null>(null);
  const virtualContentLength = maxFrameValue / moveSpeedValue;
  const virtualViewportLength =
    sceneInstance?.getEngine().getRenderingCanvas()?.height ||
    window.innerHeight;
  const virtualScrollLength =
    (virtualContentLength - virtualViewportLength) *
    (frameValue / maxFrameValue);
  const hudEnabled = !loadingScreenEnabled;
  const scrollbarEnabled = !loadingScreenEnabled;

  const onSceneReady = useCallback(async (scene: Scene) => {
    const engine = scene.getEngine();
    engine.enableOfflineSupport = false;
    const controller = new Controller(scene);
    controller.onLoadingScreenToggle((enabled) =>
      setLoadingScreenEnabled(enabled),
    );
    controller.onLoadingProgress((progress) => setLoadingProgress(progress));
    controller.onStartScreenToggle((enabled) => setStartScreenEnabled(enabled));
    controller.onStartScreenProgress((progress, scroll) => {
      setStartScreenProgress(progress);
      setStartScreenScroll(scroll);
    });
    controller.onEndScreenToggle((enabled) => setEndScreenEnabled(enabled));
    controller.onFrameProgress((frame, maxFrame, moveSpeed) => {
      setFrameValue(frame);
      setMaxFrameValue(maxFrame);
      setMoveSpeedValue(moveSpeed);
    });
    controller.onAutoplayToggle((enabled) => {
      setAutoPlaying(enabled);
    });
    // Control HUD based on onEndScreenToggle to show the replay button for a certain period.
    // controller.onContentFinish((finished) => {
    //   setContentFinished(finished);
    // });
    controllerRef.current = controller;
  }, []);

  const play = useCallback(() => {
    controllerRef.current?.enableAutoplay();
  }, []);

  const pause = useCallback(() => {
    controllerRef.current?.disableAutoplay();
  }, []);

  const replay = useCallback(() => {
    controllerRef.current?.restartAutoplay();
  }, []);

  const toggleFullscreen = useCallback((fullScreenEnable: boolean) => {
    if (fullScreenEnable) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const changeFullscreenState = useCallback(() => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  }, []);

  // F11 doesn't trigger "fullscreenchange" event when entering fullscreen.
  // As a workaround, override entering fullscreen with JavaScript API.
  // Reference: https://stackoverflow.com/a/21118401
  const enterFullscreenWithKeyboard = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.key === 'F11' && !document.fullscreenElement) {
        event.preventDefault();
        document.documentElement.requestFullscreen();
      }
    },
    [],
  );

  useEffect(() => {
    document.addEventListener('fullscreenchange', changeFullscreenState);
    document.addEventListener('keydown', enterFullscreenWithKeyboard);
    return () => {
      document.removeEventListener('fullscreenchange', changeFullscreenState);
      document.removeEventListener('keydown', enterFullscreenWithKeyboard);
    };
  });

  return (
    <>
      <LoadingScreen
        enabled={loadingScreenEnabled}
        loadingProgress={loadingProgress}
      />
      <StartScreen
        enabled={startScreenEnabled}
        progress={startScreenProgress}
        scroll={startScreenScroll}
      />
      <SceneComponent
        // antialias
        // adaptToDeviceRatio
        engineOptions={{
          doNotHandleContextLost: true,
          // Stability optimization for iOS
          // Reference: https://forum.babylonjs.com/t/reducing-memory-consumption-in-babylonjs-apps/53242/3
          powerPreference: 'default',
        }}
        onSceneReady={onSceneReady}
        // onRender={onRender}
        className={classes.screen}
      >
        {debugMode && hudEnabled && (
          <Suspense fallback={null}>
            <Debugger controllerRef={controllerRef} />
          </Suspense>
        )}
      </SceneComponent>
      {hudEnabled && (
        <Hud
          autoPlaying={autoPlaying}
          contentFinished={endScreenEnabled}
          fullscreen={fullscreen}
          onPlay={play}
          onPause={pause}
          onReplay={replay}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
      {scrollbarEnabled && (
        <Scrollbar
          scrollLength={virtualScrollLength}
          contentLength={virtualContentLength}
          viewportLength={virtualViewportLength}
        />
      )}
    </>
  );
}

export default Screen;
