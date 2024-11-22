import classes from './Scrollbar.module.scss';

interface ScrollbarProps {
  scrollLength: number;
  contentLength: number;
  viewportLength: number;
}

function Scrollbar({
  scrollLength,
  contentLength,
  viewportLength,
}: ScrollbarProps) {
  return (
    <div className={classes.scrollbar}>
      <div
        className={classes.activeBarWrapper}
        style={{
          translate: `0 ${(scrollLength / contentLength) * 100}%`,
        }}
      >
        <div
          className={classes.activeBar}
          style={{
            height: `${(viewportLength / contentLength) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Scrollbar;
