import { useState } from 'react'
import CardsList from '~/components/CardsList/CardsList'
import SearchBar from '~/components/CardsList/SearchBar'
import { CardListFilters } from '~/components/test/CardListFilters'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'

import { Box, Button, Container, Typography } from '@mui/material'
import { FilterCriteria } from '~/shared/types/HelpRequest.types'

function App() {
	const [searchTerm, setSearchTerm] = useState('')

	const [filters, setFilters] = useState<FilterCriteria>({})

	const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical')

	const handleSearchChange = (value: string) => {
		setSearchTerm(value)
	}

	const handleFiltersChange = (newFilters: FilterCriteria) => {
		setFilters(newFilters)
	}

	const toggleLayout = () => {
		setLayout(prevLayout =>
			prevLayout === 'horizontal' ? 'vertical' : 'horizontal'
		)
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
						<Button onClick={toggleLayout} variant='contained' sx={{ mb: 2 }}>
							{layout === 'horizontal' ? (
								<Box display='flex' alignItems='center'>
									<GridViewIcon sx={{ mr: 1 }} />
									<Typography>Переключить вид на вертикальный</Typography>
								</Box>
							) : (
								<Box display='flex' alignItems='center'>
									<ViewListIcon sx={{ mr: 1 }} />
									<Typography>Переключить вид на горизонтальный</Typography>
								</Box>
							)}
						</Button>
					</Box>

					<CardsList
						layout={layout}
						searchTerm={searchTerm}
						filters={filters}
					/>
				</Box>
			</Box>
		</Container>
	)
}

export default App
