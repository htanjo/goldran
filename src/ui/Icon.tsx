import clsx from 'clsx';
import classes from './Icon.module.scss';

interface IconProps {
  name: string;
  className?: string;
  'aria-label'?: string;
}

function Icon({ name, className = '', 'aria-label': ariaLabel }: IconProps) {
  return (
    <span
      className={clsx('material-symbols-sharp', classes.icon, className)}
      translate="no"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(ariaLabel ? { 'aria-label': ariaLabel } : { 'aria-hidden': true })}
    >
      {name}
    </span>
  );
}
export default Icon;
