import React from 'react';
import { useWeb3 } from '../../contexts/Web3Context';

export default function WalletConnection(){
  const { account, isConnected, connect, disconnect, error } = useWeb3();
  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      {error && <div style={{color:'red'}}>{error}</div>}
      {!isConnected ? (
        <button onClick={connect} style={{padding:8,borderRadius:6,background:'#00e3ff'}}>Connect Wallet</button>
      ) : (
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div style={{fontWeight:700}}>{String(account).slice(0,8)}...</div>
          <button onClick={disconnect} style={{padding:6}}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
