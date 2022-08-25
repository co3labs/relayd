import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function Hero() {
  const navigation = [
    { name: 'Features', href: '#' },
    { name: 'Company', href: '#' },
    { name: 'Marketplace', href: '#' },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          <div className="bg-gray-900 pt-6">
            <nav
              className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto text-white text-3xl font-bold ">
                  Relayd
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
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
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <a href="#" className="text-base font-regular text-gray-400 hover:text-white">
                  Sign up
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                >
                  Log in
                </a>
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
              <div className="rounded-lg shadow-md bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className='text-3xl text-white font-bold'>
                    Relayd
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
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
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-900 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <Link
                      to="#"
                      className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                    >
                      Sign up
                    </Link>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-white">
                      Existing customer?{' '}
                      <Link to="#" className="text-white hover:underline">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="block text-indigo-400">ship web apps</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit
                      sunt amet fugiat veniam occaecat fugiat.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                          <Link
                            to="/account"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                          >
                            Login
                          </Link>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <button
                            onClick={() => {}}
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More main page content here... */}
        </main>
      </div>
    </div>
  );
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

// <div className="relative bg-primary-900 overflow-hidden">
//   <div className="max-w-7xl mx-auto">
//     <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
//       <svg
//         className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
//         fill="currentColor"
//         viewBox="0 0 100 100"
//         preserveAspectRatio="none"
//         aria-hidden="true"
//       >
//         <polygon points="50,0 100,0 50,100 0,100" />
//       </svg>

//       <Popover>
//         <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
//           <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
//             <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
//               <div className="flex items-center justify-between w-full md:w-auto">
//                 <a href="#">
//                   <span className="sr-only">Workflow</span>
//                   <img
//                     className="h-8 w-auto sm:h-10"
//                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//                   />
//                 </a>
//                 <div className="-mr-2 flex items-center md:hidden">
//                   <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                     <span className="sr-only">Open main menu</span>
//                     <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//                   </Popover.Button>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
//               {navigation.map((item) => (
//                 <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
//                   {item.name}
//                 </a>
//               ))}
//               <Link to="/account" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Log in
//               </Link>
//             </div>
//           </nav>
//         </div>

//         <Transition
//           as={Fragment}
//           enter="duration-150 ease-out"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="duration-100 ease-in"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           <Popover.Panel
//             focus
//             className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
//           >
//             <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
//               <div className="px-5 pt-4 flex items-center justify-between">
//                 <div>
//                   <img
//                     className="h-8 w-auto"
//                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//                     alt=""
//                   />
//                 </div>
//                 <div className="-mr-2">
//                   <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                     <span className="sr-only">Close main menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </Popover.Button>
//                 </div>
//               </div>
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//               <a
//                 href="#"
//                 className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
//               >
//                 Log in
//               </a>
//             </div>
//           </Popover.Panel>
//         </Transition>
//       </Popover>

//       <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
//         <div className="sm:text-center lg:text-left">
//           <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//             <span className="block xl:inline">Data to enrich your</span>{' '}
//             <span className="block text-indigo-600 xl:inline">online business</span>
//           </h1>
//           <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
//             Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
//             fugiat veniam occaecat fugiat aliqua.
//           </p>
//
//         </div>
//       </main>
//     </div>
//   </div>
//   <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
//     <img
//       className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
//       src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
//       alt=""
//     />
//   </div>
//   {/* <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
//         <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
//           <img
//             className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
//             src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
//             alt=""
//           />
//         </div>
//       </div> */}
// </div>;
