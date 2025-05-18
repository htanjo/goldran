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
import LoadingScreen from '../ui/LoadingScreen';
import StartScreen from '../ui/StartScreen';
import EndScreen from '../ui/EndScreen';
import Hud from '../ui/Hud';
import VrMenu from '../ui/VrMenu';
import ScrollWarning from '../ui/ScrollWarning';
import Scrollbar from '../ui/Scrollbar';
import {
  maxFrame as maxFrameSetting,
  moveSpeed as moveSpeedSetting,
} from '../settings/frames';
import { vrMode } from '../settings/general';
import Caption from '../ui/Caption';
import { captions } from '../settings/captions';
import classes from './Screen.module.scss';
import EntranceScreen from '../ui/EntranceScreen';

const Debugger = lazy(() => import('../ui/Debugger'));

interface CaptionState {
  id: string;
  enabled: boolean;
  progress: number;
  scroll: number;
}

const initialCaptionStates: CaptionState[] = captions.map((caption) => ({
  id: caption.id,
  enabled: false,
  progress: 0,
  scroll: 0,
}));
let lastTimeout: NodeJS.Timeout;

function Screen() {
  const sceneInstance = useScene();
  const skipEntranceScreen = vrMode;
  const [entranceScreenEnabled, setEntranceScreenEnabled] =
    useState(!skipEntranceScreen);
  const [loadingScreenEnabled, setLoadingScreenEnabled] =
    useState(skipEntranceScreen);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startScreenEnabled, setStartScreenEnabled] = useState(false);
  const [startScreenProgress, setStartScreenProgress] = useState(0);
  const [startScreenScroll, setStartScreenScroll] = useState(0);
  const [endScreenEnabled, setEndScreenEnabled] = useState(false);
  const [endScreenProgress, setEndScreenProgress] = useState(0);
  const [endScreenScroll, setEndScreenScroll] = useState(0);
  const [hudEnabled, setHudEnabled] = useState(false);
  const [scrollbarEnabled, setScrollbarEnabled] = useState(false);
  const [captionStates, setCaptionStates] =
    useState<CaptionState[]>(initialCaptionStates);
  const [frameValue, setFrameValue] = useState(0);
  const [maxFrameValue, setMaxFrameValue] = useState(maxFrameSetting);
  const [moveSpeedValue, setMoveSpeedValue] = useState(moveSpeedSetting);
  const [autoPlaying, setAutoPlaying] = useState(false);
  // const [contentFinished, setContentFinished] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [vrEnabled, setVrEnabled] = useState(false);
  const [vrSwitching, setVrSwitching] = useState(false);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const [scrollWarningEnabled, setScrollWarningEnabled] = useState(false);
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

  const onSceneReady = useCallback(async (scene: Scene) => {
    const engine = scene.getEngine();
    engine.enableOfflineSupport = false;
    const controller = new Controller(scene);
    controller.onEntranceScreenToggle((enabled) =>
      setEntranceScreenEnabled(enabled),
    );
    controller.onLoadingScreenToggle((enabled) =>
      setLoadingScreenEnabled(enabled),
    );
    controller.onLoadingProgress((progress) => setLoadingProgress(progress));
    controller.onStartScreenToggle((enabled) => {
      setStartScreenEnabled(enabled);
      if (!vrMode && enabled) {
        setHudEnabled(true);
        setScrollbarEnabled(true);
      }
    });
    controller.onStartScreenProgress((progress, scroll) => {
      setStartScreenProgress(progress);
      setStartScreenScroll(scroll);
    });
    controller.onEndScreenToggle((enabled) => setEndScreenEnabled(enabled));
    controller.onEndScreenProgress((progress, scroll) => {
      setEndScreenProgress(progress);
      setEndScreenScroll(scroll);
    });
    controller.onCaptionIdChange((id) => {
      setCaptionStates((previousCaptionStates) =>
        previousCaptionStates.map((captionState) => ({
          ...captionState,
          enabled: captionState.id === id,
        })),
      );
    });
    controller.onCaptionProgress((progress, scroll) => {
      setCaptionStates((previousCaptionStates) =>
        previousCaptionStates.map((captionState) => ({
          ...captionState,
          progress: captionState.enabled ? progress : captionState.progress,
          scroll: captionState.enabled ? scroll : captionState.scroll,
        })),
      );
    });
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
    controller.onAudioToggle((enabled) => {
      setAudioEnabled(enabled);
    });
    controller.onVrStateChange((enabled, switching) => {
      setVrEnabled(enabled);
      setVrSwitching(switching);
    });
    controller.onHorizontalScroll(() => {
      setScrollWarningEnabled(true);
      const timeout = setTimeout(() => {
        if (timeout === lastTimeout) {
          setScrollWarningEnabled(false);
        }
      }, 1000);
      lastTimeout = timeout;
    });
    controller.initializeScreen();
    controllerRef.current = controller;
  }, []);

  const enter = useCallback(() => {
    controllerRef.current?.loadAssets();
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

  const rewind = useCallback(() => {
    controllerRef.current?.enableRewind();
  }, []);

  const togglePointerInput = useCallback((enabled: boolean) => {
    controllerRef.current?.togglePointerInput(enabled);
  }, []);

  const toggleAudio = useCallback((enabled: boolean) => {
    controllerRef.current?.toggleAudio(enabled);
  }, []);

  const switchToVrMode = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('vr', 'true');
    window.location.href = url.toString();
  }, []);

  const switchToNormalMode = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('vr');
    window.location.href = url.toString();
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
      <EntranceScreen enabled={entranceScreenEnabled} onEnter={enter} />
      <LoadingScreen
        enabled={loadingScreenEnabled}
        loadingProgress={loadingProgress}
      />
      <StartScreen
        enabled={startScreenEnabled}
        progress={startScreenProgress}
        scroll={startScreenScroll}
      />
      <EndScreen
        enabled={endScreenEnabled}
        progress={endScreenProgress}
        scroll={endScreenScroll}
        onRewind={rewind}
      />
      {captionStates.map((captionState) => (
        <Caption
          key={captionState.id}
          id={captionState.id}
          enabled={captionState.enabled}
          progress={captionState.progress}
          scroll={captionState.scroll}
        />
      ))}
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
          audioEnabled={audioEnabled}
          fullscreen={fullscreen}
          onPlay={play}
          onPause={pause}
          onReplay={replay}
          onTogglePointerInput={togglePointerInput}
          onToggleAudio={toggleAudio}
          onSwitchToVrMode={switchToVrMode}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
      {vrMode && (
        <VrMenu
          vrEnabled={vrEnabled}
          vrSwitching={vrSwitching}
          onSwitchToNormalMode={switchToNormalMode}
        />
      )}
      <ScrollWarning enabled={scrollWarningEnabled} />
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
