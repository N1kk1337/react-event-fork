import { useState } from 'react'
import CardsList from '~/components/CardsList/CardsList'
import SearchBar from '~/components/CardsList/SearchBar'
import { CardListFilters } from '~/components/test/CardListFilters'

import { Box, Container, Typography } from '@mui/material'
import { FilterCriteria, HelpRequest } from '~/shared/types/HelpRequest.types'
import { useGetAllCardsQuery } from '~/app/store/api/helpRequestsApi'

function Main() {
	const [searchTerm, setSearchTerm] = useState('')

	const { data: helpRequests, isLoading, isError } = useGetAllCardsQuery()

	const filteredRequests =
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

	const [filters, setFilters] = useState<FilterCriteria>({})

	const handleSearchChange = (value: string) => {
		setSearchTerm(value)
	}

	const handleFiltersChange = (newFilters: FilterCriteria) => {
		setFilters(newFilters)
	}

	return (
		<Container
			sx={{
				maxWidth: '1500px !important',
				width: '100%',
				padding: '30px 40px'
			}}
		>
			<Typography variant='h3'>Запросы о помощи</Typography>

			<Box display='flex' justifyContent={'space-between'}>
				<CardListFilters filters={filters} onChange={handleFiltersChange} />
				<Box
					sx={{
						width: '100%'
					}}
				>
					<Box display='flex'>
						<SearchBar value={searchTerm} onChange={handleSearchChange} />
					</Box>

					<CardsList requests={filteredRequests} />
				</Box>
			</Box>
		</Container>
	)
}

export default Main
