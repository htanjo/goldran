import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { animated, easings, useSpring } from '@react-spring/web';
import QuoteEffect from './QuoteEffect';
import { hasTouchscreen, scrollMultiplier } from '../settings/general';
import { captions } from '../settings/captions';
import classes from './Caption.module.scss';
import dranDiagram from '../assets/diagram_dran.svg';
import goldranDiagram from '../assets/diagram_goldran.svg';
import InfoEffect from './InfoEffect';

interface CaptionProps {
  id: string;
  enabled: boolean;
  progress: number; // 0 to 1 to complete the start screen.
  scroll: number; // Actual pixels user scrolled.
}

const images: { [key: string]: string } = {
  dranDiagram,
  goldranDiagram,
};

function getOpacity(progress: number) {
  if (progress === 0) {
    return 0;
  }
  const threshold = 0.9;
  const factor =
    progress > threshold ? (progress - threshold) / (1 - threshold) : 0;
  const opacity = 1 - factor;
  return opacity;
}

function getTranslateY(scroll: number, type: 'info' | 'quote' | 'image') {
  if (type === 'image') {
    return -scroll;
  }
  const threshold = (type === 'info' ? 800 : 1000) / scrollMultiplier;
  const translateY = scroll > threshold ? -(scroll - threshold) : 0;
  return translateY;
}

function Caption({ id, enabled, progress, scroll }: CaptionProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(enabled);
  const caption = useMemo(() => captions.find((item) => item.id === id), [id]);
  const effectEnabled = progress > 0.2;

  const contentStyle = useSpring({
    opacity: getOpacity(progress),
    transform: `translateY(${getTranslateY(scroll, caption?.type || 'info')}px)`,
    config: {
      easing: easings.easeOutSine,
      duration: hasTouchscreen ? 100 : 200,
    },
    onRest: (result) => {
      if (result.value.opacity === 0) {
        setVisible(false);
      }
    },
  });

  useEffect(() => {
    if (enabled) {
      setVisible(true);
    }
  }, [enabled]);

  if (!caption || !visible) {
    return null;
  }

  const longQuote = caption.type === 'quote' && t(caption.id).includes('\n');

  return (
    <div className={classes.caption}>
      <animated.div
        className={classes.content}
        style={{ ...contentStyle, willChange: 'opacity, transform' }}
      >
        <div
          className={`${classes.text} ${classes[caption.type]}${longQuote ? ` ${classes.small}` : ''}`}
        >
          {caption.type === 'info' && (
            <InfoEffect enabled={effectEnabled}>
              {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
              <Trans i18nKey={caption.id} components={{ h2: <h2 /> }} />
            </InfoEffect>
          )}
          {caption.type === 'quote' && (
            <QuoteEffect enabled={effectEnabled}>{t(caption.id)}</QuoteEffect>
          )}
          {caption.type === 'image' && (
            <img src={images[caption.id]} alt={t(caption.id)} />
          )}
        </div>
      </animated.div>
    </div>
  );
}

export default Caption;
