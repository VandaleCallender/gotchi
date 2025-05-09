import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import App from './App';
import './index.css';
import { PetProvider } from './context/PetContext';
import { AssetsProvider } from './context/AssetsContext';
import { ThemeProvider } from './context/ThemeContext';

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'dark'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiConfig config={config}>
      <ThemeProvider>
        <PetProvider>
          <AssetsProvider>
            <App />
          </AssetsProvider>
        </PetProvider>
      </ThemeProvider>
    </WagmiConfig>
  </StrictMode>
);