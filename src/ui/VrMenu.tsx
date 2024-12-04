import { useTranslation } from 'react-i18next';
import classes from './VrMenu.module.scss';

interface VrMenuProps {
  vrEnabled: boolean;
  vrSwitching: boolean;
}

function VrMenu({ vrEnabled, vrSwitching }: VrMenuProps) {
  const { t } = useTranslation();
  const buttonText = vrEnabled && !vrSwitching ? t('VRを終了') : t('VRを開始');
  const buttonDisabled = vrSwitching;
  return (
    // For some reasons, wrapper element is necessary but it won't be a parent of the button.
    <div className={classes.vrMenu}>
      <button
        id="vrButton"
        type="button"
        className={classes.vrButton}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default VrMenu;
