import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import classes from './EntranceScreen.module.scss';

interface EntranceScreenProps {
  enabled: boolean;
  onEnter: () => void;
}

function EntranceScreen({ enabled, onEnter }: EntranceScreenProps) {
  const { t } = useTranslation();

  if (!enabled) {
    return null;
  }

  return (
    <div className={classes.entranceScreen}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>
            <Logo colored={false} />
          </h1>
          <div className={classes.entrance}>
            <button
              type="button"
              className={classes.enterButton}
              onClick={onEnter}
            >
              <span className={classes.enterButtonText}>
                {t('勇者を呼び出す')}
              </span>
            </button>
            <div className={classes.subText}>
              {t('このページでは10MB以上の通信と、サウンドの再生を行います。')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntranceScreen;
