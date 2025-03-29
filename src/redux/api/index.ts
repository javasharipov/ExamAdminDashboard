import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
	reducerPath: 'mainApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://67e52ea518194932a584f10d.mockapi.io',
		prepareHeaders: headers => {
			const token = localStorage.getItem('access_token')
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		},
	}),
	tagTypes: ['CANDLE'],
	endpoints: () => ({}),
})

export const { usePrefetch } = mainApi
export const { updateQueryData, invalidateTags } = mainApi.util

export type MainApi = typeof mainApi
