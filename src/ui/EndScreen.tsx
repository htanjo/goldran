import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { animated, config, easings, useSpring } from '@react-spring/web';
import { Tooltip } from 'react-tooltip';
import { MdArrowUpward } from 'react-icons/md';
import {
  FaBluesky,
  FaGetPocket,
  FaSquareFacebook,
  FaSquareXTwitter,
} from 'react-icons/fa6';
import { SiHatenabookmark } from 'react-icons/si';
import { hasTouchscreen, scrollMultiplier, siteUrl } from '../settings/general';
import classes from './EndScreen.module.scss';

interface EndScreenProps {
  enabled: boolean;
  progress: number; // 0 to 1 to complete the end screen.
  scroll: number; // Actual pixels user scrolled.
  onRewind: () => void;
}

function EndScreen({ enabled, progress, scroll, onRewind }: EndScreenProps) {
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
    delay: 800,
  });

  const handleClickRewind = useCallback(
    (event: MouseEvent) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.blur();
      }
      if (import.meta.env.PROD) {
        ReactGA.event({ category: 'click', action: 'click_rewind' });
      }
      onRewind();
    },
    [onRewind],
  );

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
      <animated.div
        className={classes.viewport}
        style={{ ...viewportStyle, willChange: 'opacity' }}
      >
        <animated.div
          className={classes.content}
          style={{ ...contentStyle, willChange: 'transform' }}
        >
          <div className={classes.text}>
            <h2>{t('概要')}</h2>
            <p>
              {t(
                'このWebページは「黄金勇者ゴルドラン」30周年を記念して制作したファンメイド作品です。',
              )}
              <br />
              {t(
                '作中の合体シーンを1カットの3Dアニメーションで再現し、操作できるようにしました。',
              )}
              <br />
              {t(
                '制作には3DソフトBlenderとレンダリングエンジンBabylon.jsを使用しています。',
              )}
            </p>
            <h2>{t('制作')}</h2>
            <p>
              <span className={classes.author}>htanjo</span>
              <br />
              <a href="https://x.com/htanjo" target="_blank" rel="noreferrer">
                X (Twitter)
              </a>{' '}
              |{' '}
              <a
                href="https://github.com/htanjo"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <br />
              {t('その他の作品')}:{' '}
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href="https://htanjo.github.io/works/" target="_blank">
                htanjo&apos;s works
              </a>
            </p>
            <h2>{t('共有')}</h2>
            <p>
              <a
                href={`https://twitter.com/intent/tweet?url=${siteUrl}&via=htanjo&related=htanjo&text=${document.title}%0a`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="endScreenTooltip"
                data-tooltip-content={t('Xにポスト')}
                className={`${classes.shareButton} ${classes.xTwitter}`}
              >
                <FaSquareXTwitter />
              </a>
              <a
                href={`https://bsky.app/intent/compose?text=${document.title}+${siteUrl}`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="endScreenTooltip"
                data-tooltip-content={t('BlueSkyに投稿')}
                className={`${classes.shareButton} ${classes.bluesky}`}
              >
                <FaBluesky />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="endScreenTooltip"
                data-tooltip-content={t('Facebookでシェア')}
                className={`${classes.shareButton} ${classes.facebook}`}
              >
                <FaSquareFacebook />
              </a>
              <a
                href={`https://b.hatena.ne.jp/add?mode=confirm&url=${siteUrl}`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="endScreenTooltip"
                data-tooltip-content={t('はてなブックマークに登録')}
                className={`${classes.shareButton} ${classes.hatena}`}
              >
                <SiHatenabookmark />
              </a>
              <a
                href={`https://getpocket.com/edit?url=${siteUrl}`}
                target="_blank"
                rel="noreferrer"
                data-tooltip-id="endScreenTooltip"
                data-tooltip-content={t('Pocketに保存')}
                className={`${classes.shareButton} ${classes.pocket}`}
              >
                <FaGetPocket />
              </a>
            </p>
          </div>
          <animated.div className={classes.navigation} style={navigationStyle}>
            <button
              type="button"
              className={classes.backToStart}
              onClick={handleClickRewind}
            >
              <MdArrowUpward className={classes.icon} /> {t('最初に戻る')}{' '}
              <MdArrowUpward className={classes.icon} />
            </button>
          </animated.div>
          <Tooltip id="endScreenTooltip" className={classes.tooltip} />
        </animated.div>
        <div className={classes.backdrop} />
      </animated.div>
    </div>
  );
}

export default EndScreen;
