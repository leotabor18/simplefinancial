import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import API from ".";
import request from "../request.server";
import { ManagementUsersResponse, User } from "@/app/util/interfaces";

const { getUser } = getKindeServerSession();

export const getUserData = async() => {
  const userInfo = await getUser();
  
  const url = `${API.USER_API}/${userInfo.id}`;

  try {
    const response = await request<null, User>({
      method: 'GET',
      url: url,
    })
    return response;
  } catch (error: any) {
    console.error(error);
  }
}

export const getManagementUser = async() => {
  try {
    const response = await request<null, ManagementUsersResponse>({
      method: 'GET',
      url: `${API.USER_API}/management`,
    });

    return response.users;
  } catch (error: any) {
    console.error(error);
  }
}