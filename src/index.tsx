import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const ENABLE_STRICT_MODE = true;

const OptionalStrict = ENABLE_STRICT_MODE ? React.StrictMode : React.Fragment;

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <OptionalStrict>
        <App />
    </OptionalStrict>,
  );
