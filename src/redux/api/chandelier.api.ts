import { mainApi } from './index'

interface Candle {
	id?: string
	title: string
	price: number
	image: string
	category: string
	desc: string
}

const extendedApi = mainApi.injectEndpoints({
	endpoints: build => ({
		getCandles: build.query<Candle[], void>({
			query: () => ({ url: '/candels', method: 'GET' }),
			providesTags: ['CANDLE'],
		}),

		getCandleById: build.query<Candle, string>({
			query: id => ({ url: `/candels/${id}`, method: 'GET' }),
			providesTags: (_, __, id) => [{ type: 'CANDLE', id }],
		}),

		createCandle: build.mutation<Candle, Omit<Candle, 'id'>>({
			query: body => ({
				url: '/candels',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
			invalidatesTags: [{ type: 'CANDLE' }],
		}),

		updateCandle: build.mutation<Candle, Partial<Candle> & Pick<Candle, 'id'>>({
			query: ({ id, ...body }) => ({
				url: `/candels/${id}`,
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}),
			invalidatesTags: (_, __, { id }) => [{ type: 'CANDLE', id }],
		}),

		deleteCandle: build.mutation<void, string>({
			query: id => ({ url: `/candels/${id}`, method: 'DELETE' }),
			invalidatesTags: (_, __, id) => [{ type: 'CANDLE', id }],
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetCandlesQuery,
	useGetCandleByIdQuery,
	useCreateCandleMutation,
	useUpdateCandleMutation,
	useDeleteCandleMutation,
} = extendedApi
