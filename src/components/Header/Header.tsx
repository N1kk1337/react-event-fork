import React, { useState } from 'react'
import {
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	Typography,
	Container
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import '~/shared/styles/Header.css'
import { AuthServiceTokens } from '~/shared/utils/token.service.ts'
import { Logo } from '~/shared/assets/icons/Logo.tsx'

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const navigate = useNavigate()
	const open = Boolean(anchorEl)

	const token = AuthServiceTokens.getRefreshToken()
	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleLogout = () => {
		handleMenuClose()
		AuthServiceTokens.removerTokenFromStorage()
		navigate('/login')
	}

	return (
		<AppBar position='static' color='transparent'>
			<Container maxWidth='xl'>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						flex-grow='1'
					>
						<Link to={'/'}>
							<Logo />
						</Link>
					</IconButton>
					<Link
						flex-grow='1'
						to={'/'}
						style={{ textDecoration: 'none', color: 'black' }}
					>
						{'Запросы о помощи'}
					</Link>
					<IconButton flex-grow='1' onClick={event => handleMenuOpen(event)}>
						<Avatar />
					</IconButton>
					{token ? (
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleMenuClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						>
							<MenuItem component={Link} to='/user' onClick={handleMenuClose}>
								<ListItemIcon>
									<AccountCircle fontSize='small' />
								</ListItemIcon>
								<Typography variant='inherit'>Мой профиль</Typography>
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<Logout fontSize='small' />
								</ListItemIcon>
								<Typography variant='inherit'>Выйти</Typography>
							</MenuItem>
						</Menu>
					) : (
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleMenuClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						>
							<MenuItem component={Link} to='/login' onClick={handleMenuClose}>
								<Typography variant='inherit'>Войти</Typography>
							</MenuItem>
						</Menu>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
