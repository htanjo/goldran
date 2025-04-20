import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import classes from './ProgressBar.module.scss';

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={classes.progressBar}>
      <RiArrowLeftDoubleFill className={classes.icon} />
      <div className={classes.totalBar}>
        <div
          className={classes.activeBar}
          style={{
            translate: `${(1 - progress) * -100}%`,
          }}
        />
      </div>
      <RiArrowRightDoubleFill className={classes.icon} />
    </div>
  );
}

export default ProgressBar;
