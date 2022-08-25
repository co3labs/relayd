import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { globalStates, supportedChains } from '../@types/types';
export const blockExplorer = 'https://explorer.execution.l16.lukso.network/address/';

export const INITIAL_GUARDIAN_LIST = { 0: { name: '', address: '' } };

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
  const [chainId, setChainId] = useState<any>();
  const [provider, setProvider] = useState<Web3Modal>();
  const [web3, setWeb3] = useState<Web3>();
  const [unsupportedNet, setUnsupportedNet] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

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

  useEffect(() => {
    if (chainId !== process.env.CHAIN_ID) {
      switchNetwork();
    }
  }, [chainId]);

  return (
    <GlobalContext.Provider
      value={{
        handleConnect,
        walletAddress,
        chainId,
        provider,
        web3,
      }}
    >
      <>{children}</>
    </GlobalContext.Provider>
  );
};
