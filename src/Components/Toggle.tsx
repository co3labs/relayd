import { Bars2Icon } from '@heroicons/react/24/outline';
import { classNames } from '../context/GlobalState';

export default function Toggle({ onClick, enabled }: { onClick: () => any; enabled: boolean }) {
  return (
    <button onClick={onClick} className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
      <div
        className={classNames(
          enabled ? 'bg-green-300' : 'bg-red-400',
          'transition-colors duration-150 w-10 h-4 relative rounded-full'
        )}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div
            className={classNames(
              enabled ? 'translate-x-full' : 'translate-x-0',
              'absolute top-2px left-2px right-1/2 bottom-2px bg-gray-50 rounded-full',
              'transition-transform duration-150 flex justify-center items-center'
            )}
          >
            <Bars2Icon className="h-2 rotate-90 text-gray-300" />
          </div>
        </div>
      </div>
    </button>
  );
}
