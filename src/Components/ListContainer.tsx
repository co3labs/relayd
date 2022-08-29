import { PropsWithChildren } from 'react';

export default function ListContainer({ children }: PropsWithChildren) {
  return (
    <section className="mt-6 max-w-7xl">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
            {children}
        </ul>
      </div>
    </section>
  );
}
