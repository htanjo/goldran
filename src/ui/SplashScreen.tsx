import Logo from './Logo';
import classes from './SplashScreen.module.scss';

function LoadingScreen() {
  return (
    <div className={classes.splashScreen}>
      <div className={classes.title}>
        <h1>
          <Logo colored={false} />
        </h1>
      </div>
    </div>
  );
}

export default LoadingScreen;
