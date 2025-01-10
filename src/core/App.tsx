import { lazy, Suspense, useEffect } from 'react';
import ReactGA from 'react-ga4';
import SplashScreen from '../ui/SplashScreen';
import classes from './App.module.scss';

const Screen = lazy(() => import('./Screen'));

function App() {
  useEffect(() => {
    if (import.meta.env.PROD) {
      ReactGA.initialize('G-MPT0YVV9GQ', {
        gtagOptions: { send_page_view: false },
      });
      ReactGA.send({
        hitType: 'pageview',
        page: `${window.location.pathname}${window.location.search}`,
        title: document.title,
      });
    }
  }, []);
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
