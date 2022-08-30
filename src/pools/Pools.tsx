import { Tab } from '@headlessui/react';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IPoolItem } from '../@types/types';
import { API_URL, classNames, GlobalContext } from '../context/GlobalState';
import AllPools from './AllPools';
import CreatePoolForm from './CreatePoolForm';
import UserPools from './UserPools';
import axios from 'axios';

export default function Pools() {
  const { userPools, allPools, setAllPools, setUserPools, accountAddress } = useContext(GlobalContext);
  const tabs = ['My Pools', 'All Pools', 'Create a New Pool'];
  const [tab, setTab] = useState(0);

  async function getAllPools() {
    const {
      data: { data },
    } = await axios.get(API_URL + 'pool');
    setAllPools(data);
  }

  async function getUserPools() {
    const {
      data: { data },
    } = await axios.get(API_URL + 'pool/account/' + accountAddress);
    setUserPools(data);
  }

  useEffect(() => {
    try {
      if (tab === 1 && allPools.length === 0) getAllPools();
      if (tab === 0 && userPools.length === 0) getUserPools();
    } catch (error) {
      console.error(error);
    }
  }, [tab]);

  return (
    <>
      <div className="px-6 pt-6 flex flex-col max-h-full">
        <Tab.Group selectedIndex={tab} onChange={setTab}>
          <Tab.List className="pb-3 flex relative w-full first:rounded-l-full last:rounded-r-full">
            {tabs.map((tab, index) => (
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div key={'pool_tab_' + index} className="relative">
                    <div
                      className={classNames(
                        selected ? 'bg-indigo-600' : 'bg-gray-200',
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
                <UserPools />
              </Tab.Panel>
              <Tab.Panel>
                <AllPools />
              </Tab.Panel>
              <Tab.Panel>
                <CreatePoolForm setTab={setTab} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
}
