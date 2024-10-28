import { useEffect } from 'react'
import ProfileSection from '~/components/ProfileSection/ProfileSection.tsx'

export const UserProfilePage = () => {
	useEffect(() => {
		document.title = 'Профиль'
	}, [])

	return (
		<>
			<ProfileSection />
		</>
	)
}
