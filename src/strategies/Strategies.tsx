import { Tab } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { classNames, GlobalContext } from '../context/GlobalState';
import CreateStrategy from './CreateStrategy';

export default function Strategies() {
  const { userPools, allPools } = useContext(GlobalContext);
  const tabs = ['My Strategies', 'All Strategies', 'Create a New Strategy'];
  return (
    <>
      <div className="px-6 pt-6 flex flex-col max-h-full">
        <Tab.Group>
          <Tab.List className="pb-3 flex relative w-full first:rounded-l-full last:rounded-r-full">
            {tabs.map((tab) => (
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div className="relative">
                    <div
                      className={classNames(
                        selected ? 'bg-blue-800' : 'bg-gray-200',
                        'h-1 left-0 right-0  absolute bottom-0'
                      )}
                    />
                    <button
                      className={classNames(
                        selected ? ' text-gray-900' : 'bg-opacity-0 text-gray-400 hover:text-gray-800 ',
                        'px-4 py-2  rounded-sm focus:border-gray-400'
                      )}
                    >
                      {tab}
                    </button>
                  </div>
                )}
              </Tab>
            ))}
            <div className="absolute top-full w-full h-6 bg-gradient-to-b from-gray-100 to-transparent " />
          </Tab.List>
          <div className="overflow-scroll flex-grow max-h-full  no-scrollbar">
            <Tab.Panels>
              <Tab.Panel>
                <UserPoolList />
              </Tab.Panel>
              <Tab.Panel>
                <AllPoolList />
              </Tab.Panel>
              <Tab.Panel>
                <CreateStrategy />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
}


{
  /* <nav aria-label="Progress">
          <ol role="list" className="border border-gray-300 rounded-x-md rounded-t-md divide-y divide-gray-300 md:flex md:divide-y-0">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex-1 md:flex">
                {step.status === 'complete' ? (
                  <a href={step.href} className="group flex items-center w-full">
                    <span className="px-6 py-2 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                        <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                    </span>
                  </a>
                ) : step.status === 'current' ? (
                  <a href={step.href} className="px-6 py-2 flex items-center text-sm font-medium" aria-current="step">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                      <span className="text-indigo-600">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                  </a>
                ) : (
                  <a href={step.href} className="group flex items-center">
                    <span className="px-6 py-2 flex items-center text-sm font-medium">
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    // {/* Arrow separator for lg screens and up 
                    <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav> */
}
