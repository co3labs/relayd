import { ArrowTopRightOnSquareIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IPoolItem } from '../@types/types';
import { classNames, getShortId, GlobalContext } from '../context/GlobalState';

export default function AllPoolListItem({ pool, index }: { pool: IPoolItem; index: number }) {
  const { setCurrentPool } = useContext(GlobalContext);

  return (
    <li className="w-full" key={pool.name}>
      <Link
        to={`${pool.address}`}
        onClick={() => {
          setCurrentPool(index);
        }}
        className="block hover:bg-gray-50"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">{pool.name}</p>
            <div className="ml-2 flex-shrink-0 flex">
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {pool.balance}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                {getShortId(pool.address)}
                <ArrowTopRightOnSquareIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
