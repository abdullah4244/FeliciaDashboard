import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserApiResponse } from '../servicesTypes/userTypes'
import { GetFilesReponse, GetFiltersResponse } from '../servicesTypes/fileTypes'

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/',credentials : "include"}),
  tagTypes :["FILES"],
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
    getFiles: builder.query<GetFilesReponse,string>({
      query : (data) => ({
       url : `file${data ? '?' : ''}${data}`,
       method : "GET"
      }),
      providesTags : ['FILES']
 }),
 addFile : builder.mutation<void,FormData>({
  query : (data) => ({
     url : "file/",
     method : "POST",
     body : data,
     formData : true
  }),
  invalidatesTags : ['FILES']
 }),
 getAllFilters : builder.query<GetFiltersResponse,void>({
  query : () => ({
    url : "file/filters"
  }),
  providesTags : ['FILES']
 })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation,useGetMeQuery,useLogOutMutation,useGetFilesQuery,useAddFileMutation,useGetAllFiltersQuery} = Api