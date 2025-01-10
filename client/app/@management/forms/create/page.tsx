import BreadCrumb from '@/app/components/bread-crumb';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

const CreateForm = () => {
  const BREAD_CRUMB = [
    { name: 'Forms', link: '/forms' },
    { name: 'Add New Form', link: '' },
  ];

  return (
    <div>
      <BreadCrumb items={BREAD_CRUMB} />
      <div className="flex flex-col w-full pt-10">
        <form className="flex justify-center">
          <div className="w-5/6 space-y-12">
            {/* section */}
            <div className="relative bg-background h-auto pb-10">
              <div className="sticky top-0 bg-primary text-white py-3 px-5 shadow">{`Section 1 of 2`}</div>

              <div className="relative px-10 space-y-8 pb-12 sm:space-y-0 sm:divide-y sm:divide-textLight/50 sm:pb-0 bg-white rounded-md m-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label htmlFor="formName" className="block text-sm/6 font-medium text-textLight sm:pt-1.5">
                    {`Form Name`}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center rounded-md outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary w-full">
                      <input id="formName" name="formName" type="text" placeholder="Untitled Form" className="block w-full py-1.5 px-3 border rounded-md border-textLight text-base text-textLight placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label htmlFor="formDescription" className="block text-sm/6 font-medium text-textLight sm:pt-1.5">
                    {`Form Description`}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <textarea id="formDescription" name="formDescription" rows={3} className="block w-full border border-textLight rounded-md bg-white px-3 py-1.5 text-base text-textLight outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" defaultValue={''} />
                  </div>
                </div>
              </div>

              <div className="relative px-10 space-y-8 pb-12 sm:space-y-0 sm:divide-y sm:divide-textLight/50 sm:pb-0 bg-white rounded-md m-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label htmlFor="question" className="block text-sm/6 font-medium text-textLight sm:pt-1.5">
                    {`Question`}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center rounded-md outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary w-full">
                      <input id="question" name="question" type="text" className="block w-full py-1.5 px-3 border rounded-md border-textLight text-base text-textLight placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                    </div>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <label htmlFor="questionType" className="block text-sm/6 font-medium text-textLight sm:pt-1.5">
                    {`Question Type`}
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="mt-2 grid grid-cols-1">
                      <select id="questionType" name="questionType" autoComplete="questionType" className="block w-full py-1.5 px-3 border rounded-md border-textLight text-base text-textLight placeholder:text-gray-400 focus:outline-none sm:text-sm/6">
                        {/* inputs */}
                        <option>Short Answer</option>
                        <option>Paragraph</option>
                        {/* options */}
                        <option>Multiple Choice</option>
                        <option>Checkboxes</option>
                        <option>Dropdown</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
