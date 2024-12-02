import { useTranslation } from 'react-i18next';
import classes from './VrMenu.module.scss';

interface VrMenuProps {
  vrEnabled: boolean;
}

function VrMenu({ vrEnabled }: VrMenuProps) {
  const { t } = useTranslation();
  return (
    // For some reasons, wrapper element is necessary but it won't be a parent of the button.
    <div className={classes.vrMenu}>
      <button id="vrButton" type="button" className={classes.vrButton}>
        {vrEnabled ? t('VRを終了') : t('VRを開始')}
      </button>
    </div>
  );
}

export default VrMenu;
