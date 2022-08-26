import { PropsWithChildren } from 'react';

export default function FocusModalContainer({ children }: PropsWithChildren) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">{children}</div>
    </div>
  );
}
