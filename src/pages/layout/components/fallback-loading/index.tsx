import React, { FC } from 'react'
import { Spin, Alert } from 'antd'

interface FallbackMessageProps {
	message: string
	description?: string
}

const SuspendFallbackLoading: FC<FallbackMessageProps> = ({ message, description }) => {
	return <Spin className="fallback-loading" tip="Loading..." />
}

export default SuspendFallbackLoading
