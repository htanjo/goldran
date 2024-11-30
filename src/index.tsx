// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App';
import './i18n/init';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Disable React strict mode as it initializes Babylon.js twice.
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
