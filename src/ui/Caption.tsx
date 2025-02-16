import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { animated, easings, useSpring } from '@react-spring/web';
import QuoteEffect from './QuoteEffect';
import { hasTouchscreen, scrollMultiplier } from '../settings/general';
import { captions } from '../settings/captions';
import classes from './Caption.module.scss';
import dranDiagram from '../assets/diagram_dran.svg';
import goldranDiagram from '../assets/diagram_goldran.svg';

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
  const threshold = 0.9;
  const factor =
    progress > threshold ? (progress - threshold) / (1 - threshold) : 0;
  const opacity = 1 - factor;
  return opacity;
}

function getTranslateY(scroll: number, type: 'info' | 'quote' | 'image') {
  if (type === 'info' || type === 'image') {
    return -scroll;
  }
  const threshold = 1000 / scrollMultiplier;
  const translateY = scroll > threshold ? -(scroll - threshold) : 0;
  return translateY;
}

function Caption({ id, enabled, progress, scroll }: CaptionProps) {
  const { t } = useTranslation();
  const caption = useMemo(() => captions.find((item) => item.id === id), [id]);
  const quoteEffectEnabled = progress > 0.2;

  const contentStyle = useSpring({
    opacity: getOpacity(progress),
    transform: `translateY(${getTranslateY(scroll, caption?.type || 'info')}px`,
    config: {
      easing: easings.easeOutSine,
      duration: hasTouchscreen ? 100 : 200,
    },
  });

  if (!caption) {
    return null;
  }

  const longQuote = caption.type === 'quote' && t(caption.id).includes('\n');

  return (
    <div
      className={`${classes.caption}${enabled ? '' : ` ${classes.disabled}`}`}
    >
      <animated.div className={classes.content} style={contentStyle}>
        <div
          className={`${classes.text} ${classes[caption.type]}${longQuote ? ` ${classes.small}` : ''}`}
        >
          {caption.type === 'info' && (
            // eslint-disable-next-line jsx-a11y/heading-has-content
            <Trans i18nKey={caption.id} components={{ h2: <h2 /> }} />
          )}
          {caption.type === 'quote' && (
            <QuoteEffect text={t(caption.id)} enabled={quoteEffectEnabled} />
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
