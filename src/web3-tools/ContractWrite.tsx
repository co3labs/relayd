import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ContractForm from './ContractForm';
import NetworkInfo from './NetworkInfo';

export default function ContractWrite() {
  return (
    <div className="flex flex-col py-6 px-4 sm:px-6 md:px-8 ">
      <h1 className="text-2xl font-semibold text-gray-800">Interact</h1>
      <div className="flex">
        <div className="max-w-7xl mx-auto flex-grow">
          <ContractForm onSubmit={() => {}} submitText="Write" />
        </div>
        <NetworkInfo />
      </div>
    </div>
  );
}
