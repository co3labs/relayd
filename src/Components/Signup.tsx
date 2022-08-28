import { XMarkIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import FocusModalContainer from '../modals/FocusModalContainer';

export default function Signup() {
  return (
    <div className="bg-white w-full h-full ">
      <FocusModalContainer>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-100 border border-gray-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
              <div className="w-full justify-center flex items-end">
                <h1 className="font-dmserfif text-zinc-800 text-6xl relative">
                  Relay<span className="font-dmserfif text-indigo-600">d</span>
                  <div className="w-2 h-2 bg-indigo-600 ml-1 absolute -right-3 bottom-2" />
                </h1>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Access Your Universal Profile Account
              </h2>
              {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  start your 14-day free trial
                </a>
              </p> */}
            </div>

            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Universal Profile Address
                </label>
                <div className="mt-1">
                  <input
                    id="up-address"
                    name="up-address"
                    type="text"
                    placeholder="0x0"
                    required
                    className="appearance-none block w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-transparent text-blue-400 focus:ring-indigo-500  border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </FocusModalContainer>
    </div>
  );
}
