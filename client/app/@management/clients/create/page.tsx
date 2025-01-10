import { getCategories } from '@/app/api/external/categoriesAPI';
import { getManagementUser } from '@/app/api/external/userAPI';
import BreadCrumb from '@/app/components/bread-crumb';
import { createSelectOptions } from '@/app/util';
import ClientProfile from './page.client';
import { SelectItemProps } from '@/app/util/types';
import { getBusinesses } from '@/app/api/external/businessAPI';

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

  const categories = await getCategories();
  let clientData: SelectItemProps[] = [];
  if (categories.length) {
    clientData = categories.map(category => {
      return createSelectOptions(category.categoryId, category.name, category.name)
    });
  }

  const businesses = await getBusinesses();
  let businessData: SelectItemProps[] = []
  if (businesses.length) {
    businessData = businesses.map(business => {
      return createSelectOptions(business.businessId, business.name, business.name, business.taxNumber)
    });
  }

  return (
    <div>
      <BreadCrumb items={BREAD_CRUMB} />
      <ClientProfile businessData={businessData} clientData={clientData} teamsData={teamsData}/>
    </div>
  );
};

export default CreateClient;