import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, config, useSpring } from '@react-spring/web';
import Logo from './Logo';
import ProgressBar from './ProgressBar';
import classes from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  enabled: boolean;
  loadingProgress: number;
}

function LoadingScreen({ enabled, loadingProgress }: LoadingScreenProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(enabled);

  const screenStyle = useSpring({
    opacity: enabled ? 1 : 0,
    config: enabled ? { duration: 0 } : config.molasses,
    delay: enabled ? 0 : 600,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setMounted(false);
      }
    },
  });

  // Loading UI disappears faster.
  const loadingStyle = useSpring({
    opacity: enabled ? 1 : 0,
    config: enabled ? { duration: 0 } : config.default,
    delay: enabled ? 0 : 400,
  });

  useEffect(() => {
    if (enabled) {
      setMounted(true);
    }
  }, [enabled]);

  if (!mounted) {
    return null;
  }

  return (
    <animated.div className={classes.loadingScreen} style={screenStyle}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>
            <Logo colored={false} />
          </h1>
          <animated.div className={classes.loading} style={loadingStyle}>
            <div className={classes.loadingBar}>
              <ProgressBar progress={loadingProgress} />
            </div>
            <div className={classes.loadingText}>{t('ロード中...')}</div>
          </animated.div>
        </div>
      </div>
      <div className={classes.backdrop} />
    </animated.div>
  );
}

export default LoadingScreen;
