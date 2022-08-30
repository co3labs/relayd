import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import FocusModalContainer from '../modals/FocusModalContainer';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, classNames, GlobalContext } from '../context/GlobalState';
import { MoonLoader } from 'react-spinners';
export default function Login() {
  const navigate = useNavigate();
  const { walletAddress, web3, setAccountAddress } = useContext(GlobalContext);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [up, setUp] = useState('');
  const [canLogin, setCanLogin] = useState(false);

  const checkCanLogin = async () => {
    try {
      const body = {
        account: up,
        signer: walletAddress,
      };
      setLoading(true);
      console.log(body);
      const userHasPermissions = await axios.post(API_URL + 'account/verifySigner', body);

      if (userHasPermissions) {
        const accountExists = await axios.get(API_URL + 'account/' + up);
        if (!accountExists) await axios.post(API_URL + 'account/', body);
        setAccountAddress(up);
        setCanLogin(true);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (web3?.utils.isAddress(up)) {
      checkCanLogin();
    }
  }, [up]);

  return (
    <div className="bg-white w-full h-full">
      <FocusModalContainer>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-100 border border-gray-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
              <div className="w-full justify-center flex items-end">
                <h1 className="font-dmserfif text-zinc-800 text-6xl relative">
                  relay<span className="font-dmserfif text-indigo-600">d</span>
                  <div className="w-2 h-2 bg-indigo-600 ml-1 absolute -right-3 bottom-2" />
                </h1>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Access Your Universal Profile Account
              </h2>
            </div>

            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                if (canLogin) navigate('/account/pools', { replace: false });
              }}
            >
              <div>
                <label htmlFor="upAddress" className="block text-sm font-medium text-gray-900">
                  Universal Profile Address
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    id="upAddress"
                    name="upAddress"
                    type="text"
                    placeholder="0x0"
                    value={up}
                    onChange={(e) => setUp(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border bg-transparent text-gray-800 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {loading ? (
                    <div className="flex ml-2">
                      <MoonLoader size={16} />
                    </div>
                  ) : (
                    <></>
                  )}
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
                  className={classNames(
                    canLogin
                      ? 'bg-indigo-600 first-letter:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      : 'bg-gray-300 cursor-not-allowed',
                    'w-full flex items-center justify-center py-2 px-4 border border-transparent',
                    ' rounded-md shadow-sm text-sm font-medium text-white ',
                    ' '
                  )}
                >
                  <span>Go to dashboard </span> <ArrowRightCircleIcon className="w-4 ml-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </FocusModalContainer>
    </div>
  );
}
