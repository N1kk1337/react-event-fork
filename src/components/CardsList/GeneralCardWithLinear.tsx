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
import { calculatePercentage } from '~/shared/utils/mathUtils.tsx'

const GeneralCardWithLinear = ({
	title,
	goal,
	completionDate,
	collected,
	collectedGoal,
	contributorsCount
}: HelpRequestCardType) => {
	return (
		<Card sx={{ maxWidth: 320, borderRadius: 2, boxShadow: 3, ml: 4 }}>
			<CardContent sx={{ paddingBottom: 0 }}>
				{title}
				<Typography
					variant='body2'
					color='textSecondary'
					gutterBottom
					marginBottom={3}
					marginTop={1}
				>
					<strong>Цель сбора:</strong> {goal}
				</Typography>
				<Typography
					variant='body2'
					color='textSecondary'
					gutterBottom
					marginBottom={3}
				>
					<strong>Завершение:</strong> {completionDate}
				</Typography>
				<Typography variant='body2' color='textSecondary'>
					<strong>Мы собрали:</strong>
				</Typography>
				<LinearProgress
					variant='determinate'
					value={calculatePercentage({
						totalValue: Number(collected),
						currentValue: Number(collectedGoal)
					})}
					sx={{ mt: 1, mb: 0 }}
				/>
				<Grid2 container>
					<Grid2 size={6}>
						<Typography
							color='textSecondary'
							fontSize={'14px'}
							marginBottom={3}
						>
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
					Нас уже: {contributorsCount}
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
