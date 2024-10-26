import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { UserFieldsInfo } from '../../shared/assets/icons/UserFieldsInfo.tsx'
import { useLoginMutation } from '~/app/store/api/login.ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthServiceTokens } from '~/shared/utils/token.service.ts'

export const Index = ({
	title,
	login,
	password
}: {
	title: string
	login: string
	password: string
}) => {
	const [mutate] = useLoginMutation()
	const navigate = useNavigate()

	const loginTestUser = async () => {
		mutate({ login, password })
			.then(
				({ data }) =>
					data !== undefined &&
					(AuthServiceTokens.saveRefreshTokenToStorage(data.token),
					navigate('/'),
					toast.success('Вы успешно авторизовались'))
			)
			.catch(() => toast.error('не получилось авторизоваться'))
	}
	return (
		<Box
			onClick={() => loginTestUser()}
			sx={{
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				gap: '30px',
				mt: '90px',
				maxWidth: '320px',
				width: '100%'
			}}
		>
			<Card
				sx={{ padding: '6px 16px', color: '', display: 'flex', gap: '12px' }}
			>
				<UserFieldsInfo />
				<Box>
					<Typography variant='h6' component='h2'>
						{title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '2px'
						}}
					>
						<Typography variant='body1' component='span'>
							Логин: {login}
						</Typography>
						<Typography variant='body1' component='span'>
							Пароль: {password}
						</Typography>
					</Box>
				</Box>
			</Card>
		</Box>
	)
}
