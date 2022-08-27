import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const steps = [
  { name: 'Specify Contract', status: 'current', href: '#', id: 1 },
  { name: 'Select Function', status: 'incomplete', href: '#', id: 2 },
  { name: 'Define Conditionals', status: 'incomplete', href: '#', id: 3 },
];

export default function Strategies() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Create a New Strategy</h1>
      </div>
      <div className="mx-4 mt-6 bg-white rounded-md max-w-2xl">
        <nav aria-label="Progress">
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
                    {/* Arrow separator for lg screens and up */}
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
        </nav>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            //   onSubmit(e);
          }}
        >
          <div className="bg-gray-50 p-4 rounded-md ">
            <div className="rounded-md">
              <label htmlFor="address" className="block text-sm font-medium text-black">
                Contract Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="deploy_contract_address"
                  id="deploy_contract_address"
                  //   border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500
                  className="block w-full bg-white text-black py-4 pr-10  sm:text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 border border-gray-300"
                  placeholder="contract address"
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
                Contract ABI
              </label>
              <div className=" sm:mt-0 sm:col-span-2 w-full">
                <textarea
                  id="deploy_contract_abi"
                  name="deploy_contract_abi"
                  rows={10}
                  className="shadow-sm block w-full bg-white text-black  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                  placeholder="ABI / JSON Inteface"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 w-full flex flex-col items-center">
            <button
              type="submit"
              className="py-4 px-12 bg-gray-800 text-gray-400 hover:text-black rounded border hover:border-gray-400 border-gray-600"
            >
              Next
            </button>
            <button type="button" className="py-4 text-black0 hover:text-black">
              Clear All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
