import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	Box,
	Avatar,
	Divider,
	LinearProgress
} from '@mui/material'
import { format } from 'date-fns'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import DementiaImage from '~/shared/assets/Dementia.png'
import NursingHomeImage from '~/shared/assets/Nursing home1.png'
import VolunteeringImage from '~/shared/assets/Volunteering-pana 1.png'
import {useNavigate, useParams} from "react-router-dom";

interface FundraisingCardProps {
	title: string
	organizer: string
	location: string
	goal: string
	completionDate: string
	requestGoalCurrentValue: number
	requestGoal: number
	contributorsCount: number
	requesterType: string
	helpType: string,
	id: string
}

const FundraisingCard: React.FC<FundraisingCardProps> = ({
	title,
	organizer,
	location,
	goal,
	completionDate,
	requestGoalCurrentValue,
	requestGoal,
	contributorsCount,
	requesterType,
	helpType,id
}) => {
	const getImageByRequestParams = (requesterType: string, helpType: string) => {
		if (requesterType === 'person' && helpType === 'finance') {
			return DementiaImage
		}
		if (requesterType === 'organization') {
			return NursingHomeImage
		}
		if (requesterType === 'person' && helpType === 'material') {
			return VolunteeringImage
		}
		// По умолчанию можно вернуть какое-то изображение
		return DementiaImage
	}
	const formattedCompletionDate = completionDate
		? format(new Date(completionDate), 'dd.MM.yyyy')
		: 'N/A'

	const navigate = useNavigate();

	return (
		<Card
			sx={{
				maxWidth: 304,
				borderRadius: 2,
				boxShadow: 3,
				height: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: 'column',
				padding: '16px'
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '0px'
				}}
			>
				<Box display='flex' justifyContent='center' mb={2}>
					<Avatar
						alt='request image'
						src={getImageByRequestParams(requesterType, helpType)}
						sx={{ width: 220, height: 220 }}
					/>
				</Box>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={2}
				>
					<Box
						display='flex'
						justifyContent='space-between'
						width='100% !important'
					>
						<Typography variant='h6' gutterBottom>
							{title}
						</Typography>
						<StarBorderIcon color='action' />
					</Box>
				</Box>

				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Организатор:</strong>
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					{organizer}
				</Typography>

				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Локация:</strong>
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					{location}
				</Typography>

				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Цель сбора:</strong>
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					{goal}
				</Typography>

				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Завершение:</strong>
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					{formattedCompletionDate}
				</Typography>

				<Divider sx={{ my: 2 }} />

				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Мы собрали:</strong>
				</Typography>
				<Typography>
					{requestGoalCurrentValue} из {requestGoal} руб.
				</Typography>
				<LinearProgress
					variant='determinate'
					value={
						requestGoal <= 0
							? 100
							: Math.min(100, (100 * requestGoalCurrentValue) / requestGoal)
					}
					sx={{ mt: 1, mb: 2 }}
				/>
			</CardContent>
			<CardActions
				sx={{
					height: 92,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: 0,
					alignItems: 'flex-start'
				}}
			>
				<Typography variant='body2' color='textSecondary'>
					Нас уже: {contributorsCount}
				</Typography>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					sx={{ marginBottom: '12px', marginLeft: '0px !important' }}
					onClick={() => {
						navigate(`/request/${id}`)
					}}
				>
					Помочь
				</Button>
			</CardActions>
		</Card>
	)
}

export default FundraisingCard
