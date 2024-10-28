import { useGetProfileQuery } from '~/app/store/api/profile'
import { useEffect } from 'react'
// import { useGetAllFavouritesQuery } from '~/app/store/api/favourites'
import ProfileSection from '~/components/ProfileSection/ProfileSection'
import { Box } from '@mui/material'

export const UserProfilePage = () => {
	useEffect(() => {
		document.title = 'Профиль'
	}, [])
	const { data, isLoading, isSuccess } = useGetProfileQuery()
	// const {
	// 	data: favoritesData,
	// 	isLoading: isLoadingFavorites,
	// 	isSuccess: isSuccessFavorites
	// } = useGetAllFavouritesQuery()
	// console.log('profile', favoritesData)
	console.log(data)
	return (
		<>
			<div>
				{isLoading ? (
					<>loading</>
				) : isSuccess ? (
					<Box sx={{ mt: '2px' }}>
						<ProfileSection userData={data} />
					</Box>
				) : (
					<>error</>
				)}
			</div>
		</>
	)
}
