import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { IPoolItem } from '../@types/types';
import { classNames } from '../context/GlobalState';
import AllPoolList from './AllPoolList';
import CreatePoolForm from './CreatePoolForm';
import UserPoolList from './UserPoolList';

export default function Pools() {
  const existingPools: IPoolItem[] = [
    {
      group: 'DataX',
      name: '1K promotion',
      description: 'Swaps for over 1K on DataX',
      address: '0x01',
      balance: '800 LYXt',
    },
    {
      group: 'Relayd',
      name: '1st contract deployment',
      description: 'First Contract deployment using Relayd',
      address: '0x02',
      balance: '800 LYXt',
    },
    {
      group: 'DataX',
      name: 'lucky winner promotion',
      description: '1 in 10 transactions',
      address: '0x03',
      balance: '800 LYXt',
    },
    {
      group: 'Guardians',
      name: 'First five vaults',
      description: 'First 5 vaults on Guardians',
      address: '0x04',
      balance: '800 LYXt',
    },
  ];

  const tabs = ['My Pools', 'All Pools', 'Create a New Pool'];
  return (
    <div className="px-6 pt-6 flex flex-col max-h-full">
      <Tab.Group>
        <Tab.List className="pb-3 flex relative w-full first:rounded-l-full last:rounded-r-full">
          {tabs.map((tab) => (
            <Tab as={Fragment}>
              {({ selected }) => (
                <div className="relative">
                  <div
                    className={classNames(
                      selected ? 'bg-blue-800' : 'bg-gray-200',
                      'h-1 left-0 right-0  absolute bottom-0'
                    )}
                  />
                  <button
                    className={classNames(
                      selected ? ' text-gray-900' : 'bg-opacity-0 text-gray-400 hover:text-gray-800 ',
                      'px-4 py-2  rounded-sm focus:border-gray-400'
                    )}
                  >
                    {tab}
                  </button>
                </div>
              )}
            </Tab>
          ))}
          <div className="absolute top-full w-full h-6 bg-gradient-to-b from-gray-100 to-transparent " />
        </Tab.List>
        <div className="overflow-scroll flex-grow max-h-full  no-scrollbar">
          <Tab.Panels>
            <Tab.Panel>
              <UserPoolList pools={existingPools} />
            </Tab.Panel>
            <Tab.Panel>
              <AllPoolList pools={[...existingPools, ...existingPools, ...existingPools, ...existingPools]} />
            </Tab.Panel>
            <Tab.Panel>
              <CreatePoolForm />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
