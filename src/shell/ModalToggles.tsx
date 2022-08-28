import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon, ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { classNames, GlobalContext } from '../context/GlobalState';

export default function ModalToggles() {
  const { setModalOpen } = useContext(GlobalContext);

  const modals = [
    {
      name: 'recharge',
      onClick: () => {
        setModalOpen('recharge');
      },
      icon: ArrowPathIcon,
    },
    {
      name: 'withdraw',
      onClick: () => {
        setModalOpen('withdraw');
      },
      icon: ArrowUpOnSquareStackIcon,
    },
  ];

  return (
    <div className="flex mx-4 items-center">
      {modals.map((item, index) => (
        <>
          <button
            onClick={item.onClick}
            className={classNames(
              'rounded hover:bg-white hover:bg-opacity-20 p-2',
              'capitalize text-gray-400 flex flex-col items-center',
              'hover:text-white text-2xs '
            )}
          >
            {<item.icon className="w-6 h-6" />}
            {item.name}
          </button>
          {modals[index + 1] ? <div className="w-px h-10 bg-gray-600 mx-1" /> : <></>}
        </>
      ))}
    </div>
  );
}
