'use client';

import ActionButton from '@/app/components/action-button';
import BusinessInformation from '@/app/components/business-information';
import ButtonLink from '@/app/components/button-link';
import ClientInformation from '@/app/components/client-information';
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import MultipleSelect from '@/app/components/multiple-select';
import Spinner from '@/app/components/spinner';
import Tasks from '@/app/components/tasks';
import Title from '@/app/components/title';
import { createSelectOptions, getSubmittedData } from '@/app/util';
import { Client, ClientProfileProps, CreateClientRequest } from '@/app/util/interfaces';
import { Business, Category, SelectItemProps, TeamClient } from '@/app/util/types';
import { redirect } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ClientProfile: React.FC<ClientProfileProps> = (props) => {
  const { teamsData, clientData, businessData } = props;
  const [businessOptions, setBusinessOptions] = useState<SelectItemProps[]>([]);

  const [businesses, setBusinesses] = useState<SelectItemProps[]>([]);

  const [categories, setCategories] = useState<SelectItemProps[]>([]);
  const [accountant, setAccountant] = useState<SelectItemProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');

  const [isBusinessSelect, setIsBusinessSelect] = useState(false);
  const [isBusinessSubmitted, setIsBusinessSubmitted] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<SelectItemProps>();
  const [associatedClients, setAssociatedClients] = useState<string[]>([]);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let status;
    try {
      const data = getSubmittedData(e);

      const categoriesRequest: Category[] = (categories || []).map((category) => ({
        name: category.value,
        categoryId: category.id
      }));
    
      
      const businessesRequest: Business[] = (businesses || []).map((business) => ({
        businessId: business.id,
        name: business.value, // Adjust these fields based on your form structure
        taxNumber: business.description,
      }));  
  
      const teamsRequest: TeamClient = {
        userId: accountant?.id, 
      };
    
      const clientRequest: CreateClientRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        taxNumber: data.taxNumber,
        categories: categoriesRequest,
        businesses: businessesRequest,
        teams: [teamsRequest],
      };

      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientRequest),
      })
      status = response.ok;
      toast.success('Client has been successfully saved!');
    } catch(e) {
      console.error('Error: ', e)
      toast.error('Error in creating a client! ' + e);
    } finally {
      setIsLoading(false);
      if (status) {
        redirect('/');
      }
    }
  };

  const getBusinesses = async () => {
    const response = await fetch('/api/businesses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();
    const businessData: SelectItemProps[] = data.map((business: Business) => {
      return createSelectOptions(business.businessId, business.name, business.name, business.taxNumber)
    });

    setBusinessOptions(businessData);
  }

  const handleUpdateBusiness = async(business: SelectItemProps) => {
    const data: Business = {
      name: business.value,
      taxNumber: business.description
    }
    try {
      await fetch(`/api/businesses/${business.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      await getBusinesses();

      toast.success(`Business ${business.value} has been successfully updated!`);
    } catch(e) {
      console.log('Error', e);
      toast.error(`Error in updating Business ${business.value}!`);
    }

  }

  const handeDeleteBusiness = async(business: SelectItemProps) => {
    setDeleteItem(business);
    setIsOpenDeleteModal(true);
    setIsDeleteLoading(true);
    try {
      const response = await fetch(`/api/business-clients/${business.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const existingClients: Client[] = await response.json();
      const clientNames = existingClients.map(item => `${item.lastName}, ${item.firstName}`);
      
      setAssociatedClients(clientNames);
    } catch(e) {
      console.log('Error', e)
    } finally {
      setIsDeleteLoading(false);
    }
  }

  const handleCloseModal = () => {
    setBusinessName('');
    setTaxNumber('');
    setIsBusinessSubmitted(false);
    setIsBusinessSelect(false);
    setOpen(false);
  }

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleDeleteModal = () => {
    setIsOpenDeleteModal(prev => !prev);
  }

  // TODO: Add conflict error validation message
  const handleCreateBusiness = async() => {
    if (!isBusinessSelect) {
      handleCloseModal();
      return;
    }

    setIsBusinessSubmitted(true);
    
    if (!businessName || !taxNumber) {
      return;
    }

    const business: Business = {
      name: businessName,
      taxNumber: taxNumber
    } 

    const response = await fetch('/api/businesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(business),
    })
    await getBusinesses();

    toast.success(`Business ${businessName} has been successfully created!`);
    const res: Business = await response.json();
    setBusinesses(prev => [...prev, {id: res.businessId, label: res.name, value: res.name, description: res.taxNumber }])
    handleCloseModal();
  }

  const handleBusinessOption = () => {
    setIsBusinessSelect(prev => !prev);
  }

  const onDeleteBusiness = async() => {
    setIsOpenDeleteModal(false);
     if (!associatedClients.length) {

      await fetch(`/api/businesses/${deleteItem?.id}`, {
        method: 'DELETE'
      });
    }
    await getBusinesses();
    toast.success(`Business ${deleteItem?.value} has been successfully deleted!`);
    setBusinesses(prev => prev.filter(item => item.id !== deleteItem?.id));
  }

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full justify-between my-8">
        <Title
          name="Owner's Information"
          containerStyle="mb-0" 
          textStyle="text-primary text-[16px]"
        />
        <ActionButton type='submit' isLoading={isLoading} label='Save'/>
      </div>
      <ClientInformation
        teamsData={teamsData} 
        accountant={accountant}
        categories={categories}
        clientData={clientData} 
        setCategories={setCategories}
        setAccountant={setAccountant}
      />
      <div className="flex w-full justify-between my-8">
        <Title
          name="Business Information"
          containerStyle="mb-0" 
          textStyle="text-primary text-[16px]"
        />
      </div>
      {
        businesses?.map((business: SelectItemProps, indx: number) => (
          <BusinessInformation 
            key={indx} 
            business={business} 
            handleDeleteBusiness={handeDeleteBusiness} 
            handleUpdateBusiness={handleUpdateBusiness}
          />
        ))
      }
      <Modal
        open={isOpenDeleteModal} 
        title="Confirm Deletion of Business" 
        submitLabel="Delete"
        onCancel={handleDeleteModal}
        cancelLabel='Cancel'
        onSubmit={onDeleteBusiness}
      >
        <div className='flex flex-col gap-4 items-center justify-center'>
          <Spinner isLoading={isDeleteLoading}/>
        </div>
        {
          !isDeleteLoading ?
            <div className='flex flex-col gap-4 justify-center'> 
            {
              associatedClients.length ?
              (
                <>
                  <h3 className='text-black text-base'>
                    This business is currently associated with clients and deleting it may affect related data or services.
                  </h3>
                  <div className='h-[120px] flex flex-col gap-1 overflow-auto'>
                    {
                      associatedClients.map((client, indx) => (
                        <h3 key={indx} className=' bg-grayLight p-1 flex gap-1 text-black text-base font-semibold'>
                          {client}
                        </h3>
                      ))
                    }
                  </div>
                  <h3 className='text-black text-base'>
                    Please confirm if you wish to proceed with deleting <span className='font-semibold'>{deleteItem?.value}</span>.
                  </h3>
                </>
              ): (
                <h3 className='text-black text-base'>
                  Are you sure you want to delete the business <span className='font-semibold'>{deleteItem?.value}</span>?
                </h3>
              )
            }
            </div>
          :
          (<></>)
        }
        
      </Modal>
      <Modal
        open={open} 
        title="Client's Business" 
        submitLabel="Save"
        onCancel={handleCloseModal}
        onSubmit={handleCreateBusiness}
      >
       <div className="container grid grid-cols-1 sm:grid-cols-12 gap-4 mt-1">
        <div className="col-span-12 sm:col-span-12">
          <MultipleSelect
            options={businessOptions}
            selected={businesses}
            onSelect={(values) => {
              if(!setBusinesses) {
                return;
              }
              setBusinesses(values)
            }
            }
            label="Select business"
            helperText="This field is required!"
          />
        </div>
        <div className="col-span-12 sm:col-span-12">
         <ButtonLink handleClick={handleBusinessOption} label='Create a new business' containerStyle='my-2'/>
        </div>
        {
          isBusinessSelect ? (
            <>
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  id="name"
                  name="companyName"
                  label="Company Name"
                  value={businessName}
                  onChange={setBusinessName}
                  placeHolder="Company Name"
                  helperText="This field is required!"
                  type="text"
                  error={!businessName && isBusinessSubmitted}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <InputField 
                  id="taxNumber"
                  name="taxNumber"
                  onChange={setTaxNumber}
                  label="EIN/Business Tax Number"
                  value={taxNumber}
                  placeHolder="EIN/Business Tax Number"
                  helperText="This field is required!"
                  error={!taxNumber && isBusinessSubmitted}
                  type="text"
                />
              </div>
            </>
          ) : (<></>)
        }
      </div>
      </Modal>
      <ButtonLink handleClick={handleOpenModal} label='Add another business'/>
      <Tasks />
    </form>
  );
};

export default ClientProfile;
