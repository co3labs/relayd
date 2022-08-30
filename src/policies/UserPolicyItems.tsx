import { IPolicyItem } from '../@types/types';

export default function UserPolicyItem({ strategy, index }: { strategy: IPolicyItem; index: number }) {
  return (
    <li className="w-full" key={strategy.policy_name}>
      <div className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-between">
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex flex-col">
                <p className="text-sm font-medium text-indigo-600 truncate">{strategy.policy_name}</p>
                <p className="flex items-center text-sm text-gray-500 max-w-sm">{strategy.description}</p>
              </div>
            </div>
            <div className='flex flex-col w-full justify-end'>
              <p>Conditions: {strategy.conditions.length}</p>
            </div>
            <div className="ml-2 flex-shrink-0 flex flex-col items-end">
              <dt className="text-sm border-b mb-2">Contract Type</dt>
              <dd className="px-2 w-min inline-flex text-xs leading-5 font-semibold rounded-full border border-gray-400">
                {strategy.contract_name}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
