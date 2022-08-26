import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ContractForm({ submitText, onSubmit }: { submitText: string; onSubmit: Function }) {
  return (
    <div className=" max-w-2xl p-4 bg-gray-900 bg-opacity-60 rounded-md lg:px-12 sm:px-6 md:px-8 mt-6">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <div className="rounded-md shadow-sm">
          <label htmlFor="address" className="block text-sm font-medium text-gray-50">
            Contract Address
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              name="deploy_contract_address"
              id="deploy_contract_address"
              //   border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500
              className="block w-full bg-gray-800 text-white py-4 pr-10  sm:text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 border border-gray-300"
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
          <label htmlFor="about" className="block text-sm font-medium text-gray-50 my-2 sm:pt-2 ">
            Contract ABI
          </label>
          <div className=" sm:mt-0 sm:col-span-2 w-full">
            <textarea
              id="deploy_contract_abi"
              name="deploy_contract_abi"
              rows={10}
              className="shadow-sm block w-full bg-gray-800 text-white  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue={''}
              placeholder="ABI / JSON Inteface"
            />
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-center">
          <button
            type="submit"
            className="py-4 px-12 bg-gray-800 text-gray-400 hover:text-white rounded border hover:border-gray-400 border-gray-600"
          >
            {submitText}
          </button>
          <button type="button" className="py-4 text-gray-500 hover:text-white">
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}
