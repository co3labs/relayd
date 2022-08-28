import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import ContractForm from './ContractForm';
import NetworkInfo from './NetworkInfo';
export default function ContractDeploy() {
  return (
    <div className="flex flex-col py-6 px-4 sm:px-6 md:px-8 ">
      <h1 className="text-2xl font-semibold text-gray-800">Deploy</h1>
      <div className="flex">
        <div className="mx-auto flex-grow">
          <ContractForm onSubmit={() => {}} submitText="Confirm" />
        </div>
        <NetworkInfo />
      </div>
    </div>
  );
}
