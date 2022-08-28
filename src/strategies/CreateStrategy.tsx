import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IContractFunction, IFunctionParam } from '../@types/types';
import Toggle from '../Components/Toggle';
import { classNames } from '../context/GlobalState';
const steps = [
  { name: 'Specify Contract', status: 'current', href: '#', id: 1 },
  { name: 'Select Function', status: 'incomplete', href: '#', id: 2 },
  { name: 'Define Conditionals', status: 'incomplete', href: '#', id: 3 },
];

const functions: IContractFunction[] = [
  {
    name: 'exit_swap',
    params: [
      { name: 'address', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
  },
  {
    name: 'join_swap',
    params: [
      { name: 'address', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
  },
  {
    name: 'transfer',
    params: [
      { name: 'address', type: 'string' },
      { name: 'amount', type: 'uint256' },
    ],
  },
];

export default function CreateStrategy() {
  const [selectedFunction, setSelectedFunction] = useState<IContractFunction>();
  const [skipParams, setSkipParams] = useState<boolean>(true);
  return (
    <form
      action=""
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        //   onSubmit(e);
      }}
    >
      <div className="p-4 rounded-md ">
        <div className="rounded-md">
          <label htmlFor="address" className="block text-sm font-medium text-black">
            Name
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="new-strategy-name"
              id="new-strategy-name"
              //   border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500
              className="block w-full placeholder:text-gray-400 bg-white text-black py-4 pr-10  sm:text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 border border-gray-300"
              placeholder="1K Incentive"
              defaultValue=""
              aria-invalid="true"
              aria-describedby="email-error"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-2 text-sm text-red-600" id="email-error">
            Your password must be less than 4 characters.
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="about" className="block text-sm font-medium text-black my-2 sm:pt-2 ">
            Description
          </label>
          <div className=" sm:mt-0 sm:col-span-2 w-full">
            <textarea
              id="deploy_contract_abi"
              name="deploy_contract_abi"
              rows={4}
              className="shadow-sm block w-full placeholder:text-gray-400 bg-white text-black  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue={''}
              placeholder="ABI / JSON Inteface"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="about" className="block text-sm font-medium text-black my-2 sm:pt-2 ">
            Contract ABI
          </label>
          <div className=" sm:mt-0 sm:col-span-2 w-full">
            <textarea
              id="deploy_contract_abi"
              name="deploy_contract_abi"
              rows={10}
              className="shadow-sm block w-full placeholder:text-gray-400 bg-white text-gray-900  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue={''}
              placeholder="ABI / JSON Inteface"
            />
          </div>
        </div>
      </div>
      <div className="px-4 flex justify-around flex-col w-full lg:flex-row">
        <div className="flex flex-col max-w-[15rem]">
          <div>
            <label htmlFor="functions" className="block text-sm font-medium text-gray-900">
              Incentive Function
            </label>
            <select
              id="functions"
              name="functions"
              onChange={(e) => {
                console.log(functions[Number(e.target.value)]);
                setSelectedFunction(functions[Number(e.target.value)]);
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md "
            >
              <option selected disabled>
                Select a Function
              </option>
              {functions.map(({ name }, index) => (
                <option value={index}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col text-gray-900 mt-6 lg:mt-0 max-w-[15rem]">
          <div className="flex flex-row w-full justify-between mb-3">
            <span className="text-sm font-medium mr-12">Parameters</span>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="skip-params"
                  aria-describedby="comments-description"
                  name="skip-params"
                  type="checkbox"
                  checked={skipParams}
                  onChange={() => {
                    setSkipParams(!skipParams);
                  }}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Skip
                </label>
                {/* <span id="comments-description" className="text-gray-500">
              <span className="sr-only">New comments </span>so you always know what's happening.
            </span> */}
              </div>
            </div>
          </div>
          {selectedFunction?.params.map((param: IFunctionParam, index: number) => {
            switch (param.type) {
              case 'uint256':
                return (
                  <div>
                    <label
                      htmlFor={`param-input-${param.name}-${index}`}
                      className={classNames(
                        skipParams ? 'text-gray-200' : ' text-gray-500',
                        'block text-sm font-medium'
                      )}
                    >
                      {param.name}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        disabled={skipParams}
                        name={`param-input-${param.name}-${index}`}
                        id={`param-input-${param.name}-${index}`}
                        className={classNames(
                          skipParams ? 'border-gray-200' : ' border-gray-300 ',
                          'focus:ring-indigo-500 focus:border-indigo-500 block',
                          'w-full pl-7 pr-12 sm:text-sm rounded-md disabled:cursor-not-allowed'
                        )}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="incentive-conditional" className="sr-only">
                          incentive conditional
                        </label>
                        <select
                          id="incentive-conditional"
                          name="incentive-conditional"
                          className={classNames(
                            skipParams ? 'text-gray-200' : 'text-gray-500 ',
                            'focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7',
                            'border-transparent bg-transparent sm:text-sm rounded-md w-16'
                          )}
                        >
                          <option selected>{'>'}</option>
                          <option>{'<'}</option>
                          <option>{'='}</option>
                          <option>{'≥'}</option>
                          <option>{'≤'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              default:
                return (
                  <div>
                    <label
                      htmlFor={`param-input-${param.name}-${index}`}
                      className={classNames(
                        skipParams ? 'text-gray-200' : ' text-gray-500',
                        'block text-sm font-medium'
                      )}
                    >
                      {param.name}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        disabled={skipParams}
                        name={`param-input-${param.name}-${index}`}
                        id={`param-input-${param.name}-${index}`}
                        className={classNames(
                          skipParams ? 'border-gray-200' : ' border-gray-300 ',
                          'focus:ring-indigo-500 focus:border-indigo-500 block',
                          'w-full pl-7 pr-12 sm:text-sm rounded-md disabled:cursor-not-allowed'
                        )}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="incentive-conditional" className="sr-only">
                          Incentive conditional
                        </label>
                        <select
                          id="incentive-conditional"
                          name="incentive-conditional"
                          className={classNames(
                            skipParams ? 'text-gray-200' : 'text-gray-500 ',
                            'focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent sm:text-sm rounded-md w-16'
                          )}
                        >
                          <option selected>=</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
            }
          })}
        </div>
      </div>

      <div className="mt-8 w-full flex flex-col items-center">
        <div className="py-6">
          <button
            type="submit"
            className="py-4 px-12 text-gray-400 hover:text-gray-800 rounded border hover:border-gray-400 border-gray-600"
          >
            Create Strategy
          </button>{' '}
        </div>
      </div>
    </form>
  );
}
