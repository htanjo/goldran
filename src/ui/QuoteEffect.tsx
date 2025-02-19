import { ReactNode, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import classes from './QuoteEffect.module.scss';

interface QuoteEffectProps {
  children: ReactNode;
  enabled: boolean;
}

function QuoteEffect({ children, enabled }: QuoteEffectProps) {
  const [secondaryVisible, setSecondaryVisible] = useState(true);

  const primaryStyle = useSpring({
    opacity: enabled ? 1 : 0,
    transform: enabled
      ? 'translateX(0em) scale(1)'
      : 'translateX(1em) scale(1.4)',
    from: {
      opacity: 0,
      transform: 'translateX(1em) scale(1.4)',
    },
    config: { duration: 200 },
  });
  const secondaryStyle = useSpring({
    opacity: enabled ? 1 : 0,
    transform: enabled
      ? 'translateX(0em) scale(1)'
      : 'translateX(-1em) scale(1.4)',
    from: {
      opacity: 0,
      transform: 'translateX(-1em) scale(1.4)',
    },
    config: { duration: 200 },
    onStart: () => {
      setSecondaryVisible(true);
    },
    onRest: (result) => {
      if (result.value.opacity === 1) {
        setSecondaryVisible(false);
      } else {
        setSecondaryVisible(true);
      }
    },
  });

  return (
    <div className={classes.quoteEffect}>
      <animated.div
        className={classes.primaryText}
        style={{ ...primaryStyle, willChange: 'opacity, transform' }}
      >
        {children}
      </animated.div>
      <animated.div
        className={classes.secondaryText}
        style={{
          ...secondaryStyle,
          visibility: secondaryVisible ? 'visible' : 'hidden',
          willChange: 'opacity, transform',
        }}
        aria-disabled
      >
        {children}
      </animated.div>
    </div>
  );
}

export default QuoteEffect;
