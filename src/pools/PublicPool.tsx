import { Tab } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { spawn } from 'child_process';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Components/Toggle';
import { API_URL, blockExplorer, classNames, getShortId, GlobalContext } from '../context/GlobalState';
import axios from 'axios';
export default function PublicPool() {
  const { currentPool, userPools, setUserPools, allPools, web3 } = useContext(GlobalContext);
  if (!currentPool) return <></>;
  const pool = userPools[currentPool];
  const [active, setActive] = useState(pool.enabled);
  const transactions = [
    { id: '0x012', amount: 0.02432, date: Date.now(), sender: '0x0' },
    { id: '0x023', amount: 0.06332, date: Date.now() - 100000, sender: '0x0' },
    { id: '0x034', amount: 0.02453, date: Date.now() - 200000, sender: '0x0' },
    { id: '0x054', amount: 0.94533, date: Date.now() - 300000, sender: '0x0' },
    { id: '0x054', amount: 0.12345, date: Date.now() - 400000, sender: '0x0' },
    { id: '0x054', amount: 0.45246, date: Date.now() - 500000, sender: '0x0' },
    { id: '0x054', amount: 0.23456, date: Date.now() - 600000, sender: '0x0' },
  ];

  async function handleAddBeneficiary(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { beneficiary } = Object.fromEntries(formData);
    if (currentPool && web3?.utils.isAddress(beneficiary as string)) {
      axios
        .put(API_URL + 'pool', { ...pool, beneficiaries: [e.target.value, ...pool.beneficiaries] })
        .then(() => {
          alert('Beneficiary Sucessfully Added');
        })
        .catch(console.error);
    }
  }

  async function handleEditActiveState() {
    const isActive = pool.enabled;
    setActive(!isActive);
    axios.put(API_URL + 'pool', { ...pool, active: !isActive }).catch(() => {
      alert('Failed to ' + isActive ? 'Deactivate' : 'Activate' + ' pool');
    });
  }

  async function handleBalanceChange(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { balance } = Object.fromEntries(formData);
    axios.put(API_URL + 'pool', { ...pool, balance: balance }).catch();
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
                    {pool.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{pool.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col justify-end items-end mr-2">
                    <Toggle enabled={active} onClick={handleEditActiveState} />
                    <span className="mt-2 text-xs text-gray-400">{pool.enabled ? '(active)' : '(inactive)'}</span>
                  </div>
                </div>
              </div>
              <div className="m-4">
                {pool.tags.map((tag, index) => {
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
                    <dd className="mt-1 text-sm text-gray-900">{pool.balance}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Beneficiaries</dt>
                    <dd className="mt-1 text-sm text-gray-900">{pool.beneficiaries.length}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Transactions</dt>
                    <dd className="mt-1 text-sm text-gray-900">74</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Total Gas Funded</dt>
                    <dd className="mt-1 text-sm text-gray-900">156 LYXt</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <section aria-labelledby="transactions-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="transactions-title" className="text-lg font-medium text-gray-900 mb-4">
                Funded Transactions
              </h2>

              {/* Activity Feed */}
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
            </div>
          </section>
        </div>
        <div>
          {/*Deposit withdraw section */}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <Tab.Group>
                <Tab.List>
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
                    Widthdraw
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <form onSubmit={handleBalanceChange}>
                      <label htmlFor="balance" className="sr-only">
                        Amount to deposit
                      </label>
                      <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="text"
                            name="balance"
                            id="balance"
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
                          <p>max: 467 LYXt</p>
                        </div>
                      </div>
                    </form>
                    <button className="w-full py-1 text-sm font-medium hover:bg-indigo-800 bg-indigo-600 text-white mt-3 rounded">
                      {' '}
                      Confirm
                    </button>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div>
                      <label htmlFor="price" className="sr-only">
                        Amount to deposit
                      </label>
                      <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="text"
                            name="price"
                            id="price"
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
                          <p>max: 800 LYXt</p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-1 text-sm font-medium hover:bg-indigo-800 bg-indigo-600 text-white mt-3 rounded">
                      {' '}
                      Confirm
                    </button>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </section>

          {/*Policy section*/}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1 mt-6">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              {' '}
              <div className="sm:col-span-1 border-b pb-1">
                <dt className="text-lg font-medium text-gray-800">Policy</dt>
                <dd className="mt-1 text-sm text-gray-500 flex items-center hover:text-blue-400">
                  <Link to="#" className="">
                    Transactions Above 1K
                  </Link>
                  <ArrowUpRightIcon className="h-3 w-3 ml-1" />
                </dd>
              </div>{' '}
              <div className="flex">
                <div className="mr-4">
                  <dt className="text-sm font-medium text-gray-400 mt-2">Rules</dt>
                  <dd className="mt-1 text-sm text-gray-500 flex items-center ">
                    <p>amount {'>'} 1000</p>
                  </dd>
                </div>
                <div className="mr-2">
                  <dt className="text-sm font-medium text-gray-400 mt-2">Function</dt>
                  <dd className="mt-1 text-sm text-gray-500 flex items-center">
                    <p>swap</p>
                  </dd>
                </div>
              </div>
            </div>
          </section>

          {/* Beneficiaries Section*/}
          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1 mt-6">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <Tab.Group>
                <Tab.List>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected ? 'bg-indigo-100' : '',
                        'border-indigo-200 border-y border-l p-2 rounded-l-md text-sm mb-3'
                      )
                    }
                  >
                    <h2 id="timeline-title" className="font-medium text-gray-900">
                      Beneficiaries <span className="text-sm text-gray-400">{`(${pool.beneficiaries.length})`}</span>
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
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    {' '}
                    <div className="border border-gray-300 rounded-md flex items-center justify-between my-4">
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
                      <div className="top-0 right-0 left-0 h-5 absolute bg-gradient-to-b from-white to-transparent" />
                      <div className="mt-6 flow-root max-h-96 overflow-y-scroll ">
                        <ul role="list" className="-mb-8">
                          {pool.beneficiaries.map((item, itemIdx) => (
                            <li key={item.address}>
                              <a href={blockExplorer + item.address} target="_blank">
                                <div className="flex space-x-3 p-2 hover:bg-gray-100 rounded-sm">
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-around space-x-4">
                                    <div>
                                      <p className="font-medium text-sm  text-gray-400">{getShortId(item.address)}</p>
                                    </div>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bottom-0 right-0 left-0 h-5 absolute bg-gradient-to-t from-white to-transparent" />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {' '}
                    <form onSubmit={handleAddBeneficiary}>
                      <label htmlFor="beneficiary-search" className="sr-only">
                        Beneficiary
                      </label>
                      <div className="border border-gray-300 rounded-md flex items-center justify-between my-4">
                        <input
                          className="bg-transparent p-2 text-sm placeholder:text-gray-300 border-none focus:border-none rounded-md w-full"
                          name="beneficiary-search"
                          id="beneficiary-search"
                          placeholder="search for beneficiary"
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
