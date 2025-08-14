import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './Login.jsx';
import Home from './Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
      </App>
    </BrowserRouter>
  </StrictMode>,
);
