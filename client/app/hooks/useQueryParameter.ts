import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { UseQueryParameterHooksProps } from '../util/interfaces';

export const useQueryParameter = <T>({ initialQueryParams = {} }: UseQueryParameterHooksProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword: string = searchParams.get('search') || initialQueryParams.search || '';
  const page = Number(searchParams.get('page')) || initialQueryParams.page || 1;
  const size = Number(searchParams.get('size')) || initialQueryParams.size || 10;
  const sortField = searchParams.get('sortField') || initialQueryParams.sortField || '';
  const sortOrder = searchParams.get('sortOrder') || initialQueryParams.sortOrder || 'asc';

  const updateURLParams = (newParams: Record<string, any>) => {
    const updatedParams = {
      search: keyword,
      page,
      size,
      sortField,
      sortOrder,
      ...newParams,
    };

    const queryString = new URLSearchParams(updatedParams).toString();

    router.replace(`?${queryString}`);
  };

  const handleSearchInputChange = (value: string) => {
    updateURLParams({ search: value });
  };

  const handlePageChange = (value: string) => {
    updateURLParams({ page: value });
  };

  const handleSizeChange = (value: string) => {
    updateURLParams({ size: value });
  };

  useEffect(() => {
    updateURLParams({ })
  }, []);

  return {
    keyword,
    page,
    size,
    handleSizeChange,
    handleSearchInputChange,
    handlePageChange,
  };
};
