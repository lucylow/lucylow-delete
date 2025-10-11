import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, DEFAULT_CHAIN_ID } from '../blockchain/web3-config';

const Web3Context = createContext(null);
export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contracts, setContracts] = useState({});
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window.ethereum !== 'undefined') {
        setIsMetaMaskInstalled(true);
        console.log('MetaMask detected');
      } else {
        setIsMetaMaskInstalled(false);
        console.warn('MetaMask not detected');
        setError('MetaMask is not installed. Please install MetaMask extension to connect your wallet.');
      }
    };

    checkMetaMask();

    // Listen for MetaMask installation
    window.addEventListener('ethereum#initialized', checkMetaMask, { once: true });

    // Backup check after 3 seconds
    setTimeout(checkMetaMask, 3000);

    return () => {
      window.removeEventListener('ethereum#initialized', checkMetaMask);
    };
  }, []);

  const checkAccounts = useCallback(async () => {
    if (!window.ethereum || !provider) return;
    
    try {
      const accs = await window.ethereum.request({ method: 'eth_accounts' });
      if (accs && accs.length) {
        const s = await provider.getSigner();
        setSigner(s);
        setAccount(accs[0]);
        const net = await provider.getNetwork();
        setChainId(Number(net.chainId));
        setIsConnected(true);
        setError(null);
        
        // Get balance
        try {
          const bal = await provider.getBalance(accs[0]);
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          console.warn('Failed to get balance:', e);
        }
        
        // Initialize contracts
        const created = {};
        Object.keys(CONTRACT_CONFIG).forEach(k => {
          const cfg = CONTRACT_CONFIG[k];
          if (cfg.abi && cfg.address && cfg.address !== '0x0000000000000000000000000000000000000000') {
            try { 
              created[k] = new ethers.Contract(cfg.address, cfg.abi, s);
            } catch(e) { 
              console.warn('Failed to create contract:', k, e); 
            }
          }
        });
        setContracts(created);
      }
    } catch (e) {
      console.warn('checkAccounts error:', e);
      setError('Failed to check account status');
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum && isMetaMaskInstalled) {
      try {
        const p = new ethers.BrowserProvider(window.ethereum);
        setProvider(p);
        checkAccounts();

        // Set up event listeners
        const handleAccountsChanged = (accounts) => {
          console.log('Accounts changed:', accounts);
          if (accounts.length === 0) {
            disconnect();
          } else {
            checkAccounts();
          }
        };

        const handleChainChanged = (chainIdHex) => {
          console.log('Chain changed to:', chainIdHex);
          window.location.reload();
        };

        const handleDisconnect = () => {
          console.log('MetaMask disconnected');
          disconnect();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('disconnect', handleDisconnect);

        return () => {
          if (window.ethereum.removeListener) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
            window.ethereum.removeListener('disconnect', handleDisconnect);
          }
        };
      } catch (e) {
        console.error('Failed to initialize Web3 provider:', e);
        setError('Failed to initialize Web3 provider: ' + e.message);
      }
    }
  }, [checkAccounts, isMetaMaskInstalled]);

  const connect = async () => {
    setError(null);

    if (!window.ethereum) {
      const errorMsg = 'MetaMask is not installed. Please install the MetaMask browser extension from https://metamask.io/download/';
      setError(errorMsg);
      console.error(errorMsg);
      // Open MetaMask download page
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      console.log('Requesting MetaMask connection...');
      const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accs || accs.length === 0) {
        throw new Error('No accounts returned from MetaMask');
      }

      console.log('Connected to account:', accs[0]);
      
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);
      const s = await p.getSigner();
      setSigner(s);
      setAccount(accs[0]);
      const net = await p.getNetwork();
      setChainId(Number(net.chainId));
      setIsConnected(true);

      // Get balance
      try {
        const bal = await p.getBalance(accs[0]);
        setBalance(ethers.formatEther(bal));
      } catch (e) {
        console.warn('Failed to get balance:', e);
      }

      // Create contract instances if ABI present
      const created = {};
      Object.keys(CONTRACT_CONFIG).forEach(k => {
        const cfg = CONTRACT_CONFIG[k];
        if (cfg.abi && cfg.address && cfg.address !== '0x0000000000000000000000000000000000000000') {
          try { 
            created[k] = new ethers.Contract(cfg.address, cfg.abi, s);
            console.log(`Contract ${k} initialized`);
          } catch(e) { 
            console.warn('Failed to create contract:', k, e); 
          }
        }
      });
      setContracts(created);

      console.log('MetaMask connected successfully!');
      setError(null);
      
    } catch (e) {
      console.error('MetaMask connection error:', e);
      
      let errorMessage = 'Failed to connect to MetaMask';
      
      if (e.code === 4001) {
        errorMessage = 'Connection request rejected. Please approve the connection in MetaMask.';
      } else if (e.code === -32002) {
        errorMessage = 'Connection request pending. Please check MetaMask extension.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
    }
  };

  const disconnect = () => {
    console.log('Disconnecting wallet...');
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setContracts({});
    setBalance('0');
    setError(null);
  };

  return (
    <Web3Context.Provider value={{ 
      provider, 
      signer, 
      account, 
      chainId, 
      isConnected, 
      contracts, 
      balance, 
      error, 
      connect, 
      disconnect,
      isMetaMaskInstalled 
    }}>
      {children}
    </Web3Context.Provider>
  );
};
