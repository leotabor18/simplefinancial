'use client';

import ClientInformation from '@/app/components/client-information';
import Tasks from '@/app/components/tasks';
import Title from '@/app/components/title';
import { ClientProfileProps } from '@/app/util/interfaces';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const ClientProfile: React.FC<ClientProfileProps> = (props) => {
  const { teamsData } = props;

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title
        name="Client's Information"
        containerStyle="mt-8 mb-8"
        textStyle="text-primary text-[22px]"
      />
      <ClientInformation teamsData={teamsData} />
      <Tasks />
      {/* Fixed button container with horizontal margins */}
      <div className='fixed bottom-0 left-0 right-0 bg-grayLight p-4 flex gap-4 justify-end border-t border-gray-300 mx-4 ml-[264px]'>
        <button
          type="button"
          onClick={handleCancel}
          className="text-primary bg-white border border-primary hover:bg-white-800 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-primary hover:bg-primary-800 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ClientProfile;
