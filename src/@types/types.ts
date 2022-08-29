import { Dispatch, SetStateAction } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export type supportedChains = 2828 | 4;

export type ITxProgress = 'loading' | 'failed' | 'success' | '';

export type VoidFunciton = () => void;
export type ModalOpen = 'withdraw' | 'recharge' | null;

export type condition = '>' | '<' | '=' | '≥' | '≤' | 'all';
export interface IStrategyCondition {
  param_name: string;
  condition: condition;
  value: string;
}
export interface IStrategyItem {
  name: string;
  description: string;
  abi: string;
  conditions: IStrategyCondition[];
  contract_name: string;
}

export interface IPoolItem {
  name: string;
  description: string;
  balance: string;
  tags: string[];
  enabled: boolean;
  txCount: number;
  beneficiaries: { name: string; address: string }[];
}

export interface Account {
  address: string;
  name: string;
  description: string;
  balance:number
}


export interface FuncInput {
  internalType: string;
  name: string;
  type: string;
}

export interface ABIFunc {
  inputs: FuncInput[];
  name: string;
  outputs: [];
  stateMutability: 'payable' | 'nonpayable' | 'view' | 'pure';
  type: string;
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
  setUserPools: Dispatch<SetStateAction<IPoolItem[]>>;
  allPools: IPoolItem[];
  setAllPools: Dispatch<SetStateAction<IPoolItem[]>>;
  currentPool: number | null;
  setCurrentPool: Dispatch<SetStateAction<number | null>>;
  userStrategies: IStrategyItem[];
  setUserStrategies: Dispatch<SetStateAction<IStrategyItem[]>>;
  allStrategies: IStrategyItem[];
  setAllStrategies: Dispatch<SetStateAction<IStrategyItem[]>>;
  account: Account | undefined
}
