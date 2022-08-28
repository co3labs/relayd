import placeholder from '../assets/placeholder.jpg';
import { getShortId } from '../context/GlobalState';
export default function ProfileData() {
  const UPdata = {
    address: '0xD3d24669912914720d97AC7fD95a5E74858ae7fB',
    name: 'Hashmesh Universal Profile',
    image: '',
    description: 'Universal Profile for Hashmesh assets.',
  };

  return (
    <div className="px-4 max-h-48 h-full rounded-lg my-2">
      <div className="h-full bg-user bg-contain rounded-lg ">
        <div className="h-full flex flex-col rounded-lg  text-white py-3 justify-between px-2 bg-opacity-75 bg-black">
          <div className="w-full">
            <p className="mb-1">{UPdata.name}</p>
            <p className="text-xs font-medium text-gray-400">
              {'('}
              {getShortId(UPdata.address)}
              {')'}
            </p>
          </div>
          <div className="">
            <p className="text-sm">Available Balance</p>
            <p className='text-green-500'>467 LYXt</p>
          </div>
          <p className="text-xs text-gray-300">{UPdata.description}</p>
        </div>
      </div>
    </div>
  );
}
