import { Client, ClientData, ClientDataResponse, ClientResponse, Params, SearchParams } from "@/app/util/interfaces";
import API from ".";
import request from "../request.server";

export const getClientList = async(params: SearchParams): Promise<ClientDataResponse[]> => {
  try {
    const response = await request<null, ClientResponse>({
      method: 'GET',
      url: API.CLIENTS_API,
      params: {
        ...params
      }
    }) 
    return response.clients;
  } catch (error: any) {
    console.error(error);
  }

  return []
}

export const getClientById = async(clientId: string | number): Promise<Client | null> => {
  try {
    const response = await request<null, Client>({
      method: 'GET',
      url: `${API.CLIENTS_API}/${clientId}`, 
    });

    return response;
  } catch(error: any) {
    console.error(error);
  }

  return null;
}