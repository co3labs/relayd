import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Account, globalStates, IPoolItem, IPolicyItem, ModalOpen, supportedChains } from '../@types/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export const blockExplorer = 'https://explorer.execution.l16.lukso.network/address/';

export const INITIAL_GUARDIAN_LIST = { 0: { name: '', address: '' } };
export const API_URL = 'https://relayd-api.vercel.app/api/v1/';
export const networks = {
  2828: 'Lukso Testnet (L16)',
  4: 'Rinkeby',
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const getShortId = (id: string) => {
  const split = id.split('');
  split.splice(5, 33, '...');
  return split.join('');
};

export const cantAddVaults =
  'The connected wallet cannot add Recovery Vaults to this Universal Profile. Please switch to a controller account.';

export const GlobalContext = createContext({} as globalStates);

export const GlobalProvider = ({ children }: { children: PropsWithChildren<{}> }) => {
  // essential states for connection to web3, user wallet, ocean operations, and DataX configurations
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [accountAddress, setAccountAddress] = useState<string>();
  const [chainId, setChainId] = useState<any>();
  const [provider, setProvider] = useState<Web3Modal>();
  const [web3, setWeb3] = useState<Web3>();
  const [unsupportedNet, setUnsupportedNet] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<ModalOpen>(null);
  const [account, setAccount] = useState<Account>();

  const [userPools, setUserPools] = useState<IPoolItem[]>([]);
  const [allPools, setAllPools] = useState<IPoolItem[]>([]);
  const [currentPool, setCurrentPool] = useState<IPoolItem | null>(null);
  // const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const strategies: IPolicyItem[] = [
    {
      abi: '[a long abi]',
      conditions: [{ param_name: 'amount', condition: '>', value: '' }],
      contract_name: 'KEF1192',
      policy_name: '1K Transaction',
      description: 'Incentivizes transactions over 1K in value.',
    },
    {
      abi: '[a long abi]',
      conditions: [{ param_name: 'amount', condition: '>', value: '' }],
      contract_name: 'KEF1192',
      policy_name: '1K Transaction',
      description: 'Incentivizes transactions over 1K in value.',
    },
    {
      abi: '[a long abi]',
      conditions: [{ param_name: 'amount', condition: '>', value: '' }],
      contract_name: 'KEF1192',
      policy_name: '1K Transaction',
      description: 'Incentivizes transactions over 1K in value.',
    },
    {
      abi: '[a long abi]',
      conditions: [{ param_name: 'amount', condition: '>', value: '' }],
      contract_name: 'KEF1192',
      policy_name: '1K Transaction',
      description: 'Incentivizes transactions over 1K in value.',
    },
  ];

  const [userPolicies, setUserPolicies] = useState<IPolicyItem[]>(strategies);
  const [allPolicies, setAllPolicies] = useState<IPolicyItem[]>([
    ...strategies,
    ...strategies,
    ...strategies,
    ...strategies,
  ]);

  // intitialize web3modal to use to connect to provider
  useEffect(() => {
    async function init() {
      try {
        const web3Modal = new Web3Modal({
          // disableInjectedProvider:true,
          cacheProvider: false,
          network: 'mainnet',
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: {
                infuraId: process.env.REACT_APP_INFURA_ID, // required
              },
            },
          }, // required
        });
        setWeb3Modal(web3Modal);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, [web3, chainId]);

  /**
   *
   * Handles client side disclaimer approval.
   *
   * @param account
   * @param web3
   * @param localSignature
   * @returns
   * current localSignature value
   */

  /**
   * Handles connection to web3 and user wallet.
   */
  async function handleConnect() {
    try {
      const provider = await web3Modal?.connect();
      setProvider(provider);

      const web3 = new Web3(provider);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0] ? accounts[0].toLowerCase() : null;
      setWalletAddress(accounts[0]);

      const _chainId = await web3.eth.getChainId();
      setChainId(_chainId);

      setListeners(provider, web3);

      console.info('Connected to account' + account + ', on chain' + _chainId);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Sets listeners events on: walletAddress, chainId, provider connection, provider disconnection.
   *
   * @param provider
   * @param web3
   */

  function setListeners(provider: any, web3: Web3) {
    provider.on('accountsChanged', async (accounts: string[]) => {
      setWalletAddress(accounts[0]);
    });

    // Subscribe to chainId change
    provider.on('chainChanged', async (chainId: supportedChains) => {
      console.log(parseInt(String(chainId)));
      setChainId(parseInt(String(chainId)));
    });

    // Subscribe to provider connection
    provider.on('connect', (info: { chainId: number }) => {
      console.info('Connect event fired');
      console.info(info);
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.error(error);
    });
  }

  const switchNetwork = async () => {
    if (!process.env.REACT_APP_CHAIN_ID) return;
    if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
      try {
        //@ts-ignore
        await web3?.currentProvider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(process.env.REACT_APP_CHAIN_ID) }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          addNetwork();
        }
      }
    }
  };

  const addNetwork = async () => {
    try {
      //@ts-ignore
      await web3?.currentProvider?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xB0C',
            chainName: 'L16',
            nativeCurrency: {
              name: 'LYXt',
              symbol: 'LYXt',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.l16.lukso.network/'],
            blockExplorerUrls: ['https://explorer.consensus.l16.lukso.network/'],
          },
        ],
      });
    } catch (error: any) {
      if (error.code !== 4001)
        alert(
          'An error occured when adding the Lukso network to your wallet. Please add it in your wallet to continue.'
        );
    }
  };

  async function updateUserPools(current: boolean = false, id?: number) {
    try {
      const {
        data: { data },
      } = await axios.get(API_URL + 'pool/account/' + accountAddress);
      setUserPools({ ...data });

      if (current) {
        const currentPoolUpdate = data.find((pool: IPoolItem) => pool.id === id);
        setCurrentPool({ ...currentPoolUpdate });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (chainId !== process.env.CHAIN_ID) {
      switchNetwork();
    }
  }, [chainId]);

  useEffect(() => {
    console.log('Getting account data:', accountAddress && !account);
    if (accountAddress && !account) {
      // const {data} useQuery
      axios
        .get(API_URL + 'account/' + accountAddress)
        .then((res) => {
          console.log(res);
          const data = res.data.data;
          setAccount(data);
          return data;
        })
        .then(async (data) => {
          const balance = await web3?.eth.getBalance(data.wallet);
          console.log('Account balance: ', balance);
          setAccount({ ...data, unallocated: balance });
        });
    }
  }, [accountAddress]);

  return (
    <GlobalContext.Provider
      value={{
        handleConnect,
        walletAddress,
        chainId,
        provider,
        web3,
        modalOpen,
        setModalOpen,
        userPools,
        allPools,
        currentPool,
        setCurrentPool,
        setAllPools,
        setUserPools,
        userPolicies,
        allPolicies,
        setAllPolicies,
        setUserPolicies,
        account,
        accountAddress,
        setAccountAddress,
        updateUserPools
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
