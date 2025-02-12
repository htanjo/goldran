import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import logoColoredImage from '../assets/logo.webp';
import logoFlatImage from '../assets/logo_flat.webp';
import classes from './Logo.module.scss';

interface LogoProps {
  colored?: boolean;
}

function Logo({ colored = true }: LogoProps) {
  const { t } = useTranslation();
  const imageUrl = useMemo(
    () => (colored ? logoColoredImage : logoFlatImage),
    [colored],
  );

  return (
    <img
      src={imageUrl}
      alt={t('黄金合体ゴルドラン')}
      className={classes.logo}
    />
  );
}

export default Logo;
