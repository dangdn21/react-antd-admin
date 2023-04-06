import api, { resetRetry } from './baseAPI'

interface LoginUser {
	username: string
	password: string
	role: string
}

async function login({ username, password, role }: LoginUser) {
	resetRetry()

	return api.post('/api/login', { username, password, role })
}

async function logout() {
	resetRetry()
	return api.post('/api/logout')
}

export default {
	login,
	logout
}
