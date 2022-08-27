import { Disclosure } from '@headlessui/react';
import { useContext } from 'react';
import { IPoolItem } from '../@types/types';
import { classNames, GlobalContext } from '../context/GlobalState';
import AllPoolListItem from './AllPoolListItem';
import PoolListContainer from './PoolListContainer';
import UserPoolListItem from './UserPoolListItem';

export default function AllPoolList() {
  const {allPools} = useContext(GlobalContext)
  return (
    <PoolListContainer>
      {allPools.map((pool) => (
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
                  <AllPoolListItem pool={pool} />
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
    </PoolListContainer>
  );
}