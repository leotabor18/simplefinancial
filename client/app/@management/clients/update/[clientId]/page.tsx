import { getManagementUser } from '@/app/api/external/userAPI';
import BreadCrumb from '@/app/components/bread-crumb';
import { createSelectOptions } from '@/app/util';
import { SelectItemProps } from '@/app/util/interfaces';
import { FormEvent } from 'react';
import ClientProfile from './page.client';

const BREAD_CRUMB = [
  { name: 'Add New Client', link: '/clients/create' },
  { name: 'Client Profile', link: '' }
];

const CreateClient = async() => {
  const managementUsers = await getManagementUser();
  let teamsData: SelectItemProps[] = [];

  if (managementUsers?.length) {
    teamsData = managementUsers?.map(user => createSelectOptions(user.id, user.full_name, user.full_name));
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e)
  }

  return (
    <div>
      <BreadCrumb items={BREAD_CRUMB} />
      <ClientProfile teamsData={teamsData}/>
    </div>
  );
};

export default CreateClient;