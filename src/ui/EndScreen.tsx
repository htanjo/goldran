import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, config, easings, useSpring } from '@react-spring/web';
import Icon from './Icon';
import { hasTouchscreen, scrollMultiplier } from '../settings/general';
import classes from './EndScreen.module.scss';

interface EndScreenProps {
  enabled: boolean;
  progress: number; // 0 to 1 to complete the end screen.
  scroll: number; // Actual pixels user scrolled.
}

function EndScreen({ enabled, progress, scroll }: EndScreenProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(enabled);
  const navigationVisible = progress > 0.95;

  const viewportStyle = useSpring({
    opacity: progress,
    config: config.default,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setVisible(false);
      }
    },
  });

  const contentStyle = useSpring({
    transform: `translateY(${1000 / scrollMultiplier - scroll}px)`,
    config: {
      easing: easings.easeOutSine,
      duration: hasTouchscreen ? 100 : 200,
    },
  });

  const navigationStyle = useSpring({
    opacity: navigationVisible ? 1 : 0,
    transform: navigationVisible ? 'translateY(0)' : `translateY(1em)`,
    config: config.default,
    delay: 600,
  });

  useEffect(() => {
    if (enabled) {
      setVisible(true);
    }
  }, [enabled]);

  if (!visible) {
    return null;
  }

  return (
    <div className={classes.endScreen}>
      <animated.div className={classes.viewport} style={viewportStyle}>
        <animated.div className={classes.content} style={contentStyle}>
          <div className={classes.text}>
            <h2>{t('概要')}</h2>
            <p>
              {t(
                'このサイトは「黄金勇者ゴルドラン」30周年を記念して制作したファンメイド作品です。',
              )}
              <br />
              {t(
                '3DソフトウェアBlenderとレンダリングエンジンBabylon.jsを使用して制作しました。',
              )}
            </p>
            <h2>{t('制作')}</h2>
            <p>
              <span className={classes.author}>htanjo</span>
              <br />
              X / BlueSky / GitHub
              <br />
              {t('その他の作品')}: htanjo&apos;s works
            </p>
            <h2>{t('共有')}</h2>
            <p>X / BlueSky / Facebook / B! / Line</p>
          </div>
          <animated.div className={classes.navigation} style={navigationStyle}>
            <Icon name="arrow_upward" className={classes.icon} />{' '}
            {t('最初に戻る')}{' '}
            <Icon name="arrow_upward" className={classes.icon} />
          </animated.div>
        </animated.div>
        <div className={classes.backdrop} />
      </animated.div>
    </div>
  );
}

export default EndScreen;
