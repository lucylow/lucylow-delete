export const CONTRACT_CONFIG = {
  ACHIEVEMENT_NFT: {
    address: (typeof process !== 'undefined' && process.env.REACT_APP_NFT_CONTRACT_ADDRESS) || '0x0000000000000000000000000000000000000000',
    abi: []
  },
  TASK_VERIFICATION: {
    address: (typeof process !== 'undefined' && process.env.REACT_APP_TASK_CONTRACT_ADDRESS) || '0x0000000000000000000000000000000000000000',
    abi: []
  },
  GOVERNANCE_TOKEN: {
    address: (typeof process !== 'undefined' && process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS) || '0x0000000000000000000000000000000000000000',
    abi: []
  }
};

export const DEFAULT_CHAIN_ID = (typeof process !== 'undefined' && process.env.REACT_APP_DEFAULT_CHAIN_ID && parseInt(process.env.REACT_APP_DEFAULT_CHAIN_ID)) || 5;
