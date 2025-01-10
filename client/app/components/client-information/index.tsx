'use client';

import InputField from '@/app/components/input-field';
import Select from '@/app/components/select';
import { ClientInformationProps } from '@/app/util/interfaces';
import MultipleSelect from '../multiple-select';
import { useState } from 'react';


const ClientInformation: React.FC<ClientInformationProps> = (props) => {
  const { teamsData, clientData, setCategories, categories, accountant, setAccountant } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [payerTaxNumber, setPayerTaxNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6">
      <div className="col-span-12 sm:col-span-6">
        <InputField 
          id="firstName"
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          placeHolder="First Name"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <InputField 
          id="lastName"
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          placeHolder="Last Name"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <InputField 
          id="taxIdentificationNumber"
          name='taxIdentificationNumber'
          label="Taxpayer's Tax Identification Number*"
          value={payerTaxNumber}
          onChange={setPayerTaxNumber}
          placeHolder="Taxpayer's Tax Identification Number*"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div>
      <div className="col-span-12 sm:col-span-3">
        <InputField 
          id="email"
          name="email"
          label="Client's Email Address"
          value={email}
          onChange={setEmail}
          placeHolder="Client's Email Address"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div>
      <div className="col-span-12 sm:col-span-3">
        <InputField 
          id="phoneNumber"
          name="phoneNumber"
          label="Primary Phone"
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeHolder="Primary Phone"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div>
      {/* <div className="col-span-12 sm:col-span-4">
        <InputField 
          id="companyName"
          name="companyName"
          label="Company Name"
          value=""
          placeHolder="Company Name"
          helperText="This field is required!"
          error={false}
          type="text"
        />
      </div> */}
      <div className="col-span-12 sm:col-span-6">
        {/* <Select 
          selected=''
          options={clientData}
          onSelect={() => {}}
          label='Category'
        /> */}
        <MultipleSelect
          options={clientData}
          selected={categories}
          onSelect={(values) => {
            if(!setCategories) {
              return;
            }
            setCategories(values)
           }
          }
          label="Services/ Subscription"
          helperText="This field is required!"
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <Select 
          selected={accountant}
          options={teamsData}
          onSelect={setAccountant}
          label='Accountant Assigned'
        />
      </div>
    </div>
  );
};

export default ClientInformation;