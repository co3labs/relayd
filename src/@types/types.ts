import { Dispatch, SetStateAction } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export type supportedChains = 2828 | 4;

export type ITxProgress = 'loading' | 'failed' | 'success' | '';

export type VoidFunciton = () => void;

export interface IPoolItem {
  group: string;
  name: string;
  description: string;
  address: string;
  balance: string;
}

export interface globalStates {
  handleConnect: VoidFunciton;
  walletAddress?: string;
  chainId?: supportedChains;
  provider?: Web3Modal;
  web3?: Web3;
  showRechargeModal: boolean;
  setShowRechargeModal: Dispatch<SetStateAction<boolean>>;
  showSignupModal: boolean;
  setShowSignupModal: Dispatch<SetStateAction<boolean>>;
}
