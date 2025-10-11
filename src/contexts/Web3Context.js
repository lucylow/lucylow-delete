import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, DEFAULT_CHAIN_ID, SUPPORTED_CHAINS } from '../blockchain/web3-config';

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
      try {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
          setIsMetaMaskInstalled(true);
          console.log('MetaMask detected');
          setError(null); // Clear any previous errors
        } else {
          setIsMetaMaskInstalled(false);
          console.log('MetaMask not detected - this is normal if not installed');
          // Don't set error here - let users decide if they want to connect
        }
      } catch (e) {
        console.warn('Error checking MetaMask:', e);
        setIsMetaMaskInstalled(false);
      }
    };

    checkMetaMask();

    // Listen for MetaMask installation
    if (typeof window !== 'undefined') {
      window.addEventListener('ethereum#initialized', checkMetaMask, { once: true });

      // Backup check after 3 seconds
      setTimeout(checkMetaMask, 3000);

      return () => {
        window.removeEventListener('ethereum#initialized', checkMetaMask);
      };
    }
  }, []);

  const checkAccounts = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum || !provider) return;
    
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
      // Don't set error for automatic checks - only for user-initiated actions
    }
  }, [provider]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && isMetaMaskInstalled) {
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
          if (window.ethereum && window.ethereum.removeListener) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
            window.ethereum.removeListener('disconnect', handleDisconnect);
          }
        };
      } catch (e) {
        console.error('Failed to initialize Web3 provider:', e);
        // Don't set error for initialization failures - let user decide to connect
      }
    }
  }, [checkAccounts, isMetaMaskInstalled]);

  const connect = async () => {
    setError(null);

    if (typeof window === 'undefined' || !window.ethereum) {
      const errorMsg = 'MetaMask is not installed. Please install the MetaMask browser extension from https://metamask.io/download/';
      setError(errorMsg);
      console.error(errorMsg);
      // Open MetaMask download page
      if (typeof window !== 'undefined') {
        window.open('https://metamask.io/download/', '_blank');
      }
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

  const switchNetwork = async (targetChainId) => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask is not installed');
      return false;
    }

    try {
      const chainIdHex = '0x' + targetChainId.toString(16);
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      
      console.log(`Switched to chain ${targetChainId}`);
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          const chainConfig = SUPPORTED_CHAINS[targetChainId];
          if (!chainConfig) {
            throw new Error('Chain not supported');
          }

          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x' + targetChainId.toString(16),
              chainName: chainConfig.name,
              rpcUrls: [chainConfig.rpc],
              blockExplorerUrls: chainConfig.explorer ? [chainConfig.explorer] : [],
            }],
          });
          
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          setError('Failed to add network: ' + addError.message);
          return false;
        }
      } else {
        console.error('Error switching network:', switchError);
        setError('Failed to switch network: ' + switchError.message);
        return false;
      }
    }
  };

  const getNetworkName = () => {
    if (!chainId) return 'Not connected';
    return SUPPORTED_CHAINS[chainId]?.name || `Unknown (${chainId})`;
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
      switchNetwork,
      getNetworkName,
      isMetaMaskInstalled,
      supportedChains: SUPPORTED_CHAINS
    }}>
      {children}
    </Web3Context.Provider>
  );
};
