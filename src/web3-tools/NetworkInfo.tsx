import luksoLogo from '../assets/logo.png';
export default function NetworkInfo() {
  return (
    <div className="border flex rounded-md p-6 h-fit mt-6 bg-white max-w-[18rem] flex-grow justify-between">
      <div>
        <p className="text-medium text-gray-800">Network</p>
        <p className="text-xs font-light text-gray-800 mt-4">{'L16'} - Lukso Testnet </p>
        <p className="text-xs font-light mt-2">Last Block: 12141234</p>
      </div>
      <div>
        <img src={luksoLogo} className="w-12" />
      </div>
    </div>
  );
}
