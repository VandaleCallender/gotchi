import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { PetProvider } from './context/PetContext';
import { AssetsProvider } from './context/AssetsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PetProvider>
      <AssetsProvider>
        <App />
      </AssetsProvider>
    </PetProvider>
  </StrictMode>
);