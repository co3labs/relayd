import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ContractForm from './ContractForm';

export default function ContractWrite() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-white">Interact</h1>
      </div>
      <ContractForm onSubmit={() => {}} submitText="write" />
    </div>
  );
}
