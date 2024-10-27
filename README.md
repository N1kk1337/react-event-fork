# React event 2024 team number 2

Мы сделали Аутентификацию с приватными роутами и добавили карточки уже готовых пользователей, 
на каточку можно нажать и произойдет вход

```ts 
export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPageLayout />,
		children: [
			{
				index: true,
				element: <PrivateRoute element={<Main />} />
	},
	{
		path: '/user',
		element: <PrivateRoute element={<UserProfilePage />} />
},
{
	path: '/login',
		element: <Login />
},
{
	path: '/request/:id',
		element: <PrivateRoute element={<HelpRequestPage />} />
}
]
}
])
```


Сделали получение всех видов помощи в каталоге со всеми фильтрами и пагинацией

Добавили переход по 1 виду помощи(грузит со 2 раза)

Добавили профиль пользователя с его данными,
избранным (обычные все виды помощи как в каталоге) и карту обычную



