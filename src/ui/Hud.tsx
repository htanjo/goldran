import { MouseEvent, useCallback } from 'react';
import { Tooltip } from 'react-tooltip';
import Icon from './Icon';
import { hasPointingDevice, isIos } from '../settings/general';
import classes from './Hud.module.scss';

interface HudProps {
  fullscreen: boolean;
  onPlay: () => void;
  onToggleFullscreen: (fullscreenEnable: boolean) => void;
}

function Hud({ fullscreen, onPlay, onToggleFullscreen }: HudProps) {
  const handleClickPlay = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      onPlay();
    },
    [onPlay],
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

  return (
    <div className={classes.hud}>
      <button
        type="button"
        className={classes.button}
        data-tooltip-id="hudTooltip"
        data-tooltip-content="自動再生"
        onClick={handleClickPlay}
      >
        <Icon
          name="play_circle"
          aria-label="自動再生"
          className={classes.icon}
        />
      </button>
      {!isIos && ( // Hide fullscreen button from iOS as it conflicts scroll gestures.
        <button
          type="button"
          className={classes.button}
          data-tooltip-id="hudTooltip"
          data-tooltip-content={fullscreen ? '全画面表示を終了' : '全画面表示'}
          onClick={handleClickFullscreen}
        >
          <Icon
            name={fullscreen ? 'fullscreen_exit' : 'fullscreen'}
            aria-label={fullscreen ? '全画面表示を終了' : '全画面表示'}
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
