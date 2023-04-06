import { FileTextOutlined, InboxOutlined } from '@ant-design/icons'

export interface MenuItem {
	key: string
	title: { en_US: string }
	icon?: React.ReactNode
	path?: string
	children?: MenuItem[]
	component?: React.ComponentType<any>
}

const MENU_CONFIG: MenuItem[] = [
	{
		key: '1',
		icon: FileTextOutlined,
		title: {
			en_US: 'order management'
		},
		children: [
			{
				key: '1-1',
				title: {
					en_US: 'order list'
				},
				path: '/order-list'
			},
			{
				key: '1-2',
				title: {
					en_US: 'second level menu'
				},
				children: [
					{
						key: '1-2-1',
						title: {
							en_US: 'three level menu'
						},
						path: '/order-detail'
					}
				]
			}
		]
	},
	{
		key: '2',
		icon: InboxOutlined,
		title: {
			en_US: 'supplier management'
		},
		children: [
			{
				key: '2-1',
				title: {
					en_US: 'supplier list'
				},
				path: '/supplier-list'
			},
			{
				key: '2-2',
				title: {
					en_US: 'supplier second level menu'
				},
				children: [
					{
						key: '2-2-1',
						title: {
							en_US: 'supplier detail'
						},
						path: '/supplier-detail'
					},
					{
						key: '2-2-2',
						title: {
							en_US: 'add supplier'
						},
						path: '/supplier-add'
					}
				]
			}
		]
	}
]

export default MENU_CONFIG
