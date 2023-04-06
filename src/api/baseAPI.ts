/* eslint-disable no-unsafe-finally */
import axios from 'axios'

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function timeDelay(k: number) {
	const base_interval = 0.5
	const base_multiplier = 1.5
	const retry_interval = base_interval * base_multiplier ** (k - 1) * 1000
	const max = k === 5 ? 500 : retry_interval
	return retry_interval + randomInt(0, max)
}

function wait(delay: number) {
	return new Promise((resolve) => setTimeout(resolve, delay))
}

let _retry_count = 0
let _retry = null

export function resetRetry() {
	_retry_count = 0
}

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': import.meta.env.VITE_API_KEY
	}
})

instance.interceptors.response.use(
	(resp: any) => resp,
	async (err: any) => {
		const origReqConfig = err.config

		if (err.response.status >= 500 && _retry_count < 4) {
			_retry_count++

			return wait(timeDelay(_retry_count)).then(() => instance.request(origReqConfig))
		}

		if (err.response.status === 401 && origReqConfig.headers.hasOwnProperty('Authorization')) {
			const rtoken = localStorage.getItem('refresh-token') || ''
			if (rtoken && _retry_count < 4) {
				_retry_count++

				delete origReqConfig.headers['Authorization']

				_retry = refresh(rtoken)
					.finally(() => (_retry = null))
					.catch((error) => Promise.reject(error))

				return _retry.then((token) => {
					origReqConfig.headers['Authorization'] = `Bearer ${token}`
					return instance.request(origReqConfig)
				})
			}
		}

		return Promise.reject(err)
	}
)

const refresh = async (rtoken: string) => {
	let _rtoken = ''
	let _token = ''

	const params = { rtoken: rtoken }
	const headers = { headers: { 'x-api-key': import.meta.env.VITE_API_KEY } }

	try {
		const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/refresh3.php`, params, headers)

		_rtoken = response.data.rtoken
		_token = response.data.token

		localStorage.setItem('refresh-token', _rtoken)
		sessionStorage.setItem('auth-token', _token)
	} catch (error) {
		return error
	} finally {
		return _token
	}
}

export default instance
