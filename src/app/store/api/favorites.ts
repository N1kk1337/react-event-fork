import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthServiceTokens } from '~/shared/utils/token.service.ts'
import { HelpRequest } from '~/shared/types/HelpRequest.types.ts'

export const apiAllFavorites = createApi({
	reducerPath: 'AllFavorites',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_SERVER_URL
	}),
	tagTypes: ['AllFavorites'],
	endpoints: builder => ({
		getAllFavorites: builder.query<HelpRequest[], void>({
			query: () => ({
				url: '/user/favourites',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${AuthServiceTokens.getRefreshToken()}`
				}
			})
		})
	})
})

export const { useGetAllFavoritesQuery } = apiAllFavorites
