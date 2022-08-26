import { Tab, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEventHandler, FormEvent, FormEventHandler, Fragment, useContext } from 'react';
import { classNames, GlobalContext } from '../context/GlobalState';

export default function Recharge() {
  const { showRechargeModal, setShowRechargeModal } = useContext(GlobalContext);

  const tabs = ['Fiat', 'Crypto'];

  function fiatRechargeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function cryptoRechargeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return showRechargeModal ? (
    // <Transition
    // show={showRechargeModal}
    // enter="transition duration-100 ease-out"
    // enterFrom="transform scale-95 opacity-0"
    // enterTo="transform scale-100 opacity-100"
    // leave="transition duration-75 ease-out"
    // leaveFrom="transform scale-100 opacity-100"
    // leaveTo="transform scale-95 opacity-0"
    // >
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-400">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setShowRechargeModal(false);
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
                  <fieldset className="mt-6 ">
                    <legend className="block text-sm font-medium text-white">Billing address</legend>
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

                  <button
                    className="text-sm font-medium mt-6 text-gray-400 hover:text-white w-full py-1 rounded-md bg-transparent border border-gray-400 hover:border-white hover:bg-gray-700"
                    type="submit"
                  >
                    Recharge
                  </button>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  ) : (
    // </Transition>
    <></>
  );
}
