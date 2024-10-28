import React, { ReactNode, useState } from 'react'
import { Button, Typography, Tabs, Tab, IconButton, Box } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PlaceIcon from '@mui/icons-material/Place'
import './ProfileSection.css'
import Map from './Map'
import { UserType } from '~/shared/types/User.type'
import { TelegramIcon } from '~/shared/assets/images/telegram.tsx'
import { WhatsappIcon } from '~/shared/assets/images/whatsapp.tsx'
import { VkIcon } from '~/shared/assets/images/vk.tsx'
import { UserAvatar } from '~/shared/assets/images/userAvatar.tsx'
const ProfileSection: React.FC<{
	userData: UserType
}> = ({ userData }) => {
	const [selectedTab, setSelectedTab] = useState(0)
	const [selectedIconTab, setSelectedIconTab] = useState(0)

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
		setSelectedTab(newValue)
	const handleIconTabChange = (index: number) => setSelectedIconTab(index)

	return (
		<div className='profileContainer'>
			<Typography variant='h4' className='profileTitle'>
				Мой профиль
			</Typography>
			<div className='profileSection'>
				<ProfileSidebar userData={userData} />

				<div className='profileContent'>
					<Tabs
						value={selectedTab}
						onChange={handleTabChange}
						className='profileTabs'
					>
						<Tab label='Личные данные' />
						<Tab label='Контакты' />
						<Tab label='Избранное' />
					</Tabs>

					<div className='tabContent'>
						{selectedTab === 0 && <PersonalData userData={userData} />}
						{selectedTab === 1 && <ContactInfo userData={userData} />}
						{selectedTab === 2 && (
							<FavoritesTab
								selectedIconTab={selectedIconTab}
								onIconTabChange={handleIconTabChange}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const ProfileSidebar: React.FC<{
	userData: UserType
}> = ({ userData }) => (
	<div className='profileSidebar'>
		<UserAvatar />
		<div className='userInfoBlock'>
			<Typography variant='h6' className='userName'>
				{userData.name + ' ' + userData.lastName}
			</Typography>
			<Typography variant='body2' className='userStatus'>
				<span className='label'>Статус:</span> {userData.status}
			</Typography>
		</div>
		<Button variant='outlined' className='logoutButton'>
			Выйти из аккаунта
		</Button>
	</div>
)

const PersonalData: React.FC<{
	userData: UserType
}> = ({ userData }) => {
	const birthDate = new Date(userData.birthdate)
	return (
		<>
			<Section title='Профиль'>
				<InfoItem label='Фамилия' value={userData.lastName} />
				<InfoItem label='Имя' value={userData.name} />
			</Section>
			<Section title='Дата рождения'>
				<Typography variant='body2'>
					{birthDate.toLocaleDateString('ru-RU')}
				</Typography>
			</Section>
			<Section title='Локация для помощи'>
				{userData.baseLocations.map(location => (
					<div
						key={location.latitude + location.longitude}
						style={{ marginBottom: '20px' }}
					>
						<InfoItem label='Область' value={location.district} />
						<InfoItem label='Населенный пункт' value={location.city} />
					</div>
				))}
			</Section>
			<Section title='Образование'>
				{userData.educations.map(education => (
					<div
						key={education.organizationName + education.specialization}
						style={{ marginBottom: '20px' }}
					>
						<InfoItem label='Учреждение' value={education.organizationName} />
						<InfoItem label='Уровень образования' value={education.level} />
						<InfoItem label='Направление' value={education.specialization} />
						<InfoItem
							label='Год окончания'
							value={education.graduationYear.toString()}
						/>
					</div>
				))}
			</Section>
			<Section title='Обо мне'>
				<Typography variant='body2' className='aboutMeText'>
					{userData.additionalInfo}
				</Typography>
			</Section>
		</>
	)
}

const ContactInfo: React.FC<{
	userData: UserType
}> = ({ userData }) => (
	<>
		<Section title='E-mail'>
			<Typography variant='body2'>{userData.contacts.email}</Typography>
		</Section>
		<Section title='Телефон'>
			<Typography variant='body2'>{userData.contacts.phone}</Typography>
		</Section>
		<Section title='Социальные сети'>
			<SocialLink
				href={userData.contacts.social.vk}
				Icon={<VkIcon />}
				label='VKontakte'
			/>
			<SocialLink
				href={userData.contacts.social.telegram}
				Icon={<TelegramIcon />}
				label='Telegram'
			/>
			<SocialLink
				href={userData.contacts.social.whatsapp}
				Icon={<WhatsappIcon />}
				label='WhatsApp'
			/>
		</Section>
	</>
)

const FavoritesTab: React.FC<{
	selectedIconTab: number
	onIconTabChange: (index: number) => void
}> = ({ selectedIconTab, onIconTabChange }) => (
	<>
		<div className='iconTabsContainer'>
			<IconButton
				onClick={() => onIconTabChange(0)}
				className={selectedIconTab === 0 ? 'iconTab selected' : 'iconTab'}
				sx={{
					border: selectedIconTab === 0 ? '1px solid' : '1px solid #f5f5f5',
					backgroundColor: selectedIconTab === 0 ? '#e0e0e0' : '#fff',
					borderRadius: '4px 0 0 4px',
					padding: '4px',
					'&:hover': {
						backgroundColor: '#e0e0e0'
					}
				}}
			>
				<GridViewIcon />
			</IconButton>
			<IconButton
				onClick={() => onIconTabChange(1)}
				className={selectedIconTab === 1 ? 'iconTab selected' : 'iconTab'}
				sx={{
					border: selectedIconTab === 1 ? '1px solid' : '1px solid #f5f5f5',
					backgroundColor: selectedIconTab === 1 ? '#e0e0e0' : '#fff',
					borderRadius: '0',
					padding: '4px',
					'&:hover': {
						backgroundColor: '#e0e0e0'
					}
				}}
			>
				<ListAltIcon />
			</IconButton>
			<IconButton
				onClick={() => onIconTabChange(2)}
				className={selectedIconTab === 2 ? 'iconTab selected' : 'iconTab'}
				sx={{
					border: selectedIconTab === 2 ? '1px solid' : '1px solid #f5f5f5',
					backgroundColor: selectedIconTab === 2 ? '#e0e0e0' : '#fff',
					borderRadius: '0 4px 4px 0',
					padding: '4px',
					'&:hover': {
						backgroundColor: '#e0e0e0'
					}
				}}
			>
				<PlaceIcon />
			</IconButton>
		</div>
		<div className='innerTabContent'>
			{selectedIconTab === 0 && <FavoritesObjects />}
			{selectedIconTab === 1 && <FavoritesDocuments />}
			{selectedIconTab === 2 && <FavoritesLocations />}
		</div>
	</>
)

const FavoritesObjects: React.FC = () => (
	<div className='favoritesContent'>{/* Компонент*/}</div>
)

const FavoritesDocuments: React.FC = () => (
	<div className='favoritesContent'>{/* Компонент*/}</div>
)

const FavoritesLocations: React.FC = () => (
	<div className='favoritesContent'>
		<Map />
	</div>
)

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
	title,
	children
}) => (
	<div className='infoBlock'>
		<Typography variant='h6' className='sectionTitle'>
			{title}
		</Typography>
		{children}
	</div>
)

const InfoItem: React.FC<{ label: string; value: string }> = ({
	label,
	value
}) => (
	<Typography variant='body2'>
		<span className='label'>{label}:</span> {value}
	</Typography>
)

const SocialLink: React.FC<{
	href: string
	Icon: ReactNode
	label: string
}> = ({ href, Icon, label }) => (
	<a href={href} className='socialLink'>
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
			{Icon}
			<span>{label}</span>
		</Box>
	</a>
)

export default ProfileSection
