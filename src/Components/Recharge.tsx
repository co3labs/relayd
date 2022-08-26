import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useContext } from 'react';
import { classNames, GlobalContext } from '../context/GlobalState';

export default function Recharge() {
  const { showRechargeModal, setShowRechargeModal } = useContext(GlobalContext);

  const tabs = ['Fiat', 'Crypto'];

  return showRechargeModal ? (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="w-full flex justify-end">
            <button  onClick={()=>{setShowRechargeModal(false)}}>
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
          <Tab.Group>
            <Tab.List>
              {tabs.map((tab) => (
                <Tab
                  className={({ selected }) =>
                    classNames(selected ? 'bg-gray-200' : 'bg-opacity-0', 'px-4 py-2 rounded-sm focus:border-gray-400')
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="my-4">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Card Details</legend>
                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="card-number" className="sr-only">
                          Card number
                        </label>
                        <input
                          type="text"
                          name="card-number"
                          id="card-number"
                          className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
                            className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
                            className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="mt-6 bg-white">
                    <legend className="block text-sm font-medium text-gray-700">Billing address</legend>
                    <div className="mt-1 rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="country" className="sr-only">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                        >
                          <option>USA</option>
                          <option>Canada</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="postal-code" className="sr-only">
                          Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          className="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none rounded-b-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {' '}
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
