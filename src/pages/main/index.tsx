import { useState } from 'react'
import CardsList from '~/components/CardsList/CardsList'
import SearchBar from '~/components/CardsList/SearchBar'
import { CardListFilters } from '~/components/test/CardListFilters'

import { Box, Container, Typography } from '@mui/material'
import { FilterCriteria } from '~/shared/types/HelpRequest.types'

function App() {
	const [searchTerm, setSearchTerm] = useState('')

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

					<CardsList searchTerm={searchTerm} filters={filters} />
				</Box>
			</Box>
		</Container>
	)
}

export default App
