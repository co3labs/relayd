import { Dispatch, SetStateAction } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export type supportedChains = 2828 | 4;

export type ITxProgress = 'loading' | 'failed' | 'success' | '';

export type VoidFunciton = () => void;
export type ModalOpen = 'withdraw' | 'recharge' | null;

export interface IPoolItem {
  name: string;
  description: string;
  address: string;
  balance: string;
  tags: string[]
  enabled:boolean
  beneficiaries: {name:string; address:string}[]
}

export interface globalStates {
  handleConnect: VoidFunciton;
  walletAddress?: string;
  chainId?: supportedChains;
  provider?: Web3Modal;
  web3?: Web3;
  modalOpen: ModalOpen;
  setModalOpen: Dispatch<SetStateAction<ModalOpen>>;
  userPools: IPoolItem[];
  setUserPools: Dispatch<SetStateAction<IPoolItem[]>>
  allPools: IPoolItem[];
  setAllPools: Dispatch<SetStateAction<IPoolItem[]>>
  currentPool: number | null;
  setCurrentPool: Dispatch<SetStateAction<number | null>>;
}
