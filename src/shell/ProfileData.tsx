import { useContext } from 'react';
import placeholder from '../assets/placeholder.jpg';
import { getShortId, GlobalContext } from '../context/GlobalState';
export default function ProfileData() {
  const { account } = useContext(GlobalContext);

  return (
    <div className="px-4 max-h-48 h-full rounded-lg my-2">
      <div className="h-full bg-user bg-contain rounded-lg ">
        <div className="h-full flex flex-col rounded-lg  text-white py-3 justify-between px-2 bg-opacity-75 bg-black">
          <div className="w-full">
            <p className="mb-1">
              {/* {' '}
              {'('} */}
              {getShortId(account?.address || '')}
              {/* {')'} */}
            </p>
            <p className="text-xs font-medium text-gray-400">{}</p>
          </div>
          <div className="">
            <p className="text-sm">Unallocated Balance</p>
            <p className="text-green-500">{account?.unallocated}</p>
          </div>{' '}
          <div className="">
            <p className="text-sm">Allocated Balance</p>
            <p className="text-green-500">{account?.allocated || 0}</p>
          </div>
          {/* <p className="text-xs text-gray-300">{account.description}</p> */}
        </div>
      </div>
    </div>
  );
}
