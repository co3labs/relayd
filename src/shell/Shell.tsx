import { Fragment, SVGProps, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import {
  CodeBracketIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Pools from '../pools/Pools';
import ProfileData from './ProfileData';
import ModalToggles from './ModalToggles';
import { classNames } from '../context/GlobalState';
import ContractDeploy from '../contract-tools/ContractDeploy';
import ContractWrite from '../contract-tools/ContractWrite';
import Policies from '../policies/Policies';
import Pool from '../pools/Pool';
export default function Shell() {
  interface INavigationItem {
    name: string;
    path?: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    current: boolean;
    element?: () => JSX.Element;
    subpaths?: { subpath: string; subElement: () => JSX.Element }[];
    children?: { name: string; path: string; element: () => JSX.Element; current: boolean }[];
  }

  const navigation: INavigationItem[] = [
    { name: 'Dashboard', path: 'dashboard', icon: HomeIcon, current: true, element: Dashboard },
    {
      name: 'Pools',
      path: 'pools',
      subpaths: [{ subpath: '/:pool_address', subElement: Pool }],
      icon: CurrencyDollarIcon,
      current: false,
      element: Pools,
    },
    { name: 'Policies', path: 'policies', icon: LightBulbIcon, current: false, element: Policies },
    {
      name: 'Web3 Tools',
      // path: 'contract/*',
      current: false,
      icon: CodeBracketIcon,
      children: [
        { name: 'Deploy Contract', path: 'deploy', element: ContractDeploy, current: false },
        { name: 'Write to Contract', path: 'write', element: ContractWrite, current: false },
      ],
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationElements = navigation.map((item) =>
    item.children ? (
      <Disclosure as="div" key={item.name} className="space-y-1">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                item.current
                  ? 'bg-gray-800 text-white'
                  : 'hover:text-white text-gray-400 hover:bg-gray-600 hover:bg-opacity-75',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                'group w-full flex items-center justify-between pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
              )}
            >
              <div className="flex items center">
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300" aria-hidden="true" />
                {item.name}
              </div>
              <ChevronDownIcon
                className={classNames(item.current ? 'rotate-180' : 'rotate-0', 'transition-transform w-4 h-4')}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="space-y-1">
                {item.children?.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-white hover:bg-gray-600"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    ) : (
      <Link
        key={item.name}
        to={'/account/' + item.path}
        className={classNames(
          item.current
            ? 'bg-gray-800 text-white'
            : 'hover:text-white text-gray-400 hover:bg-gray-600 hover:bg-opacity-75',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        )}
      >
        <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300" aria-hidden="true" />
        {item.name}
      </Link>
    )
  );

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 ">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="w-full justify-center flex items-end">
                  <h1 className="font-dmserfif text-zinc-50 text-6xl relative">
                    relay<span className="font-dmserfif text-indigo-600">d</span>
                    <div className="w-2 h-2 bg-indigo-600 ml-1 absolute -right-3 bottom-2" />
                  </h1>
                </div>
                <ProfileData />
                <ModalToggles />
                <nav className="mt-5 px-2 space-y-1">{navigationElements}</nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-zinc-900 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="w-full justify-start px-4 flex items-end">
                <h1 className="font-dmserfif text-zinc-50 text-4xl relative">
                  relay<span className="font-dmserfif text-indigo-600">d</span>
                  <div className="w-[.4rem] h-[.4rem] bg-indigo-600 ml-1 absolute -right-3 bottom-2" />
                </h1>
              </div>{' '}
              <ProfileData />
              <ModalToggles />
              <nav className="mt-5 flex-0 px-2 space-y-1">{navigationElements}</nav>
              <div className="mx-4">
                <div className="w-full x-4 h-1px bg-gray-700 my-2" />
              </div>
              <div className="px-2">
                <a
                  key={'logout'}
                  href={'/'}
                  className={classNames(
                    ' hover:bg-gray-600 hover:bg-opacity-75 hover:text-white text-gray-400',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md '
                  )}
                >
                  <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300" aria-hidden="true" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none max-h-screen">
          <Routes>
            {navigation.map((item) => (
              <>
                {item.children ? (
                  // <Route path={item.path}>
                  item.children.map((subItem) => <Route path={subItem.path} element={<subItem.element />} />)
                ) : (
                  // </Route>
                  <Route path={item.path} element={item.element ? <item.element /> : <></>} />
                )}

                {item.subpaths ? (
                  item.subpaths.map((subItem) => (
                    <Route path={item.path + subItem.subpath} element={<subItem.subElement />} />
                  ))
                ) : (
                  <></>
                )}
              </>
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
