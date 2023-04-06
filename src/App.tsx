import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { localeConfig } from './locales'
import { ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import RenderRouter from './router'
import useStore from './stores/user'

export type Locale = 'en_US'

function App() {
	const locale = useStore((state) => state.locale)

	const getAntdLocale = () => {
		if (locale === 'en_US') {
			return enUS
		}
		return enUS
	}

	return (
		<ConfigProvider locale={getAntdLocale()} componentSize="middle">
			<IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
				<BrowserRouter>
					<RenderRouter />
				</BrowserRouter>
			</IntlProvider>
		</ConfigProvider>
	)
}

export default App
