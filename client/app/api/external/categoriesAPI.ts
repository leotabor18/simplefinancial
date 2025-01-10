import { CategoryResponse, SearchParams } from "@/app/util/interfaces";
import request from "../request.server";
import API from ".";
import { Category } from "@/app/util/types";

export const getCategories = async(): Promise<Category[]> => {
  try {
    const response = await request<null, CategoryResponse>({
      method: 'GET',
      url: API.CATEGORIES_API,
    }) 

    const data: Category[] = response.categories;

    return data;
  } catch (error: any) {
    console.error(error);
  }

  return []
}