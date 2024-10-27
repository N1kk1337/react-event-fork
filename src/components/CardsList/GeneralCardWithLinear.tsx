import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid2,
	LinearProgress,
	Typography
} from '@mui/material'
import { HelpRequestCardType } from '~/pages/onerequers'

const GeneralCardWithLinear = ({
	title,
	goal,
	completionDate,
	collected,
	collectedGoal
}: HelpRequestCardType) => {
	return (
		<Card sx={{ maxWidth: 320, borderRadius: 2, boxShadow: 3, height: '100%' }}>
			<CardContent sx={{ paddingBottom: 0 }}>
				{title}
				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Цель сбора:</strong> {goal}
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					<strong>Завершение:</strong> {completionDate}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					<strong>Мы собрали:</strong>
				</Typography>
				<LinearProgress
					variant='determinate'
					value={60}
					sx={{ mt: 1, mb: 0 }}
				/>
				<Grid2 container>
					<Grid2 size={6}>
						<Typography color='textSecondary' fontSize={'14px'}>
							{collected}
						</Typography>
					</Grid2>
					<Grid2
						component={'div'}
						size={6}
						display={'flex'}
						justifyContent={'end'}
					>
						<Typography color='textSecondary' fontSize={'14px'}>
							{collectedGoal}
						</Typography>
					</Grid2>
				</Grid2>

				<Typography
					variant='body2'
					color='textSecondary'
					sx={{ marginTop: '15px' }}
				>
					Нас уже: 3 566 987
				</Typography>
			</CardContent>
			<CardActions>
				<Button fullWidth variant='contained' color='primary'>
					Помочь
				</Button>
			</CardActions>
		</Card>
	)
}

export default GeneralCardWithLinear