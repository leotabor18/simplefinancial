import { FormEvent } from 'react';
import { SubmittedData } from './interfaces';
import { SelectItemProps } from './types';

export const createHeadCells = <T>(field: keyof T, label: string, isSort: boolean, isHidden = false) => {
  return {
    id: field as string,
    field,
    label,
    isSort,
    isHidden,
  };
};

export const createSelectOptions = (id: string | number | undefined, label: string, value: string, description: string = ''): SelectItemProps => {
  return {
    id,
    label,
    value,
    description
  };
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US').format(date); // Returns MM/DD/YYYY
};

export const getSubmittedData = (e: FormEvent<HTMLFormElement>): SubmittedData => {
  e.preventDefault();

  const submittedData: SubmittedData = {};

  for (const element of Array.from(e.currentTarget.elements)) {
    // Narrow down the type to HTMLInputElement or HTMLTextAreaElement
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    ) {
      if (element.name) {
        submittedData[element.name] = element.value;
      }
    }
  }

  return submittedData;
};