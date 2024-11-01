import Cookies from 'js-cookie'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const AuthServiceTokens = {
	saveRefreshTokenToStorage: (refreshToken: string) => {
		Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
			expires: 60 * 59,
			sameSite: 'none',
			secure: true
		})
	},
	getRefreshToken: () => Cookies.get(EnumTokens.REFRESH_TOKEN),
	getAccessToken: () => Cookies.get(EnumTokens.ACCESS_TOKEN),
	removerTokenFromStorage: () => {
		Cookies.remove(EnumTokens.REFRESH_TOKEN)
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
	},

	logout: () => {
		AuthServiceTokens.removerTokenFromStorage()
		localStorage.removeItem('user')
	}
}
