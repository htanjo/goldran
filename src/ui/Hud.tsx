import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { Tooltip } from 'react-tooltip';
import Icon from './Icon';
import {
  checkVrSupport,
  hasPointingDevice,
  isDesktop,
} from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  autoPlaying: boolean;
  contentFinished: boolean;
  fullscreen: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  onSwitchToVrMode: () => void;
  onToggleFullscreen: (fullscreenEnable: boolean) => void;
}

function Hud({
  autoPlaying,
  contentFinished,
  fullscreen,
  onPlay,
  onPause,
  onReplay,
  onSwitchToVrMode,
  onToggleFullscreen,
}: HudProps) {
  const { i18n, t } = useTranslation();
  const [vrSupported, setVrSupported] = useState(true); // Default "false" is natural, but set "true" to avoid tooltip bug.

  const handleClickPlay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_play' });
      }
      onPlay();
    },
    [onPlay],
  );

  const handleClickPause = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_pause' });
      }
      onPause();
    },
    [onPause],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClickReplay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_replay' });
      }
      onReplay();
    },
    [onReplay],
  );

  const handleClickLanguage = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_language' });
      }
      i18n.changeLanguage(i18n.language === 'ja' ? 'en' : 'ja');
    },
    [i18n],
  );

  const handleClickVr = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_vr' });
      }
      onSwitchToVrMode();
    },
    [onSwitchToVrMode],
  );

  const handleClickFullscreen = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_fullscreen' });
      }
      onToggleFullscreen(true);
    },
    [onToggleFullscreen],
  );

  const handleClickFullscreenExit = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_fullscreen_exit' });
      }
      onToggleFullscreen(false);
    },
    [onToggleFullscreen],
  );

  useEffect(() => {
    (async () => {
      const supported = await checkVrSupport();
      setVrSupported(supported);
    })();
  }, []);

  let playButton: ReactNode;
  if (contentFinished) {
    playButton = null;
    // playButton = (
    //   <button
    //     type="button"
    //     className={`${classes.button} ${classes.large}`}
    //     data-tooltip-id="hudTooltip"
    //     data-tooltip-content={t('最初から再生')}
    //     data-tooltip-place="right"
    //     onClick={handleClickReplay}
    //   >
    //     <Icon
    //       name="replay"
    //       aria-label={t('最初から再生')}
    //       className={classes.icon}
    //     />
    //   </button>
    // );
  } else if (autoPlaying) {
    playButton = (
      <button
        type="button"
        className={`${classes.button} ${classes.large}`}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('一時停止')}
        data-tooltip-place="right"
        onClick={handleClickPause}
      >
        <Icon
          name="pause"
          aria-label={t('一時停止')}
          className={classes.icon}
        />
      </button>
    );
  } else {
    playButton = (
      <button
        type="button"
        className={`${classes.button} ${classes.large}`}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('自動再生')}
        data-tooltip-place="right"
        onClick={handleClickPlay}
      >
        <Icon
          name="play_circle"
          aria-label={t('自動再生')}
          className={classes.icon}
        />
      </button>
    );
  }

  const languageButton = (
    <button
      type="button"
      className={classes.button}
      data-tooltip-id="hudTooltip"
      data-tooltip-content={t('Switch to English')}
      data-tooltip-place="left"
      onClick={handleClickLanguage}
    >
      <Icon
        name="translate"
        aria-label={t('Switch ')}
        className={classes.icon}
      />
    </button>
  );

  let vrButton: ReactNode;
  if (vrSupported) {
    vrButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('VRモードに切り替える')}
        data-tooltip-place="left"
        onClick={handleClickVr}
      >
        <Icon
          name="head_mounted_device"
          aria-label={t('VRモードに切り替える')}
          className={`${classes.icon} ${classes.vrIcon}`}
        />
      </button>
    );
  } else {
    vrButton = null;
  }

  let fullscreenButton: ReactNode;
  if (!isDesktop) {
    // Hide fullscreen button from mobile devices.
    fullscreenButton = null;
  } else if (fullscreen) {
    fullscreenButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('全画面表示を終了')}
        data-tooltip-place="left"
        onClick={handleClickFullscreenExit}
      >
        <Icon
          name="fullscreen_exit"
          aria-label={t('全画面表示を終了')}
          className={classes.icon}
        />
      </button>
    );
  } else {
    fullscreenButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('全画面表示')}
        data-tooltip-place="left"
        onClick={handleClickFullscreen}
      >
        <Icon
          name="fullscreen"
          aria-label={t('全画面表示')}
          className={classes.icon}
        />
      </button>
    );
  }

  return (
    <div className={classes.hud}>
      {playButton}
      <div className={classes.spacer} />
      {languageButton}
      {vrButton}
      {fullscreenButton}
      {hasPointingDevice && (
        <Tooltip id="hudTooltip" className={classes.tooltip} />
      )}
    </div>
  );
}

export default Hud;
