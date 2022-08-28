import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IContractFunction, IFunctionParam } from '../@types/types';
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

export default function Createpolicy() {
  const [selectedFunction, setSelectedFunction] = useState<IContractFunction>();
  const [defineRules, setSkipParams] = useState<boolean>(false);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        //   onSubmit(e);
      }}
    >
      <div className="p-4 rounded-md ">
        <fieldset className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
          {' '}
          <legend className="sr-only">policy details</legend>
          <div className="rounded-md">
            <label htmlFor="address" className="block text-sm font-medium text-black">
              Name
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                name="new-policy-name"
                id="new-policy-name"
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
            <label htmlFor="about" className="block text-sm font-medium text-black mb-1 pt-2 lg:pt-0">
              Description
            </label>
            <div className="sm:mt-0 sm:col-span-2 w-full">
              <textarea
                id=""
                name="deploy_contract_abi"
                rows={0}
                className="shadow-sm block w-full placeholder:text-gray-400 bg-white text-black  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
                placeholder=""
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col">
            <label htmlFor="about" className="block text-sm font-medium text-black mb-2 ">
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
          <div className="flex flex-col">
            <p className="mb-1 font-medium ">Policy</p>
            <div className="p-4 flex flex-grow flex-col w-full bg-white  border border-gray-300 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col max-w-[15rem] mr-2">
                    <label htmlFor="functions" className="sr-only">
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
                <div className="flex flex-col  text-gray-900 mt-6 lg:mt-0 max-w-[15rem]">
                  <div className="flex flex-row w-full justify-between mb-3">
                    <div className="flex items-center h-5">
                      <input
                        id="define-params"
                        aria-describedby="comments-description"
                        name="define-params"
                        type="checkbox"
                        checked={defineRules}
                        onChange={() => {
                          setSkipParams(!defineRules);
                        }}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />{' '}
                      <div className="ml-3 text-sm">
                        <label htmlFor="define-params" className="font-medium text-gray-700 w-max">
                          Define rules on parameters
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium mr-12">Parameters</span>

                {selectedFunction?.params.map((param: IFunctionParam, index: number) => {
                  switch (param.type) {
                    case 'uint256':
                      return (
                        <div className="px-4 grid grid-cols-3 mt-4">
                          <label
                            htmlFor={`param-input-${param.name}-${index}`}
                            className={classNames(
                              !defineRules ? 'text-gray-200' : ' text-gray-500',
                              'block text-sm font-medium '
                            )}
                          >
                            {param.name}
                          </label>
                          <div className="flex items-center">
                            <label htmlFor="incentive-conditional" className="sr-only">
                              incentive conditional
                            </label>
                            <select
                              id="incentive-conditional"
                              name="incentive-conditional"
                              className={classNames(
                                !defineRules ? 'text-gray-200' : 'text-gray-900',
                                'focus:ring-indigo-500 focus:border-indigo-500  border-gray-300 h-full p-2 pr-7 mx-4',
                                ' sm:text-sm rounded-md w-16'
                              )}
                            >
                              <option selected>{'>'}</option>
                              <option>{'<'}</option>
                              <option>{'='}</option>
                              <option>{'≥'}</option>
                              <option>{'≤'}</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="0.00"
                            disabled={!defineRules}
                            name={`param-input-${param.name}-${index}`}
                            id={`param-input-${param.name}-${index}`}
                            className={classNames(
                              !defineRules ? 'border-gray-200 text-gray-200' : ' border-gray-300 ',
                              'focus:ring-indigo-500 focus:border-indigo-500 block',
                              'w-full pl-7 pr-12 sm:text-sm rounded-md disabled:cursor-not-allowed'
                            )}
                          />
                        </div>
                      );
                    default:
                      return (
                        <div className="px-4 grid grid-cols-3 mt-4">
                          <label
                            htmlFor={`param-input-${param.name}-${index}`}
                            className={classNames(
                              !defineRules ? 'text-gray-200' : ' text-gray-500',
                              'block text-sm font-medium'
                            )}
                          >
                            {param.name}
                          </label>
                          <div className="mx-4">=</div>
                          <input
                            type="text"
                            placeholder="0x0"
                            disabled={!defineRules}
                            name={`param-input-${param.name}-${index}`}
                            id={`param-input-${param.name}-${index}`}
                            className={classNames(
                              !defineRules ? 'border-gray-200 text-gray-200' : ' border-gray-300 ',
                              'focus:ring-indigo-500 focus:border-indigo-500 block',
                              'w-full pl-7 pr-12 sm:text-sm rounded-md disabled:cursor-not-allowed max-w-xs'
                            )}
                          />
                        </div>
                      );
                  }
                })}
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-8 w-full flex flex-col items-center">
        <div className="py-6">
          <button
            type="submit"
            className="py-4 px-12 text-gray-400 hover:text-gray-800 rounded border hover:border-indigo-600 border-indigo-400"
          >
            Create policy
          </button>{' '}
        </div>
      </div>
    </form>
  );
}
