import { lazy, Suspense } from 'react';
import SplashScreen from '../ui/SplashScreen';
import classes from './App.module.scss';

const Screen = lazy(() => import('./Screen'));

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Suspense fallback={<SplashScreen />}>
          <Screen />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
