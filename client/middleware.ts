import { withAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest } from 'next/server'

const middleware = (request : NextRequest) => {
  return withAuth(request, {
    isReturnToCurrentPage: true,
    loginPage: "/",
    isAuthorized: ({ token } : { token : any}) => {
      return true
    }
  })
}


// TODO: Filter router paths based on the users role
export const config = {
  matcher: [
    "/dashboard",
    "/clients", 
    "/clients/active", 
    "/clients/inactive", 
    "/clients/create", 
    "/clients/update/[clientId]", 
    "/forms", 
    "/tasks", 
    "/help-center", 
    "/settings",  
    "/help-center",
    "/messages",
    "/settings",
  ]
};

export default middleware;