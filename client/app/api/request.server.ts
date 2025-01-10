import { cookies } from 'next/headers';
import { FetchOption } from '../util/interfaces';

const request = async <TRequest = unknown, TResponse = unknown>({ method, url, body, params }: FetchOption<TRequest>): Promise<TResponse> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    throw new Error('Unauthorized to access the server resources');
  }

  headers['Authorization'] = `Bearer ${token.value}`;

  const queryString = params ? '?' + new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString() : '';

  const response = await fetch(`${url}${queryString}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message) || `Failed to access ${url}`;
  }

  return response.json() as Promise<TResponse>;
};

export default request;
