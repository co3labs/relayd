import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { classNames } from '../context/GlobalState';
export default function CreatePoolForm() {
  const strategies = ['No Strategy', 'Strategy A', 'Strategy B', 'Strategy C'];
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);

  interface INewPoolInfo {
    name: string;
    tags: string[];
    contract: string;
    description: string;
    strategy: string;
    amount: string;
    beneficiaries: string[];
  }

  const [formInfo, setFormInfo] = useState<INewPoolInfo>({
    name: '',
    tags: [],
    contract: '',
    description: '',
    strategy: '',
    amount: '',
    beneficiaries: [],
  });

  const LableWDesc = ({ name, description, required }: { name: string; description: string; required?: boolean }) => (
    <div className="block text-gray-700">
      <label htmlFor={name} className="capitalize text-sm font-medium  sm:pt-2 ">
        {name} {required ? <RedAstrisq /> : <></>}
      </label>
      <p className="text-gray-400 text-xs font-regular">{description}</p>
    </div>
  );

  const RedAstrisq = () => <span className="text-red-400 ml-[2px]">*</span>;
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-8 divide-y divide-gray-200 my-6 bg-gray-50 p-4 rounded-lg max-w-5xl mx-auto"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">New Pool</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be used to create a new pool.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="pool-name" className="block text-sm font-medium text-gray-800  sm:pt-2 ">
                  Name <RedAstrisq />
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-sm xl:col-span-1 rounded-md shadow-sm ">
                  {' '}
                  <input
                    type="text"
                    name="pool-name"
                    id="poo-name"
                    autoComplete="none"
                    placeholder="my new pool"
                    required
                    className="shadow-sm placeholder:text-gray-300  focus:ring-gray-500 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start lg:border-t lg:border-gray-200 lg:pt-5">
                <LableWDesc
                  name="target"
                  description="The target is the contract the pool is associated with. Transactions facilitated by the target are incentivized"
                  required={true}
                />
                <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-md rounded-md shadow-sm ">
                  {' '}
                  <input
                    type="text"
                    name="target"
                    placeholder="0x0"
                    id="target"
                    required
                    className="shadow-sm placeholder:text-gray-300  focus:ring-gray-500 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:items-start lg:border-t lg:border-gray-200 lg:pt-5">
                <LableWDesc
                  name="strategy"
                  description="This is the strategy defining incentivized transactions. The strategy must conform with the contract ABI."
                />
                <div className="mt-1">
                  <select
                    id="strategy"
                    name="strategy"
                    className={classNames(
                      'shadow-sm text-gray-800 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md '
                    )}
                  >
                    {strategies.map((strategy) => (
                      <option>{strategy}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="recharge-lukso-amt" className="text-sm font-medium text-gray-800  sm:pt-2 ">
                  Amount
                </label>

                <div className="relative rounded-md shadow-sm mt-1 sm:mt-0 sm:col-span-2 max-w-sm xl:col-span-1">
                  <input
                    type="text"
                    name="deposit-lukso-amt"
                    id="deposit-lukso-amt"
                    className="text-gray-800 placeholder:text-gray-300 py-2 focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-md focus:z-10 sm:text-sm border-gray-300"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-8000 sm:text-sm" id="price-currency">
                      LYXt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="new-pool-description" className="block text-sm font-medium text-gray-800 sm:pt-2 ">
            Description
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-md rounded-md shadow-sm ">
            <textarea
              id="new-pool-description"
              name="new-pool-description"
              rows={3}
              className="shadow-sm block w-full  text-gray-800  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue={''}
              placeholder=""
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-800 sm:pt-2">
            Tags
          </label>

          <div className="flex items-center shadow-sm bg-white focus:ring-gray-500 border focus:border-gray-500 w-full sm:text-sm border-gray-300 rounded-md mt-1 sm:mt-0 sm:col-span-2 max-w-sm xl:col-span-1">
            <div className="flex items-center mx-2">
              {formInfo.tags.map((tag, index) => (
                <div className="flex item-center rounded-sm p-1 bg-blue-200">
                  <span className="">{tag}</span>
                  <button
                    className="mx-1"
                    onClick={() => {
                      const tags = [...formInfo.tags];
                      tags.splice(index, 1);
                      setFormInfo({ ...formInfo, tags });
                    }}
                  >
                    <XCircleIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <input
              className="border-none focus:border-none"
              tabIndex={-1}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (formInfo.tags.length === 5) return;
                console.log('Key down', e.key);
                const key = e.key;
                if (key === 'Enter') {
                  //@ts-ignore
                  const value = e.target.value;
                  const tags = [...formInfo.tags];
                  tags.push(value);
                  console.log('Setting tags', tags);
                  setFormInfo({ ...formInfo, tags });
                }
              }}
              type="text"
              name="tags"
              id="tags"
            />
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <LableWDesc
            name="beneficiaries"
            description="Addresses defined here determine who will benefit from incentives. Omitting will allow any account to benefit."
          />

          <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-md">
            <button
              type="button"
              className="px-3 py-1 mb-2 rounded-sm bg-blue-400 text-white text-sm shadow-sm "
              onClick={() => {
                setFormInfo({ ...formInfo, beneficiaries: [...formInfo.beneficiaries, ''] });
              }}
            >
              + Add
            </button>
            <div className="max-h-96 overflow-y-scroll">
              {formInfo.beneficiaries.map((item: string, index) => (
                <div className="flex shadow-sm my-2 items-center bg-white ext-gray-800  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md">
                  <input
                    id="beneficiaries"
                    name="beneficiaries"
                    className="block w-full p-2 bg-transparent placeholder:text-gray-300"
                    defaultValue={''}
                    placeholder="0x0"
                  />
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => {
                      const beneficiaries = [...formInfo.beneficiaries];
                      beneficiaries.splice(index, 1);
                      setFormInfo({ ...formInfo, beneficiaries });
                    }}
                  >
                    <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-6">
          <button
            type="submit"
            className="py-4 px-12 text-gray-400 hover:text-gray-800 rounded border hover:border-gray-400 border-gray-600"
          >
            Create Pool
          </button>{' '}
        </div>
      </form>
    </>
  );
}
