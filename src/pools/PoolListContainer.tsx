import { PropsWithChildren } from 'react';

export default function PoolListContainer({ children }: PropsWithChildren) {
  return (
    <div className="mt-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
            {children}
        </ul>
      </div>
    </div>
  );
}
