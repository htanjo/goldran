import { MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { Tooltip } from 'react-tooltip';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { BsBadgeVr } from 'react-icons/bs';
import { IoIosPlayCircle } from 'react-icons/io';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import { MdPause, MdTranslate } from 'react-icons/md';
import {
  checkVrSupport,
  hasPointingDevice,
  isDesktop,
} from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  autoPlaying: boolean;
  contentFinished: boolean;
  audioEnabled: boolean;
  fullscreen: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  onTogglePointerInput: (enabled: boolean) => void;
  onToggleAudio: (enabled: boolean) => void;
  onSwitchToVrMode: () => void;
  onToggleFullscreen: (enabled: boolean) => void;
}

function Hud({
  autoPlaying,
  contentFinished,
  audioEnabled,
  fullscreen,
  onPlay,
  onPause,
  onReplay,
  onTogglePointerInput,
  onToggleAudio,
  onSwitchToVrMode,
  onToggleFullscreen,
}: HudProps) {
  const { i18n, t } = useTranslation();
  const [vrSupported, setVrSupported] = useState(true); // Default "false" is natural, but set "true" to avoid tooltip bug.
  const playButtonDisabled = contentFinished;

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

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-ignore
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
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const handleClickAudio = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_audio' });
      }
      onToggleAudio(!audioEnabled);
    },
    [audioEnabled, onToggleAudio],
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
      /* eslint-disable no-alert */
      if (
        window.confirm(
          t(
            'VRモードに切り替えますか？レンズ付きの専用ゴーグルやヘッドセットが必要です。',
          ),
        )
      ) {
        onSwitchToVrMode();
      }
      /* eslint-enable no-alert */
    },
    [onSwitchToVrMode, t],
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
  if (autoPlaying) {
    playButton = (
      <button
        type="button"
        className={`${classes.button} ${classes.large}`}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('一時停止')}
        data-tooltip-place="right"
        onClick={handleClickPause}
        onMouseEnter={() => onTogglePointerInput(false)}
        onMouseLeave={() => onTogglePointerInput(true)}
      >
        <MdPause aria-label={t('一時停止')} className={classes.icon} />
      </button>
    );
  } else {
    playButton = (
      <button
        type="button"
        className={`${classes.button} ${classes.large}`}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={playButtonDisabled ? '' : t('自動再生')}
        data-tooltip-place="right"
        onClick={handleClickPlay}
        onMouseEnter={() => onTogglePointerInput(false)}
        onMouseLeave={() => onTogglePointerInput(true)}
        disabled={playButtonDisabled}
      >
        <IoIosPlayCircle aria-label={t('自動再生')} className={classes.icon} />
      </button>
    );
  }

  let audioButton: ReactNode;
  if (audioEnabled) {
    audioButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('ミュート')}
        data-tooltip-place="left"
        onClick={handleClickAudio}
      >
        <IoVolumeHigh aria-label={t('ミュート')} className={classes.icon} />
      </button>
    );
  } else {
    audioButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('ミュート解除')}
        data-tooltip-place="left"
        onClick={handleClickAudio}
      >
        <IoVolumeMute aria-label={t('ミュート解除')} className={classes.icon} />
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
      <MdTranslate
        aria-label={t('Switch to English')}
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
        <BsBadgeVr
          aria-label={t('VRモードに切り替える')}
          className={`${classes.icon}`}
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
        <BiExitFullscreen
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
        <BiFullscreen aria-label={t('全画面表示')} className={classes.icon} />
      </button>
    );
  }

  return (
    <div className={classes.hud}>
      {playButton}
      <div className={classes.spacer} />
      {audioButton}
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
