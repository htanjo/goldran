import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, config, easings, useSpring } from '@react-spring/web';
import Logo from './Logo';
import Icon from './Icon';
import { hasTouchscreen, vrMode } from '../settings/general';
import classes from './StartScreen.module.scss';

interface StartScreenProps {
  enabled: boolean;
  progress: number; // 0 to 1 to complete the start screen.
  scroll: number; // Actual pixels user scrolled.
}

function StartScreen({ enabled, progress, scroll }: StartScreenProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(enabled);

  const viewportStyle = useSpring({
    opacity: 1 - progress,
    config: config.default,
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setVisible(false);
      }
    },
  });

  const contentStyle = useSpring({
    transform: `translateY(${-scroll}px)`,
    config: {
      easing: easings.easeOutSine,
      duration: hasTouchscreen ? 100 : 200,
    },
  });

  const navigationStyle = useSpring({
    opacity: enabled ? 1 : 0,
    transform: enabled ? 'translateY(0)' : `translateY(1em)`,
    config: config.default,
    delay: 1600,
  });

  const letterboxTopStyle = useSpring({
    transform: `translateY(${progress * -100}%)`,
    config: config.default,
  });

  const letterboxBottomStyle = useSpring({
    transform: `translateY(${progress * 100}%)`,
    config: config.default,
  });

  useEffect(() => {
    if (enabled) {
      setVisible(true);
    }
  }, [enabled]);

  return (
    <div
      className={classes.startScreen}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <animated.div className={classes.viewport} style={viewportStyle}>
        <animated.div className={classes.content} style={contentStyle}>
          <div className={classes.title}>
            <h1>
              <Logo />
            </h1>
            <div className={classes.subtitle}>
              {t('「黄金勇者ゴルドラン」より')}
            </div>
          </div>
          {!vrMode && (
            <animated.div
              className={classes.navigation}
              style={navigationStyle}
            >
              <Icon name="arrows_outward" className={classes.icon} />{' '}
              {t('スクロールして遊ぶ')}{' '}
              <Icon name="arrows_outward" className={classes.icon} />
            </animated.div>
          )}
        </animated.div>
        <div className={classes.backdrop} />
      </animated.div>
      <animated.div
        className={classes.letterboxTop}
        style={letterboxTopStyle}
      />
      <animated.div
        className={classes.letterboxBottom}
        style={letterboxBottomStyle}
      />
    </div>
  );
}

export default StartScreen;
