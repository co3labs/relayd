import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ABIFunc, FuncInput } from '../@types/types';
import { classNames } from '../context/GlobalState';
import { getFunctionNames, getUsableFunctions, parseABI } from '../util/abi-parse-utils';
import validator from 'is-my-json-valid';

export default function Createpolicy() {
  const [selectedFunction, setSelectedFunction] = useState<number>(0);
  const [usableFuncitons, setUsableFunctions] = useState<ABIFunc[]>();
  const [defineRules, setSkipParams] = useState<boolean>(false);
  const [abi, setAbi] = useState<ABIFunc[]>();
  const [abiInput, setAbiInput] = useState<string>();
  const [invalidAbi, setInvalidAbi] = useState(false);

  return (
    <form
      action=""
      className="bg-gray-50 p-6 rounded-md mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        //   onSubmit(e);
      }}
    >
      <div className="rounded-md ">
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
                value={abiInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setAbiInput(value);
                  try {
                    const parsedAbi = parseABI(value);
                    setAbi(parsedAbi);
                    if (value.length > 0) {
                      const isValid = validator(parsedAbi);
                      if (!isValid) setInvalidAbi(true);
                    }
                    if (invalidAbi) setInvalidAbi(false);

                    const functions = getUsableFunctions(parsedAbi);
                    setUsableFunctions(functions);
                    console.log(functions);
                  } catch (error) {
                    setInvalidAbi(true);
                  }
                }}
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
                      console.log(e.target.value);
                      setSelectedFunction(Number(e.target.value));
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md "
                  >
                    <option selected={invalidAbi} disabled>
                      Select a Function
                    </option>
                    {!abi ? <></> : getFunctionNames(abi).map((name, index) => <option value={index}>{name}</option>)}
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
              <div className="flex flex-col">
                <span className="text-sm font-medium mr-12">Parameters</span>
                {defineRules && usableFuncitons ? (
                  <>
                    {usableFuncitons[selectedFunction]?.inputs.map((param: FuncInput, index: number) => {
                      if (param.type.includes('int')) {
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
                      } else if (param.type === 'bool') {
                        return <div className="px-4 grid grid-cols-3 mt-4">
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
                              <option selected value="true">
                                true
                              </option>
                              <option value="false">false</option>
                            </select>
                          </div>
                        </div>;
                      } else {
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
                  </>
                ) : (
                  <div className="text-center border-gray-400 text-gray-400 p-4 flex-grow">
                    <p>All Transactions Incentivized</p>{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        <div className="py-6">
          <button
            type="submit"
            className="py-4 px-12 text-gray-600 shadow-sm border-transparent rounded border bg-gray-100 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-800"
          >
            Create Policy
          </button>{' '}
        </div>
      </div>
    </form>
  );
}
