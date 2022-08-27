import { useState } from "react";

export default function CreatePoolForm() {
  const strategies = ['No Strategy', 'Strategy A', 'Strategy B', 'Strategy C'];
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="max-w-2xl "
    >
      <div className="pt-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-50">Pool Information</h3>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-50">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="shadow-sm bg-gray-800 focus:ring-gray-500 focus:border-gray-700 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-50">
              Group
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="shadow-sm bg-gray-800 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="new-pool-description" className="block text-sm font-medium text-gray-50 my-2 sm:pt-2 ">
              Description
            </label>
            <div className=" sm:mt-0 sm:col-span-2 w-full">
              <textarea
                id="new-pool-description"
                name="new-pool-description"
                rows={3}
                className="shadow-sm block w-full bg-gray-800 text-white  focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
                placeholder=""
              />
            </div>
          </div>

          <div className="sm:col-span-3 max-w-xs">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Strategy
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="shadow-sm bg-gray-800 text-gray-50 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                {strategies.map((strategy) => (
                  <option>{strategy}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-6 max-w-xs">
            <label htmlFor="recharge-lukso-amt" className="text-sm font-medium text-gray-50">
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="deposit-lukso-amt"
                id="deposit-lukso-amt"
                className="text-white py-2 focus:ring-gray-500 focus:border-gray-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  LYXt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <button
          type="submit"
          className="py-4 px-12 bg-gray-800 text-gray-400 hover:text-white rounded border hover:border-gray-400 border-gray-600"
        >
          Create Pool
        </button>{' '}
      </div>
    </form>
  );
}
