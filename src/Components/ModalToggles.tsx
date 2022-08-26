import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { classNames, GlobalContext } from '../context/GlobalState';

export default function ModalToggles() {
  const { showRechargeModal, setShowRechargeModal } = useContext(GlobalContext);

  const modals = [
    {
      name: 'recharge',
      onClick: () => {
        setShowRechargeModal(true);
      },
    },
  ];

  return (
    <div className="flex mx-4">
      {modals.map((item) => (
        <button
          onClick={item.onClick}
          className={classNames(
            'rounded hover:bg-white hover:bg-opacity-20 p-2',
            'capitalize text-gray-400 flex flex-col items-center',
            'hover:text-white text-2xs '
          )}
        >
          <ArrowPathIcon className="w-6 h-6" />
          {item.name}
        </button>
      ))}
    </div>
  );
}
