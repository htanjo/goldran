import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import classes from './VrMenu.module.scss';

interface VrMenuProps {
  vrEnabled: boolean;
  vrSwitching: boolean;
  onSwitchToNormalMode: () => void;
}

function VrMenu({ vrEnabled, vrSwitching, onSwitchToNormalMode }: VrMenuProps) {
  const { t } = useTranslation();
  const buttonText = vrEnabled && !vrSwitching ? t('VRを終了') : t('VRを開始');
  const buttonDisabled = vrSwitching;

  const handleClickNormalMode = useCallback(() => {
    ReactGA.event({ category: 'click', action: 'click_vr_exit' });
    onSwitchToNormalMode();
  }, [onSwitchToNormalMode]);

  return (
    <div className={classes.vrMenu}>
      {/* For some reasons, wrapper element is necessary but it won't be a parent of the button. */}
      <button
        id="vrButton"
        type="button"
        className={classes.vrButton}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
      <div className={classes.returnMenu}>
        <button
          type="button"
          className={classes.returnButton}
          onClick={handleClickNormalMode}
        >
          {t('通常モードに戻る')}
        </button>
      </div>
    </div>
  );
}

export default VrMenu;
