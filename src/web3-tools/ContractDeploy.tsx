import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import ContractForm from './ContractForm';
import NetworkInfo from './NetworkInfo';
export default function ContractDeploy() {
  return (
    <div className="flex flex-col py-6 px-4 sm:px-6 md:px-8 ">
      <h1 className="text-2xl font-semibold text-gray-800">Deploy</h1>
      <div className="flex">
        <div className="mx-auto flex-grow">
          <div className="mr-6 p-4 bg-white rounded-md lg:px-12 sm:px-6 md:px-8 mt-6">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                // onSubmit(e);
              }}
            >
              <div>
                <label htmlFor="parameters" className="block text-sm font-medium text-gray-800">
                  Constructor Parameters
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="parameters"
                    id="parameters"
                    //   border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500
                    className="block w-full placeholder:text-gray-400 bg-gray-50 py-4 pr-10  sm:text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300"
                    placeholder="0x0,true,0x0"
                    defaultValue=""
                    aria-invalid="true"
                    aria-describedby="parameter-error"
                  />
                  {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div> */}
                </div>
                {/* <p className="mt-2 text-sm text-red-600" id="email-error">
                  Your password must be less than 4 characters.
                </p> */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="abi" className="block text-sm font-medium text-gray-800 my-2 sm:pt-2 ">
                  Contract ABI
                </label>
                <div className="sm:mt-0 sm:col-span-2 w-full">
                  <textarea
                    id="abi"
                    name="abi"
                    rows={10}
                    className="shadow-sm placeholder:text-gray-400 block w-full bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                    placeholder="ABI / JSON Inteface"
                  />
                </div>
              </div>
              <div className="mt-8 w-full flex flex-col items-center">
                <button
                  type="submit"
                  className="py-4 px-12 text-gray-600 shadow-sm border-transparent rounded border bg-gray-100 hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-800"
                >
                  Confirm
                </button>{' '}
                <button type="button" className="py-4 text-gray-500 hover:text-red-400">
                  Clear All
                </button>
              </div>
            </form>
          </div>{' '}
        </div>
        <NetworkInfo />
      </div>
    </div>
  );
}
