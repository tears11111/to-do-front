import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PortalProvider } from 'react-portal-hook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PortalProvider>
      <App/>
    </PortalProvider>
  </BrowserRouter>
);