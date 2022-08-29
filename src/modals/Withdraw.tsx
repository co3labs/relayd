import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FormEvent, useContext, useState } from 'react';
import { classNames, getShortId, GlobalContext } from '../context/GlobalState';
import FocusModalContainer from './FocusModalContainer';
import { Tab } from '@headlessui/react';

export default function Withdrawal() {
  const { modalOpen, setModalOpen } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState('');
  const tabs = ['Fiat', 'Crypto'];
  const pools = [
    { name: 'Pool A', address: '0x01' },
    { name: 'Pool B', address: '0x02' },
    { name: 'Pool C', address: '0x03' },
  ];
  function fiatWithdrawHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function crypotWithdrawHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return modalOpen === 'withdraw' ? (
    <FocusModalContainer>
      <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-400">
        <div className="w-full flex justify-between items-start">
          <h2 className="text-xl text-white mb-4">Withdraw LYXt</h2>
          <button
            onClick={() => {
              setModalOpen(null);
            }}
          >
            <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>{' '}
        <form className="space-y-6 py-6" onSubmit={crypotWithdrawHandler}>
          <div>
            <label htmlFor="recharge-lukso-amt " className="text-sm font-medium text-white">
              Lusko Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="recharge-lukso-amt"
                id="recharge-lukso-amt"
                className="text-white focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  LYXt
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <label htmlFor="country" className="block text-sm font-medium text-gray-50 mr-6">
                Pool
              </label>
              <div className="mt-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  className="shadow-sm bg-gray-800 text-gray-50 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {pools.map((pool) => (
                    <option id={pool.name} value={pool.address} onClick={() => setSelectedAddress(pool.address)}>
                      {pool.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="">
              <label htmlFor="pool-address" className="block text-sm font-medium text-gray-50 mr-6">
                Address
              </label>
              <input
                type="text"
                name="pool-address"
                id="pool-address"
                value={selectedAddress ? getShortId(selectedAddress) : 'No pool selected.'}
                readOnly
                className="text-gray-50 font-medium text-sm mt-1 bg-transparent border-t border-x-0 border-b-0 border-gray-600 focus:border-transparent pointer-events-none"
              />
            </div>
          </div>
          <button
            className="text-sm font-medium mt-6 text-gray-400 hover:text-white w-full py-1 rounded-md bg-transparent border border-gray-400 hover:border-white hover:bg-gray-700"
            type="submit"
          >
            Withdraw
          </button>
        </form>
      </div>
    </FocusModalContainer>
  ) : (
    <></>
  );
}
