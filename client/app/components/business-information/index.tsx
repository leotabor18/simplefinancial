'use client';

import InputField from '@/app/components/input-field';
import { BusinessInformationProps } from '@/app/util/interfaces';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';

const BusinessInformation: React.FC<BusinessInformationProps> = (props) => {
  const { value, description } = props.business;

  const [name, setName] = useState(value);
  const [taxNumber, setTaxNumber] = useState(description);
  const [hasChange, setHasChange] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [taxNumberError, setTaxNumberError] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasChange((name !== value) || (taxNumber != description));
  }, [name, taxNumber, value, description]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setName(value);
        setTaxNumber(description);
        setHasChange(false);
        setNameError(false);
        setTaxNumberError(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [value, description]);

  const handleUpdate = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!taxNumber && !taxNumber?.trim()) {
      setTaxNumberError(true);
      hasError = true;
    } else {
      setTaxNumberError(false);
    }

    if (!hasError) {
      props.handleUpdateBusiness({
        ...props.business,
        value: name,
        description: taxNumber,
      });
      setHasChange(false);
    }
  };

  return (
    <div ref={componentRef}>
      <div className="container grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6 items-start">
        <div className="col-span-12 sm:col-span-6">
          <InputField
            id="name"
            name="companyName"
            label="Company Name"
            value={name}
            onChange={setName}
            placeHolder="Company Name"
            helperText={nameError ? 'Company Name cannot be empty!' : ''}
            error={nameError}
            type="text"
          />
        </div>
        <div className="col-span-11 sm:col-span-5">
          <InputField
            id="taxNumber"
            name="taxNumber"
            onChange={setTaxNumber}
            label="EIN/Business Tax Number"
            value={taxNumber}
            placeHolder="EIN/Business Tax Number"
            helperText={taxNumberError ? 'EIN/Business Tax Number cannot be empty!' : ''}
            error={taxNumberError}
            type="text"
          />
        </div>
        <div className="col-span-1 sm:col-span-1 self-center">
          <div className="mt-6 flex gap-1">
            {hasChange ? (
              <CheckIcon
                onClick={handleUpdate}
                className={
                  'text-success h-6 w-6 md:ml-2 xs:min-w-6 xs:max-w-8 ssm:mr-6 cursor-pointer'
                }
              />
            ) : null}
            <TrashIcon
              onClick={() => props.handleDeleteBusiness(props.business)}
              className={
                'text-slate-700 h-6 w-6 md:ml-2 xs:min-w-6 xs:max-w-8 ssm:mr-6 cursor-pointer'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
