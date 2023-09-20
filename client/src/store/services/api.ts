import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserApiResponse } from '../servicesTypes/userTypes'
import { GetFilesReponse } from '../servicesTypes/fileTypes'

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/',credentials : "include"}),
  tagTypes :["Watch"],
  endpoints: (builder) => ({
    login: builder.mutation<UserApiResponse, {email : string , password : string}>({
      query: (arg) => ({
          url :"user/login",
          method :"POST",
          body : arg
      })
    }),
    
    logOut: builder.mutation<void,void>({
      query : () => ({
       url : "user/logout",
       method : "POST"
      })
     }),
      getMe: builder.query<UserApiResponse,void>({
         query : () => ({
          url : "user/me",
          method : "GET"
         })
    }),
    getFiles: builder.query<GetFilesReponse,void>({
      query : () => ({
       url : "file/",
       method : "GET"
      })
 })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation,useGetMeQuery,useLogOutMutation,useGetFilesQuery} = Api