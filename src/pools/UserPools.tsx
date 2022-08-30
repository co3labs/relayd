import { Disclosure } from '@headlessui/react';
import { useContext } from 'react';
import { IPoolItem, ITxTotals } from '../@types/types';
import { classNames, GlobalContext } from '../context/GlobalState';
import PoolListContainer from '../Components/ListContainer';
import UserPoolsItem from './UserPoolsItem';
import { MoonLoader } from 'react-spinners';

export default function UserPools({ loadingTotals, totals }: { loadingTotals: boolean; totals: ITxTotals[] }) {
  const { userPools } = useContext(GlobalContext);
  return (
    <>
      {userPools.length === 0 ? (
        <div className="flex mt-24 w-full items-center justify-center">
          <MoonLoader size={48} speedMultiplier={0.7} />
        </div>
      ) : (
        <PoolListContainer>
          {userPools?.map((pool, index) => (
            <>
              {/* <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    'flex w-full justify-between px-4 py-2 text-left text-sm font-medium',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500',
                    'focus-visible:ring-opacity-75'
                  )}
                > */}

              <UserPoolsItem
                loadingTotals={loadingTotals}
                totals={totals}
                key={'user_pool_' + index}
                pool={pool}
                index={index}
              />
              {/* </Disclosure.Button>
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
          </Disclosure>*/}
            </>
          ))}
        </PoolListContainer>
      )}
    </>
  );
}
