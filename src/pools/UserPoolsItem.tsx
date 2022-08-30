import { ArrowTopRightOnSquareIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IPoolItem } from '../@types/types';
import Toggle from '../Components/Toggle';
import { classNames, getShortId, GlobalContext } from '../context/GlobalState';

export default function UserPoolsItem({ pool, index }: { pool: IPoolItem; index: number }) {
  const { setCurrentPool, userPools, setUserPools, editActiveState } = useContext(GlobalContext);
  const [active, setActive] = useState(pool.active);

  return (
    <li className="w-full" key={pool.name + '_' + index}>
      <Link
        to={`${pool.name}`}
        onClick={() => {
          setCurrentPool(pool);
        }}
        className="block hover:bg-gray-50"
      >
        <div className="px-4 py-4 sm:px-6 grid grid-cols-3">
          <div className="">
            <p className="text-sm font-medium text-indigo-600 truncate">{pool.name}</p>
            <div className="sm:flex">
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {pool.tags?.map((tag, index) => {
                  let color;

                  switch (index) {
                    case 0:
                      color = 'border-orange-500';
                      break;
                    case 1:
                      color = 'border-green-500';
                      break;
                    case 2:
                      color = 'border-blue-500';
                      break;
                    case 3:
                      color = 'border-red-500';
                      break;
                    default:
                      break;
                  }

                  return (
                    <span
                      key={'user_pool_tag_' + index}
                      className={`border ${color} shadow-sm mr-2 text-xs rounded-sm text-gray-800 font-medium px-2 py-1`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-500 flex flex-col items-center h-full justify-center">
            <div>
              <p>
                <span className="text-green-600">{pool.beneficiaries.length}</span> beneficiaries
              </p>
              <p>
                <span className="text-green-600">{'pool.txCount'}</span> transactions
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-end">
            <div className="ml-2 flex">
              <span className="text-gray-300 font-normal mr-2">Balance: </span>
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {pool.balance}
              </p>
            </div>
            <div className="mt-2">
              <Toggle
                enabled={active}
                onClick={() => {
                  editActiveState(setActive);
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
