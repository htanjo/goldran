import { MouseEvent, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
      onPlay();
    },
    [onPlay],
  );

  const handleClickPause = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      onPause();
    },
    [onPause],
  );

  const handleClickReplay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      onReplay();
    },
    [onReplay],
  );

  const handleClickFullscreen = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      onToggleFullscreen(!fullscreen);
    },
    [onToggleFullscreen, fullscreen],
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

  return (
    <div className={classes.hud}>
      {playButton}
      {!isIos && ( // Hide fullscreen button from iOS as it conflicts scroll gestures.
        <button
          type="button"
          className={classes.button}
          data-tooltip-id="hudTooltip"
          data-tooltip-content={
            fullscreen ? t('全画面表示を終了') : t('全画面表示')
          }
          data-tooltip-place="left"
          onClick={handleClickFullscreen}
        >
          <Icon
            name={fullscreen ? 'fullscreen_exit' : 'fullscreen'}
            aria-label={fullscreen ? t('全画面表示を終了') : t('全画面表示')}
            className={classes.icon}
          />
        </button>
      )}
      {hasPointingDevice && (
        <Tooltip id="hudTooltip" className={classes.tooltip} />
      )}
    </div>
  );
}

export default Hud;
