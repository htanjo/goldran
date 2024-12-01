import { MouseEvent, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { Tooltip } from 'react-tooltip';
import Icon from './Icon';
import { hasPointingDevice, isIos } from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  autoPlaying: boolean;
  contentFinished: boolean;
  fullscreen: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  onToggleFullscreen: (fullscreenEnable: boolean) => void;
}

function Hud({
  autoPlaying,
  contentFinished,
  fullscreen,
  onPlay,
  onPause,
  onReplay,
  onToggleFullscreen,
}: HudProps) {
  const { t } = useTranslation();
  const handleClickPlay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      ReactGA.event({ category: 'click', action: 'click_play' });
      onPlay();
    },
    [onPlay],
  );

  const handleClickPause = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      ReactGA.event({ category: 'click', action: 'click_pause' });
      onPause();
    },
    [onPause],
  );

  const handleClickReplay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      ReactGA.event({ category: 'click', action: 'click_replay' });
      onReplay();
    },
    [onReplay],
  );

  const handleClickFullscreen = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      ReactGA.event({ category: 'click', action: 'click_fullscreen' });
      onToggleFullscreen(true);
    },
    [onToggleFullscreen],
  );

  const handleClickFullscreenExit = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      ReactGA.event({ category: 'click', action: 'click_fullscreen_exit' });
      onToggleFullscreen(false);
    },
    [onToggleFullscreen],
  );

  let playButton: ReactNode;
  if (contentFinished) {
    playButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content={t('最初から再生')}
        data-tooltip-place="right"
        onClick={handleClickReplay}
      >
        <Icon
          name="replay"
          aria-label={t('最初から再生')}
          className={classes.icon}
        />
      </button>
    );
  } else if (autoPlaying) {
    playButton = (
      <button
        type="button"
        className={classes.button}
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
        className={classes.button}
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

  let fullscreenButton: ReactNode;
  if (isIos) {
    // Hide fullscreen button from iOS as it conflicts scroll gestures.
    fullscreenButton = null;
  } else if (fullscreen) {
    fullscreenButton = (
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content="全画面表示を終了"
        data-tooltip-place="left"
        onClick={handleClickFullscreenExit}
      >
        <Icon
          name="fullscreen_exit"
          aria-label="全画面表示を終了"
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
        data-tooltip-content="全画面表示"
        data-tooltip-place="left"
        onClick={handleClickFullscreen}
      >
        <Icon
          name="fullscreen"
          aria-label="全画面表示"
          className={classes.icon}
        />
      </button>
    );
  }

  return (
    <div className={classes.hud}>
      {playButton}
      {fullscreenButton}
      {hasPointingDevice && (
        <Tooltip id="hudTooltip" className={classes.tooltip} />
      )}
    </div>
  );
}

export default Hud;
