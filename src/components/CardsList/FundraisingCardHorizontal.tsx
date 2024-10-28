import React from 'react'
import {
	Card,
	Typography,
	Button,
	LinearProgress,
	Grid,
	Box
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import { format } from 'date-fns'

interface FundraisingCardHorizontalProps {
	title: string
	organizer: string
	location: string
	goal: string
	completionDate: string
	requestGoalCurrentValue: number
	requestGoal: number
	contributorsCount: number
	requesterType: string
	helpType: string
}

const FundraisingCardHorizontal: React.FC<FundraisingCardHorizontalProps> = ({
	title,
	organizer,
	location,
	goal,
	completionDate,
	requestGoalCurrentValue,
	requestGoal
}) => {
	const formattedCompletionDate = completionDate
		? format(new Date(completionDate), 'dd.MM.yyyy')
		: 'N/A'
	return (
		<Card
			sx={{
				borderRadius: 2,
				boxShadow: 3,
				padding: '16px',
				marginBottom: '16px',
				width: '100%'
			}}
		>
			<Grid
				container
				spacing={2}
				sx={{
					width: '100%'
				}}
			>
				<Grid item xs={3}>
					<Typography variant='h6' gutterBottom>
						{title}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Box>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							<strong>Организатор:</strong>
						</Typography>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							{organizer}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							<strong>Локация:</strong>
						</Typography>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							{location}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={3} container direction='column' alignItems='center'>
					<Box display='flex' flexDirection='row' gap='8px'>
						<StarBorderIcon color='action' />
						<Typography
							noWrap
							width='132px'
							variant='body2'
							color='textSecondary'
							gutterBottom
						>
							В избранное
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={3}>
					<Typography variant='body2' color='textSecondary' gutterBottom>
						<strong>Мы собрали:</strong> {requestGoalCurrentValue} из{' '}
						{requestGoal} руб.
					</Typography>
					<LinearProgress
						variant='determinate'
						value={
							requestGoal <= 0
								? 100
								: Math.min(100, (100 * requestGoalCurrentValue) / requestGoal)
						}
						sx={{ mt: 1, mb: 2, width: '100%', height: '10px' }}
					/>
					<Button variant='contained' color='primary' sx={{ width: '100%' }}>
						Помочь
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Typography variant='body2' color='textSecondary' gutterBottom>
						<strong>Завершение:</strong>
					</Typography>
					<Typography variant='body2' color='textSecondary' gutterBottom>
						{formattedCompletionDate}
					</Typography>
				</Grid>

				<Grid item xs={3}>
					<Box>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							<strong>Цель сбора:</strong>
						</Typography>
						<Typography variant='body2' color='textSecondary' gutterBottom>
							{goal}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Card>
	)
}

export default FundraisingCardHorizontal
