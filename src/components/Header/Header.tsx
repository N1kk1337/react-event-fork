import React, { useState } from 'react'
import {
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	Typography
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
		<div className='headerContainer'>
			<AppBar position='static' color='transparent' className='header'>
				<Toolbar className='toolbar'>
					<Link to={'/'} className='logoContainer'>
						<Logo />
					</Link>
					<div className='headerBlock'>
						<Link to={'/'} className='headerLink'>
							Запросы о помощи
						</Link>
						<IconButton
							sx={{ padding: '0 !important' }}
							onClick={event => handleMenuOpen(event)}
						>
							<Avatar className='profileAvatar' />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleMenuClose}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						>
							{token ? (
								<MenuItem
									sx={{
										display: 'flex',
										flexDirection: 'column'
									}}
								>
									<MenuItem
										component={Link}
										to='/user'
										onClick={handleMenuClose}
										sx={{
											width: '100%',

											display: 'flex'
										}}
									>
										<ListItemIcon>
											<AccountCircle fontSize='small' />
										</ListItemIcon>
										<Typography variant='inherit'>Мой профиль</Typography>
									</MenuItem>
									<MenuItem
										onClick={handleLogout}
										sx={{
											width: '100%',
											display: 'flex'
										}}
									>
										<ListItemIcon>
											<Logout fontSize='small' />
										</ListItemIcon>
										<Typography variant='inherit'>Выйти</Typography>
									</MenuItem>
								</MenuItem>
							) : (
								<MenuItem
									component={Link}
									to='/login'
									onClick={handleMenuClose}
								>
									<Typography variant='inherit'>Войти</Typography>
								</MenuItem>
							)}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
