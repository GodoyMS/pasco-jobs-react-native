import { backendURL } from '@config/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApiApplicant=createApi({
    reducerPath:"loginApiApplicant",
    baseQuery:fetchBaseQuery({
        baseUrl:backendURL,credentials:"include",
        prepareHeaders:(headers,{getState})=>{
            headers.set('Content-Type', 'application/json');    
            return headers
        }
    }),

    endpoints:(builder)=>({
        loginApplicant:builder.query({
            query:'api/applicants',
            method:'POST',
            body:credentials
        
        })
    })
})

export const {useLoginApplicantQuery}=loginApiApplicant