import React, { useState } from 'react'
import { Container, Typography, Box, Grid, Pagination } from '@mui/material'
import FundraisingCard from './FundraisingCard'
import { HelpRequest } from '~/shared/types/HelpRequest.types'

import FundraisingCardHorizontal from './FundraisingCardHorizontal'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import PlaceIcon from '@mui/icons-material/Place'

interface CardsListProps {
	requests: HelpRequest[]
}

const CardsList: React.FC<CardsListProps> = ({ requests }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const cardsPerPage = 3

	const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical')

	const toggleLayout = () => {
		setLayout(prevLayout =>
			prevLayout === 'horizontal' ? 'vertical' : 'horizontal'
		)
	}

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setCurrentPage(value)
	}

	// if (!token) {
	// 	return (
	// 		<Container maxWidth='lg'>
	// 			<Typography variant='h5' gutterBottom>
	// 				Пожалуйста, авторизуйтесь, чтобы просмотреть запросы о помощи.
	// 			</Typography>
	// 		</Container>
	// 	)
	// }

	// if (isLoading) {
	// 	return (
	// 		<Container maxWidth='lg'>
	// 			<Typography variant='h5' gutterBottom>
	// 				Загрузка запросов о помощи...
	// 			</Typography>
	// 		</Container>
	// 	)
	// }

	// if (isError) {
	// 	return <ErrorGetCard />
	// }

	const totalCards = requests.length
	const indexOfLastCard = currentPage * cardsPerPage
	const indexOfFirstCard = indexOfLastCard - cardsPerPage
	const currentCards = requests.slice(indexOfFirstCard, indexOfLastCard)

	return (
		<Container maxWidth='lg'>
			<Box display='flex' justifyContent='space-between'>
				<Typography variant='h5' gutterBottom>
					Найдено: {totalCards}
				</Typography>
				<Box onClick={toggleLayout}>
					<GridViewIcon />
					<ViewListIcon />
					<PlaceIcon />
				</Box>
			</Box>

			<Grid
				container
				spacing={3}
				sx={{ height: layout === 'vertical' ? '843px' : 'auto' }}
			>
				{currentCards.map((request: HelpRequest) => (
					<Grid
						item
						xs={12}
						sm={layout === 'vertical' ? 6 : 12}
						md={layout === 'vertical' ? 4 : 12}
						key={request.id}
						sx={{ display: 'flex' }}
					>
						{layout === 'vertical' ? (
							<FundraisingCard
								id={request.id}
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
							/>
						) : (
							<FundraisingCardHorizontal
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
							/>
						)}
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
