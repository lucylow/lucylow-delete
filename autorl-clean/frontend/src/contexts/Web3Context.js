import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (window.ethereum) {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
      checkAccounts();
      window.ethereum.on('accountsChanged', checkAccounts);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkAccounts);
      }
    };
  }, []);

  const checkAccounts = async () => {
    try {
      const accs = await window.ethereum.request({ method: 'eth_accounts' });
      if (accs && accs.length) {
        const signer = provider.getSigner();
        setSigner(signer);
        setAccount(accs[0]);
        const net = await provider.getNetwork();
        setChainId(net.chainId);
        setIsConnected(true);
        setContracts({});
      }
    } catch (e) {
      console.warn('checkAccounts', e);
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      setError('No wallet detected');
      return;
    }
    try {
      const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
      const s = p.getSigner();
      setSigner(s);
      setAccount(accs[0]);
      const net = await p.getNetwork();
      setChainId(net.chainId);
      setIsConnected(true);
      // create dummy contract instances if ABI present
      const created = {};
      Object.keys(CONTRACT_CONFIG).forEach(k => {
        const cfg = CONTRACT_CONFIG[k];
        if (cfg.abi && cfg.address) {
          try{ created[k] = new ethers.Contract(cfg.address, cfg.abi, s);}catch(e){}
        }
      });
      setContracts(created);
    } catch (e) {
      setError(e.message || String(e));
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setContracts({});
    setBalance('0');
  };

  return (
    <Web3Context.Provider value={{ provider, signer, account, chainId, isConnected, contracts, balance, error, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};
