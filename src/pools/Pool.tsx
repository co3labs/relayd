import { Tab } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Components/Toggle';
import { API_URL, blockExplorer, classNames, getShortId, GlobalContext } from '../context/GlobalState';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { IPoolTx } from '../@types/types';

export default function Pool() {
  const { currentPool, updateUserPools, web3, editActiveState, account } = useContext(GlobalContext);
  if (!currentPool) return <></>;
  const [active, setActive] = useState(currentPool.active);
  const [updatingBalance, setUpdatingBalance] = useState(false);
  const [addingBeneficiary, setAddingBeneficiary] = useState(false);
  const [transactions, setTransactions] = useState<IPoolTx[]>([]);
  const [gettingTxs, setGettingTxs] = useState(false);
  async function getTransactions() {
    if (!currentPool) return;
    setGettingTxs(true);
    try {
      const {
        data: { data },
      } = await axios.get(API_URL + 'transaction/pool/' + currentPool.id);
      console.log('Transaction data: ', data);
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setGettingTxs(false);
    }
  }

  useEffect(() => {
    console.log('Current Pool: ', currentPool);
    getTransactions();
  }, []);

  async function handleAddBeneficiary(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { beneficiary } = Object.fromEntries(formData);
    console.log('Adding ' + beneficiary + ' as a beneficiary');

    if (currentPool && web3?.utils.isAddress(beneficiary as string)) {
      setAddingBeneficiary(true);
      axios
        .put(API_URL + 'pool', {
          ...currentPool,
          beneficiaries: [beneficiary, ...currentPool.beneficiaries],
          policy: currentPool?._policy,
        })
        .then(() => {
          alert('Beneficiary sucessfully added.');
          updateUserPools(true, currentPool.id);
        })
        .catch((e) => {
          console.error(e);
          alert('Failed to add beneficiary.');
        })
        .finally(() => {
          setAddingBeneficiary(false);
        });
    }
  }

  async function handleBalanceChange(e: any) {
    e.preventDefault();
    setUpdatingBalance(true);
    if (!currentPool) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const { deposit, withdraw } = Object.fromEntries(formData);
    const balance = deposit ? currentPool?.balance + Number(deposit) : currentPool.balance - Number(withdraw);
    axios
      .put(API_URL + 'pool', { ...currentPool, balance: balance, policy: currentPool?._policy })
      .then(() => {
        alert('Balance succesfully updated.');
        if (currentPool) updateUserPools(true, currentPool.id);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update balance of the pool.');
      })
      .finally(() => setUpdatingBalance(false));
  }

  function getTxAMount() {
    let sum = 0;
    transactions.forEach((tx) => {
      sum += tx.amount;
    });
    return <>{sum}</>;
  }

  return (
    <div className="p-6 text-gray-800 flex flex-col">
      <nav className="flex my-1" aria-label="Breadcrumb">
        <Link
          to="/account/pools"
          className="border border-black rounded-sm px-2 py-1 flex items-center hover:bg-black hover:bg-opacity-10"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Back to Pools</span>
        </Link>
      </nav>
      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 w-full">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg ">
              <div className="w-full px-4 py-5 sm:px-6 flex justify-between border-b border-gray-200 ">
                <div className="">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    {currentPool.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{currentPool.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col justify-end items-end mr-2">
                    <Toggle
                      enabled={active}
                      onClick={() => {
                        editActiveState(setActive);
                      }}
                    />
                    <span className="mt-2 text-xs text-gray-400">{currentPool.active ? '(active)' : '(inactive)'}</span>
                  </div>
                </div>
              </div>
              <div className="m-4">
                {currentPool.tags?.map((tag, index) => {
                  let color;

                  switch (index) {
                    case 0:
                      color = 'border-orange-500';
                      break;
                    case 1:
                      color = 'border-green-500';
                      break;
                    case 2:
                      color = 'border-blue-500';
                      break;
                    case 3:
                      color = 'border-red-500';
                      break;
                    default:
                      break;
                  }

                  return (
                    <span
                      className={`border ${color} shadow-sm mx-2 text-sm rounded-sm text-gray-800 font-medium px-2 py-1`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Balance</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPool.balance}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Beneficiaries</dt>
                    <dd className="mt-1 text-sm text-gray-900">{currentPool.beneficiaries.length}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Transactions</dt>
                    <dd className="mt-1 text-sm text-gray-900">{transactions.length}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Gas Funded</dt>
                    <dd className="mt-1 text-sm text-gray-900">{getTxAMount()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <section aria-labelledby="transactions-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <div className="w-full flex justify-between items-center">
                <h2 id="transactions-title" className="text-lg font-medium text-gray-900 mb-4">
                  Funded Transactions
                </h2>
                {gettingTxs ? (
                  <div className="flex">
                    <MoonLoader size={24} />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* Activity Feed */}
              {transactions.length > 0 ? (
                <table className="table w-full text-left ">
                  <thead>
                    <tr>
                      <th className="font-normal">Id</th>
                      <th className="font-normal">Gas Used</th>
                      <th className="font-normal">Sender</th>
                      <th className="font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((item, index) => (
                      <tr key={item.id} className={classNames('even:bg-gray-100 text-gray-400 hover:text-gray-900')}>
                        <td className="py-2">{item.id}</td>
                        <td className="py-2 flex items-center">{item.amount}</td>
                        <td className="py-2">{item.sender}</td>
                        <td className="py-2">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <div className="w-full border text-gray-400 text-center border-gray-300 py-4">
                    There are no transactions for this pool yet.
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
        <div>
          {/*Deposit withdraw section */}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <Tab.Group>
                <Tab.List>
                  <div className="flex justify-between items-center">
                    <div>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected ? 'bg-indigo-100' : '',
                            'border-indigo-200 border-y border-l p-2 rounded-l-md text-sm mb-3'
                          )
                        }
                      >
                        Deposit
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected ? 'bg-indigo-100' : '',
                            'border-x border-indigo-200 border-y border-r p-2 rounded-r-md text-sm mb-3'
                          )
                        }
                      >
                        Withdraw
                      </Tab>
                    </div>

                    {updatingBalance ? (
                      <div className="flex">
                        <MoonLoader size={24} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <form onSubmit={handleBalanceChange}>
                      <label htmlFor="deposit" className="sr-only">
                        Amount to deposit
                      </label>
                      <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            step="0.01"
                            name="deposit"
                            id="deposit"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              LYXt
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end text-xs">
                          <p>max: {account.unallocated} LYXt</p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full flex text-center justify-center py-1 text-sm font-medium hover:bg-indigo-800 bg-indigo-600 text-white mt-3 rounded"
                      >
                        Confirm
                      </button>
                    </form>
                  </Tab.Panel>
                  <Tab.Panel>
                    <form>
                      <label htmlFor="withdraw" onSubmit={handleBalanceChange} className="sr-only">
                        Amount to withdraw
                      </label>
                      <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            step="0.01"
                            name="withdraw"
                            id="withdraw"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                              LYXt
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end text-xs">
                          <p>max: {currentPool.balance} LYXt</p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full flex text-center justify-center py-1 text-sm font-medium hover:bg-indigo-800 bg-indigo-600 text-white mt-3 rounded"
                      >
                        Confirm
                      </button>
                    </form>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </section>

          {/*Policy section*/}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1 mt-6">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              {currentPool._policy ? (
                <>
                  <div className="sm:col-span-1 border-b pb-1">
                    <dt className="text-lg font-medium text-gray-800">Policy {currentPool._policy.id}</dt>
                    <dd className="flex mt-1 text-sm text-gray-500 items-center hover:text-blue-400">
                      <p className="">{currentPool._policy.name}</p>
                      <ArrowUpRightIcon className="h-3 w-3 ml-1" />
                    </dd>
                  </div>

                  <div className="flex flex-col">
                    {currentPool._policy.param1 ? (
                      <></>
                    ) : (
                      <>
                        <div className="mr-2">
                          <dt className="text-sm font-medium text-gray-400 mt-2">Function</dt>
                          <dd className="mt-1 text-sm text-gray-500 flex items-center">
                            <p>{currentPool._policy.selector}</p>
                          </dd>
                        </div>
                        <div className="mr-4">
                          <dd className="mt-1 text-sm text-gray-500 flex items-center ">
                            <p>
                              {currentPool._policy.param1} {currentPool._policy.condition1} {currentPool._policy.value1}
                            </p>
                          </dd>
                        </div>
                        <div className="mr-4">
                          <dd className="mt-1 text-sm text-gray-500 flex items-center ">
                            <p>
                              {currentPool._policy.param2} {currentPool._policy.condition2} {currentPool._policy.value2}
                            </p>
                          </dd>
                        </div>
                        <div className="mr-4">
                          <dd className="mt-1 text-sm text-gray-500 flex items-center ">
                            <p>
                              {currentPool._policy.param3} {currentPool._policy.condition3} {currentPool._policy.value3}
                            </p>
                          </dd>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="border border-gray-300 text-gray-400 w-full px-4 text-center">
                  <p className="font-medium text-sm">No policy set</p>
                  {/* <div>
                    Select a policy by its ID
                    
                  </div> */}
                </div>
              )}
            </div>
          </section>

          {/* Beneficiaries Section*/}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1 mt-6">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <Tab.Group>
                <Tab.List>
                  <div className="flex justify-between items-center">
                    <div>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected ? 'bg-indigo-100' : '',
                            'border-indigo-200 border-y border-l p-2 rounded-l-md text-sm mb-3'
                          )
                        }
                      >
                        <h2 id="timeline-title" className="font-medium text-gray-900">
                          Beneficiaries{' '}
                          <span className="text-sm text-gray-400">{`(${currentPool.beneficiaries.length})`}</span>
                        </h2>
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            selected ? 'bg-indigo-100' : '',
                            'border-x border-indigo-200 border-y border-r p-2 rounded-r-md text-sm mb-3 font-medium'
                          )
                        }
                      >
                        <p>Add Beneficiary</p>
                      </Tab>
                      {addingBeneficiary ? (
                        <div className="flex">
                          <MoonLoader size={24} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    {' '}
                    <div className="border border-gray-300 rounded-md flex items-center justify-between mb-4">
                      <label htmlFor="beneficiary-search" className="sr-only">
                        Search Beneficiaries
                      </label>
                      <input
                        className="bg-transparent p-2 text-sm placeholder:text-gray-300 border-none focus:border-none rounded-md w-full"
                        name="beneficiary-search"
                        id="beneficiary-search"
                        placeholder="search for beneficiary"
                      />

                      <MagnifyingGlassIcon className="w-4 h-4 mx-2 text-gray-400" />
                    </div>
                    <div className="relative mr-4">
                      <div className="top-0 right-0 left-0 h-3 absolute bg-gradient-to-b from-white to-transparent" />
                      <div className="mt-6 flow-root max-h-96 overflow-y-scroll min-h-[12rem] no-scrollbar ">
                        <ul role="list" className="-mb-8">
                          {currentPool.beneficiaries.length === 0 ? (
                            <div className="w-full text-gray-800">No beneficiaries</div>
                          ) : (
                            <></>
                          )}
                          {currentPool.beneficiaries.map((item, idx) => {
                            // console.log(item);

                            return (
                              <li key={item + idx}>
                                <a href={blockExplorer + item} target="_blank">
                                  <div className="flex space-x-3 p-2 hover:bg-gray-100 rounded-sm">
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-around space-x-4">
                                      <div>
                                        <p className="font-medium text-sm  text-gray-400">{getShortId(String(item))}</p>
                                      </div>
                                      <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                  </div>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="bottom-0 right-0 left-0 h-3 absolute bg-gradient-to-t from-white to-transparent" />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <form onSubmit={handleAddBeneficiary}>
                      <label htmlFor="beneficiary" className="sr-only">
                        Beneficiary
                      </label>
                      <div className="border border-gray-300 rounded-md flex items-center justify-between my-4">
                        <input
                          className="bg-transparent p-2 text-sm placeholder:text-gray-300 border-none focus:border-none rounded-md w-full"
                          name="beneficiary"
                          id="beneficiary"
                          placeholder="0x0"
                        />
                      </div>
                      <button className="w-full py-1 text-sm font-medium hover:bg-indigo-800 bg-indigo-600 text-white mt-3 rounded">
                        {' '}
                        Add Beneficiary
                      </button>
                    </form>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
