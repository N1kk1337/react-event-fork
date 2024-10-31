import {
	styled,
	Container,
	Typography,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Paper,
	Stack,
	TextField,
	InputAdornment,
	Button
} from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { FilterCriteria } from '~/shared/types/HelpRequest.types'

interface CardListFiltersProps {
	filters: FilterCriteria
	onChange: (filters: FilterCriteria) => void
}
export const CardListFilters: React.FC<CardListFiltersProps> = ({
	filters,
	onChange
}) => {
	const handleCheckboxChange = (
		category: keyof FilterCriteria,
		value: string
	) => {
		const currentValues = Array.isArray(filters[category])
			? (filters[category] as string[])
			: []
		const updatedCategories = currentValues.includes(value)
			? currentValues.filter(item => item !== value)
			: [...currentValues, value]

		const updatedFilters = {
			...filters,
			[category]: updatedCategories
		}

		return updatedFilters
	}

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...filters,
			date: event.target.value
		})
	}

	const handleReset = () => {
		const resetFilters: FilterCriteria = {
			categories: [],
			specialization: [],
			format: [],
			volunteerType: [],
			date: ''
		}
		onChange(resetFilters)
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: 'rgba(245, 245, 245, 1)',
		...theme.typography.body1,
		boxShadow: 'none',
		textAlign: 'left',
		noWrap: true,
		...theme.applyStyles('dark', {
			backgroundColor: '#1A2027'
		})
	}))

	return (
		<div>
			<Container
				className='cardListFilters'
				disableGutters
				sx={{ maxWidth: 320, bgcolor: 'background.paper', p: 2.5 }}
			>
				<Typography variant='h6'>Фильтрация</Typography>
				<Typography variant='body1' color='rgba(0, 0, 0, 0.6)' sx={{ mt: 3 }}>
					Кому мы помогаем
				</Typography>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={
									Array.isArray(filters.categories) &&
									filters.categories.includes('Пенсионеры')
								}
								onChange={() =>
									handleCheckboxChange('categories', 'Пенсионеры')
								}
							/>
						}
						sx={{ ml: 0.25 }}
						label='Пенсионеры'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={
									Array.isArray(filters.categories) &&
									filters.categories.includes('Дома престарелых')
								}
								onChange={() =>
									handleCheckboxChange('categories', 'Дома престарелых')
								}
							/>
						}
						sx={{ ml: 0.25 }}
						label='Дома престарелых'
					/>
				</FormGroup>
				<Typography color='rgba(0, 0, 0, 0.6)' sx={{ mt: 3 }}>
					Чем мы помогаем
				</Typography>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={
									Array.isArray(filters.categories) &&
									filters.categories.includes('Вещи')
								}
								onChange={() => handleCheckboxChange('categories', 'Вещи')}
							/>
						}
						sx={{ ml: 0.25 }}
						label='Вещи'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={
									Array.isArray(filters.categories) &&
									filters.categories.includes('Финансирование')
								}
								onChange={() =>
									handleCheckboxChange('categories', 'Финансирование')
								}
							/>
						}
						sx={{ ml: 0.25 }}
						label='Финансирование'
					/>
				</FormGroup>
				<Accordion
					className='accordion-volunteering'
					disableGutters
					expanded
					sx={{
						boxShadow: 'none',
						boxSizing: 0
					}}
				>
					<AccordionSummary
						aria-controls='volunteering'
						id='volunteering'
						sx={{ border: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
					>
						<Typography sx={{ ml: 3.5 }}>Волонтерство</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}>
						<Stack spacing={2} sx={{ ml: 3.5 }}>
							<Item>
								<Typography color='rgba(0, 0, 0, 0.6)'>
									Специализация
								</Typography>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.specialization) &&
													filters.specialization.includes('Квалифицированная')
												}
												onChange={() =>
													handleCheckboxChange(
														'specialization',
														'Квалифицированная'
													)
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Квалифицированная'
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.specialization) &&
													filters.specialization.includes(
														'Не требует профессии'
													)
												}
												onChange={() =>
													handleCheckboxChange(
														'specialization',
														'Не требует профессии'
													)
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Не требует профессии'
									/>
								</FormGroup>
							</Item>
							<Item>
								<Typography color='rgba(0, 0, 0, 0.6)'>Формат</Typography>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.format) &&
													filters.format.includes('Онлайн')
												}
												onChange={() =>
													handleCheckboxChange('format', 'Онлайн')
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Онлайн'
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.format) &&
													filters.format.includes('Офлайн')
												}
												onChange={() =>
													handleCheckboxChange('format', 'Офлайн')
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Офлайн'
									/>
								</FormGroup>
							</Item>
							<Item>
								<Typography color='rgba(0, 0, 0, 0.6)'>
									Необходимо волонтеров
								</Typography>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.volunteerType) &&
													filters.volunteerType.includes('Группа')
												}
												onChange={() =>
													handleCheckboxChange('volunteerType', 'Группа')
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Группа'
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													Array.isArray(filters.volunteerType) &&
													filters.volunteerType.includes('Один')
												}
												onChange={() =>
													handleCheckboxChange('volunteerType', 'Один')
												}
											/>
										}
										sx={{ ml: 0.25, mr: 0 }}
										label='Один'
									/>
								</FormGroup>
							</Item>
						</Stack>
					</AccordionDetails>
				</Accordion>
				<Typography color='rgba(0, 0, 0, 0.6)' sx={{ mt: 2.5 }}>
					Помощь актуальна до:
				</Typography>
				<TextField
					fullWidth
					id='date-of-relevance'
					label='Выберите дату'
					type='date'
					variant='outlined'
					size='small'
					sx={{ mt: 1.25, mb: 5 }}
					value={filters.date || ''}
					onChange={handleDateChange}
					InputLabelProps={{
						shrink: true
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<DateRangeIcon />
							</InputAdornment>
						)
					}}
				/>
				<Button
					fullWidth
					variant='outlined'
					sx={{ color: 'black', borderColor: 'black', p: 1 }}
					onClick={handleReset}
				>
					Сбросить
				</Button>
			</Container>
		</div>
	)
}

export default CardListFilters
