import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animated, easings, useSpring } from '@react-spring/web';
import QuoteEffect from './QuoteEffect';
import { hasTouchscreen, scrollMultiplier } from '../settings/general';
import { captions } from '../settings/captions';
import classes from './Caption.module.scss';
import vehicleDataJa from '../assets/info_vehicle_data_ja.svg';
import vehicleDataEn from '../assets/info_vehicle_data_en.svg';
import dranDataJa from '../assets/info_dran_data_ja.svg';
import dranDataEn from '../assets/info_dran_data_en.svg';
import golgonDataJa from '../assets/info_golgon_data_ja.svg';
import golgonDataEn from '../assets/info_golgon_data_en.svg';
import combinationDataJa from '../assets/info_combination_data_ja.svg';
import combinationDataEn from '../assets/info_combination_data_en.svg';
import goldranDataJa from '../assets/info_goldran_data_ja.svg';
import goldranDataEn from '../assets/info_goldran_data_en.svg';
import incantationJa from '../assets/quote_incantation_ja.webp';
import incantationEn from '../assets/quote_incantation_en.webp';
import dranShoutJa from '../assets/quote_dran_shout_ja.webp';
import dranShoutEn from '../assets/quote_dran_shout_en.webp';
import golgonShoutJa from '../assets/quote_golgon_shout_ja.webp';
import golgonShoutEn from '../assets/quote_golgon_shout_en.webp';
import goldranShoutJa from '../assets/quote_goldran_shout_ja.webp';
import goldranShoutEn from '../assets/quote_goldran_shout_en.webp';
import dranDiagram from '../assets/image_dran_diagram.svg';
import goldranDiagram from '../assets/image_goldran_diagram.svg';
import InfoEffect from './InfoEffect';

interface CaptionProps {
  id: string;
  enabled: boolean;
  progress: number; // 0 to 1 to complete the start screen.
  scroll: number; // Actual pixels user scrolled.
}

const imagesJa: { [key: string]: string } = {
  vehicleData: vehicleDataJa,
  dranData: dranDataJa,
  golgonData: golgonDataJa,
  combinationData: combinationDataJa,
  goldranData: goldranDataJa,
  incantation: incantationJa,
  dranShout: dranShoutJa,
  golgonShout: golgonShoutJa,
  goldranShout: goldranShoutJa,
  dranDiagram,
  goldranDiagram,
};

const imagesEn: { [key: string]: string } = {
  vehicleData: vehicleDataEn,
  dranData: dranDataEn,
  golgonData: golgonDataEn,
  combinationData: combinationDataEn,
  goldranData: goldranDataEn,
  incantation: incantationEn,
  dranShout: dranShoutEn,
  golgonShout: golgonShoutEn,
  goldranShout: goldranShoutEn,
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
  const { i18n, t } = useTranslation();
  const [visible, setVisible] = useState(enabled);
  const caption = useMemo(() => captions.find((item) => item.id === id), [id]);
  const effectEnabled = progress > 0.2;
  const images = i18n.language === 'en' ? imagesEn : imagesJa;

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

  return (
    <div className={classes.caption}>
      <animated.div
        className={classes.content}
        style={{ ...contentStyle, willChange: 'opacity, transform' }}
      >
        <div className={`${classes.text} ${classes[caption.type]}`}>
          {caption.type === 'info' && (
            <InfoEffect enabled={effectEnabled}>
              <img src={images[caption.id]} alt={t(caption.id)} />
            </InfoEffect>
          )}
          {caption.type === 'quote' && (
            <QuoteEffect enabled={effectEnabled}>
              <img src={images[caption.id]} alt={t(caption.id)} />
            </QuoteEffect>
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
