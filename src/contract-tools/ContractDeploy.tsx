import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import ContractForm from './ContractForm';
export default function ContractDeploy() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Deploy Contract</h1>
      </div>
      <ContractForm onSubmit={() => {}} submitText="Sign Transaction"/>
    </div>
  );
}
