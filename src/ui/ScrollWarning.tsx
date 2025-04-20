import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, config, useSpring } from '@react-spring/web';
import { CgScrollV } from 'react-icons/cg';
import classes from './ScrollWarning.module.scss';

interface ScrollWarningProps {
  enabled: boolean;
}

function ScrollWarning({ enabled }: ScrollWarningProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(enabled);

  const screenStyle = useSpring({
    opacity: enabled ? 1 : 0,
    config: config.default,
    delay: 0,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setMounted(false);
      }
    },
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
    <animated.div className={classes.scrollWarning} style={screenStyle}>
      <div className={classes.content}>
        <CgScrollV className={classes.icon} /> {t('縦にスクロールしてください')}{' '}
        <CgScrollV className={classes.icon} />
      </div>
    </animated.div>
  );
}

export default ScrollWarning;
