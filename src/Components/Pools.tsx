import { Disclosure, Listbox, Tab, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { IPoolItem } from '../@types/types';
import { classNames, getShortId } from '../context/GlobalState';
import PoolItem from './PoolItem';

export default function Pools() {
  const strategies = ['No Strategy', 'Strategy A', 'Strategy B', 'Strategy C'];
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const existingPools: IPoolItem[] = [
    {
      group: 'DataX',
      name: '1K promotion',
      description: 'Swaps for over 1K on DataX',
      address: '0x0',
      balance: '800 LYXt',
    },
    {
      group: 'Relayd',
      name: '1st contract deployment',
      description: 'First Contract deployment using Relayd',
      address: '0x0',
      balance: '800 LYXt',
    },
    {
      group: 'DataX',
      name: 'lucky winner promotion',
      description: '1 in 10 transactions',
      address: '0x0',
      balance: '800 LYXt',
    },
    {
      group: 'Guardians',
      name: 'First five vaults',
      description: 'First 5 vaults on Guardians',
      address: '0x0',
      balance: '800 LYXt',
    },
  ];

  const tabs = ['Existing Pools', 'Create a New Pool'];
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto mb-4">
        <h1 className="text-2xl font-semibold text-white">Pools</h1>
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
            <div className="max-w-2xl mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {existingPools.map((pool) => (
                    <>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                'flex w-full justify-between px-4 py-2 text-left text-sm font-medium',
                                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500',
                                'focus-visible:ring-opacity-75'
                              )}
                            >
                              <PoolItem pool={pool} />
                            </Disclosure.Button>
                            <Disclosure.Panel className="grid grid-cols-1 md:grid-cols-2 py-4 px-12 text-sm text-gray-500">
                              <div>
                                <p>Group</p>
                                <p>{pool.group}</p>
                              </div>{' '}
                              <div className="mt-6 md:mt-0 mr-6 max-w-sm">
                                <p>Description</p>
                                <p>{pool.description}</p>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="max-w-2xl "
            >
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-50">Pool Information</h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-50">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="shadow-sm bg-gray-800 focus:ring-gray-500 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-50">
                      Group
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="shadow-sm bg-gray-800 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="new-pool-description"
                      className="block text-sm font-medium text-gray-50 my-2 sm:pt-2 "
                    >
                      Description
                    </label>
                    <div className=" sm:mt-0 sm:col-span-2 w-full">
                      <textarea
                        id="new-pool-description"
                        name="new-pool-description"
                        rows={3}
                        className="shadow-sm block w-full bg-gray-800 text-white  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={''}
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 max-w-xs">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Strategy
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="shadow-sm bg-gray-800 text-gray-50 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {strategies.map((strategy) => (
                          <option>{strategy}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6 max-w-xs">
                    <label htmlFor="recharge-lukso-amt" className="text-sm font-medium text-gray-50">
                      Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="deposit-lukso-amt"
                        id="deposit-lukso-amt"
                        className="text-white py-2 focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
                </div>
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="py-4 px-12 bg-gray-800 text-gray-400 hover:text-white rounded border hover:border-gray-400 border-gray-600"
                >
                  Create Pool
                </button>{' '}
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
