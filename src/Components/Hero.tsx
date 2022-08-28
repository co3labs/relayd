import { Fragment, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  BanknotesIcon,
  Bars3Icon,
  ChartBarSquareIcon,
  ChevronRightIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { CodeBracketIcon } from '@heroicons/react/20/solid';
export default function Hero() {
  const navigation = [
    { name: 'Features', href: '#' },
    { name: 'Company', href: '#' },
    { name: 'Marketplace', href: '#' },
  ];

  const features = [
    {
      name: 'Pools',
      description: 'Allocate funds to pools dedicated to particular incentive policies.',
      icon: BanknotesIcon,
    },
    {
      name: 'Policies',
      description: 'Define incentives on your smart contract functions to attract new customers.',
      icon: CodeBracketIcon,
    },
    {
      name: 'Dashboard',
      description: "Anyone on your team permissions can access, manage, and update your account's Pools & Policies.",
      icon: ChartBarSquareIcon,
    },
    {
      name: 'Fiat Deposits',
      description:
        'Fun your account by making deposits directly from your fiat bank account. We handle the conversion to crypto.',
      icon: CreditCardIcon,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          <div className="bg-gray-100 pt-6">
            <nav
              className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto text-gray-800 text-3xl font-bold ">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                    <div className="w-full justify-center flex items-end">
                      <h1 className="font-dmserfif text-zinc-800 text-5xl relative">
                        Relay<span className="font-dmserfif text-indigo-600">d</span>
                        <div className="w-2 h-2 bg-indigo-600 ml-1 absolute -right-3 bottom-[.4rem]" />
                      </h1>
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:flex md:ml-10">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-base font-medium  text-gray-800  hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link
                  to="login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 hover:text-gray-900 border-indigo-600 hover:bg-indigo-100"
                >
                  Log in
                </Link>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
            >
              <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                    <div className="w-full justify-center flex items-end">
                      <h1 className="font-dmserfif text-zinc-800 text-5xl relative">
                        Relay<span className="font-dmserfif text-indigo-600">d</span>
                        <div className="w-2 h-2 bg-indigo-600 ml-1 absolute -right-3 bottom-[.4rem]" />
                      </h1>
                    </div>
                  </div>{' '}
                  <div className="-mr-2">
                    <Popover.Button className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-200 hover:text-indigo-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <Link
                      className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                      to={'login'}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <main>
          <div className="pt-10 bg-gray-100 sm:pt-16 lg:pt-8  lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold  text-gray-800  sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="block text-indigo-400">pay for gas</span>
                    </h1>
                    <p className="mt-3 text-base  text-gray-800  sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Nobody likes gas. Relayd makes the transition to Web3 easier by funding gasless transactions.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                          <Link
                            to="login"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-16"
                          >
                            Get Started
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full invert lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <svg
                className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={784} fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
              </svg>

              <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="lg:col-span-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Web3 for the web2 world.
                  </h2>
                </div>
                <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
                  {features.map((feature) => (
                    <div key={feature.name}>
                      <dt>
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="mt-5 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
