import { Tab, Transition } from '@headlessui/react';
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEventHandler, FormEvent, FormEventHandler, Fragment, useContext, useState } from 'react';
import { classNames, getShortId, GlobalContext } from '../context/GlobalState';
import FocusModalContainer from './FocusModalContainer';

export default function Recharge() {
  const { modalOpen, setModalOpen } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState('');
  const tabs = ['Fiat', 'Crypto'];
  const pools = [
    { name: 'Pool A', address: '0x01' },
    { name: 'Pool B', address: '0x02' },
    { name: 'Pool C', address: '0x03' },
  ];

  function fiatRechargeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function cryptoRechargeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return modalOpen === "withdrawal" ? (
    // <Transition
    // show={showRechargeModal}
    // enter="transition duration-100 ease-out"
    // enterFrom="transform scale-95 opacity-0"
    // enterTo="transform scale-100 opacity-100"
    // leave="transition duration-75 ease-out"
    // leaveFrom="transform scale-100 opacity-100"
    // leaveTo="transform scale-95 opacity-0"
    // >
    <FocusModalContainer>
      <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-400">
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setModalOpen(null);
            }}
          >
            <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
        <Tab.Group>
          <Tab.List>
            {tabs.map((tab) => (
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected ? 'bg-gray-700 text-white' : 'bg-opacity-0 text-gray-400',
                    'px-4 py-2  hover:text-white rounded-sm focus:border-gray-400'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <form className="my-4" onSubmit={fiatRechargeHandler}>
                <fieldset>
                  <legend className="block text-sm font-medium text-white">Card Details</legend>
                  <div className="mt-1 bg-gray-800 rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="card-number" className="sr-only">
                        Card number
                      </label>
                      <input
                        type="text"
                        name="card-number"
                        id="card-number"
                        className="focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="Card number"
                      />
                    </div>
                    <div className="flex -space-x-px">
                      <div className="w-1/2 flex-1 min-w-0">
                        <label htmlFor="card-expiration-date" className="sr-only">
                          Expiration date
                        </label>
                        <input
                          type="text"
                          name="card-expiration-date"
                          id="card-expiration-date"
                          className="focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="card-cvc" className="sr-only">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="card-cvc"
                          id="card-cvc"
                          className="focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="block text-sm font-medium text-white">Recharge Amount</legend>
                  <div>
                    <label htmlFor="recharge-fiat-amt" className="sr-only text-white">
                      Fiat Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="recharge-fiat-amt"
                        id="recharge-fiat-amt"
                        className="text-white mt-1 focus:ring-gray-500 focus:border-gray-500 pl-7 pr-12 relative block w-full rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className="focus:ring-gray-500 focus:border-gray-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        >
                          <option>USD</option>
                          <option>CAD</option>
                          <option>EUR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="recharge-lukso-amt" className="sr-only text-white">
                      Lusko Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="recharge-lukso-amt"
                        id="recharge-lukso-amt"
                        className="text-white focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-b-md bg-transparent focus:z-10 sm:text-sm border-gray-300 border-t-0 focus:border-t"
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
                </fieldset>
                <fieldset className="mt-6 ">
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
                            <option
                              id={pool.name}
                              value={pool.address}
                              onClick={() => setSelectedAddress(pool.address)}
                            >
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
                      <div className="flex items-center p-2 border-t border-x-0 border-b-0 border-gray-600 ">
                        <p
                          id="pool-address"
                          className="text-gray-50 font-medium w-fit text-sm mt-1 bg-transparent border-none focus:border-transparent"
                        >
                          {' '}
                          {selectedAddress ? getShortId(selectedAddress) : 'No pool selected.'}
                        </p>
                        {selectedAddress ? (
                          <button>
                            <ClipboardIcon className="w-4 h-4 text-gray-50 ml-3" />
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <legend className="block text-sm font-medium text-white">Billing address</legend>
                  <div className="mt-1 rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="text-white focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                      >
                        <option>USA</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="postal-code" className="sr-only text-white">
                        Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        className="text-white focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        placeholder="Postal code"
                      />
                    </div>
                  </div> */}
                </fieldset>

                <button
                  className="text-sm font-medium mt-6 text-gray-400 hover:text-white w-full py-1 rounded-md bg-transparent border border-gray-400 hover:border-white hover:bg-gray-700"
                  type="submit"
                >
                  Recharge
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel>
              {' '}
              <form className="space-y-6 py-6" onSubmit={cryptoRechargeHandler}>
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
                <p className="text-gray-400 font-light">
                  Send funds the specified amount of funds to this address then click the button below.
                </p>
                <button
                  className="text-sm font-medium mt-6 text-gray-400 hover:text-white w-full py-1 rounded-md bg-transparent border border-gray-400 hover:border-white hover:bg-gray-700"
                  type="submit"
                >
                  Funds have been sent
                </button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </FocusModalContainer>
  ) : (
    // </Transition>
    <></>
  );
}
