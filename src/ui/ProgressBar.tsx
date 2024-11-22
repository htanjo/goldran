import Icon from './Icon';
import classes from './ProgressBar.module.scss';

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={classes.progressBar}>
      <Icon name="arrow_menu_close" className={classes.icon} />
      <div className={classes.totalBar}>
        <div
          className={classes.activeBar}
          style={{
            translate: `${(1 - progress) * -100}%`,
          }}
        />
      </div>
      <Icon name="arrow_menu_open" className={classes.icon} />
    </div>
  );
}

export default ProgressBar;
