import { BusinessesResponse } from "@/app/util/interfaces";
import API from ".";
import request from "../request.server";
import { Business } from "@/app/util/types";

export const getBusinesses = async(): Promise<Business[]> => {
  try {
    const response = await request<null, BusinessesResponse>({
      method: 'GET',
      url: API.BUSINESSES_API,
    }) 

    const data: Business[] = response.businesses;

    return data;
  } catch (error: any) {
    console.error(error);
  }

  return []
}