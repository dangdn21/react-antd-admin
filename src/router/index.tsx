import React, { lazy, FC } from 'react'
import { PartialRouteObject } from 'react-router'
import WrapperRouteComponent from './config'
import { useRoutes } from 'react-router-dom'
import LoginPage from '@pages/login'
import LayoutPage from '@pages/layout'

const NotFound = lazy(() => import('@pages/not-found'))
const OrderMangeList = lazy(() => import('@pages/order-manage/list'))
const OrderMangeDetail = lazy(() => import('@pages/order-manage/detail'))
const SupplierList = lazy(() => import('@pages/supplier-manage/list'))
const SupplierDetail = lazy(() => import('@pages/supplier-manage/detail'))
const SupplierAdd = lazy(() => import('@pages/supplier-manage/add'))

const routeList: PartialRouteObject[] = [
	{
		path: '/login',
		element: <WrapperRouteComponent element={<LoginPage />} titleId="Login" />
	},
	{
		path: '/',
		element: <WrapperRouteComponent element={<LayoutPage />} titleId="Home" auth />,
		children: [
			{
				path: 'order-list',
				element: <WrapperRouteComponent element={<OrderMangeList />} titleId="Order List" auth />
			},
			{
				path: 'order-detail',
				element: <WrapperRouteComponent element={<OrderMangeDetail />} titleId="Order Detail" auth />
			},
			{
				path: 'supplier-list',
				element: <WrapperRouteComponent element={<SupplierList />} titleId="Supplier List" auth />
			},
			{
				path: 'supplier-detail',
				element: <WrapperRouteComponent element={<SupplierDetail />} titleId="Supplier Detail" auth />
			},
			{
				path: 'supplier-add',
				element: <WrapperRouteComponent element={<SupplierAdd />} titleId="Supplier add" auth />
			},
			{
				path: '*',
				element: <WrapperRouteComponent element={<NotFound />} titleId="404" />
			}
		]
	}
]

const RenderRouter: FC = () => {
	const element = useRoutes(routeList)
	return element
}

export default RenderRouter
