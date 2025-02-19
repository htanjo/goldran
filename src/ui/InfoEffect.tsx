import { ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface InfoEffectProps {
  children: ReactNode;
  enabled: boolean;
}

function InfoEffect({ children, enabled }: InfoEffectProps) {
  const style = useSpring({
    opacity: enabled ? 1 : 0,
    transform: enabled ? 'translateY(0em)' : 'translateY(1em)',
    from: {
      opacity: 0,
      transform: 'translateY(1em)',
    },
    config: { duration: 200 },
  });

  return (
    <animated.div style={{ ...style, willChange: 'opacity, transform' }}>
      {children}
    </animated.div>
  );
}

export default InfoEffect;
