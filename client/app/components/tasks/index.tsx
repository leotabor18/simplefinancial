'use client';

import ButtonIcon from '@/app/components/button-icon'
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import Title from '@/app/components/title'
import Image from 'next/image'
import React, { useState } from 'react'

const Tasks = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="flex w-full justify-between my-8">
        <Title 
          name="Client's tasks and files" 
          containerStyle="mb-0" 
          textStyle="text-primary text-[16px]" 
        />
        <ButtonIcon name="Create Task" onClick={handleOpen} />
      </div>
      <div className="flex items-center flex-col w-full h-[300px]">
        <Image 
          src="/images/empty-folder.png" 
          alt="empty tasks folder" 
          width={191} 
          height={191} 
        />
        <p className="text-base text-black">No Tasks Added Yet</p>
      </div>
      <Modal 
        open={open} 
        title="New Client's Task" 
        submitLabel="Add to client's tasks"
        onCancel={handleClose}
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-8 justify-center'>
          <InputField 
            id="taskTitle"
            name="taskTitle"
            label="Task Title"
            value={taskTitle}
            onChange={setTaskTitle}
            placeHolder="Ex. Upload your bank statements for 2024"
            helperText="This field is required!"
            error={false}
            type="text"
          />
          <InputField 
            id="description"
            name="description"
            label="Description or specific instructions"
            value={description}
            onChange={setDescription}
            placeHolder="Ex. Please upload in PDF or CSV file only"
            helperText="This field is required!"
            error={false}
            type="text"
          />
        </div>
      </Modal>
    </>
  )
}

export default Tasks