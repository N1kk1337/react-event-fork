import React, { useState } from 'react'
import { Container, Typography, Box, Grid, Pagination } from '@mui/material'
import FundraisingCard from './FundraisingCard'
import { HelpRequest } from '~/shared/types/HelpRequest.types'
import { FilterCriteria } from '~/shared/types/HelpRequest.types'
import { useGetAllCardsQuery } from '~/app/store/api/helpRequestsApi.ts'
import { AuthServiceTokens } from '~/shared/utils/token.service.ts'
import ErrorGetCard from '~/components/errorGetCard/ErrorGetCard.tsx'

const CardsList: React.FC<{ searchTerm: string; filters: FilterCriteria }> = ({
	searchTerm,
	filters
}) => {
	const [currentPage, setCurrentPage] = useState(1)
	const cardsPerPage = 3
	const { data: helpRequests, isLoading, isError } = useGetAllCardsQuery()

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value)
	}
	const token = AuthServiceTokens
	const filteredCards =
		helpRequests?.filter((request: HelpRequest) => {
			const matchesSearchTerm =
				request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				request.organization.title
					.toLowerCase()
					.includes(searchTerm.toLowerCase())

			const matchesFilters = Object.entries(filters).every(([key, value]) => {
				if (Array.isArray(value) && value.length > 0) {
					switch (key) {
						case 'categories':
							return (
								(value.includes('Пенсионеры') &&
									request.requesterType === 'person') ||
								(value.includes('Дома престарелых') &&
									request.requesterType === 'organization') ||
								(value.includes('Вещи') && request.helpType === 'material') ||
								(value.includes('Финансирование') &&
									request.helpType === 'finance')
							)
						case 'specialization':
							return (
								(value.includes('Квалифицированная') &&
									request.helperRequirements.qualification ===
										'professional') ||
								(value.includes('Не требует профессии') &&
									request.helperRequirements.qualification === 'common')
							)
						case 'format':
							return (
								(value.includes('Онлайн') &&
									request.helperRequirements.isOnline) ||
								(value.includes('Офлайн') &&
									!request.helperRequirements.isOnline)
							)
						case 'volunteerType':
							return (
								(value.includes('Группа') &&
									request.helperRequirements.helperType === 'group') ||
								(value.includes('Один') &&
									request.helperRequirements.helperType === 'single')
							)
						default:
							return true
					}
				}

				if (typeof value === 'string' && key === 'date') {
					if (value === '') {
						return true // Игнорируем фильтр по дате, если значение пустое
					}
					return new Date(request.endingDate) <= new Date(value)
				}

				return true
			})

			return matchesSearchTerm && matchesFilters
		}) || []

	if (!token) {
		return (
			<Container maxWidth='lg'>
				<Typography variant='h5' gutterBottom>
					Пожалуйста, авторизуйтесь, чтобы просмотреть запросы о помощи.
				</Typography>
			</Container>
		)
	}

	if (isLoading) {
		return (
			<Container maxWidth='lg'>
				<Typography variant='h5' gutterBottom>
					Загрузка запросов о помощи...
				</Typography>
			</Container>
		)
	}

	if (isError) {
		return <ErrorGetCard />
	}

	const totalCards = filteredCards.length
	const indexOfLastCard = currentPage * cardsPerPage
	const indexOfFirstCard = indexOfLastCard - cardsPerPage
	const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard)

	return (
		<Container maxWidth='lg'>
			<Typography variant='h5' gutterBottom>
				Найдено: {totalCards}
			</Typography>
			<Grid container spacing={3} sx={{ height: '843px' }}>
				{currentCards.map((request: HelpRequest) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						key={request.id}
						sx={{ display: 'flex' }}
					>
						<FundraisingCard
							title={request.title}
							organizer={request.organization.title}
							location={request.location.city}
							goal={request.goalDescription}
							completionDate={request.endingDate}
							requestGoal={request.requestGoal}
							requestGoalCurrentValue={request.requestGoalCurrentValue}
							contributorsCount={request.contributorsCount}
							requesterType={request.requesterType}
							helpType={request.helpType}
							id={request.id}
						/>
					</Grid>
				))}
			</Grid>
			<Box mt={4} display='flex' justifyContent='center'>
				<Pagination
					count={Math.ceil(totalCards / cardsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					color='primary'
				/>
			</Box>
		</Container>
	)
}

export default CardsList
