import { createContext, ReactNode, useEffect, useState } from 'react'
import User from '@/types/User'
import axios from 'axios'

type Props = {
	children: ReactNode
}

type IUserContext = {
	users: User[]
}

const baseUrl = 'http://localhost:8000/api'

export const UserContext = createContext({} as IUserContext)

export function UserProvider({ children }: Props) {
	const [users, setUsers] = useState([] as User[])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(baseUrl + '/usuarios/', {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				setUsers(response.data)
			} catch (error) {
				console.error('There was an error fetching the users:', error)
			}
		}

		fetchUsers()
	}, [])

	return (
		<UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
	)
}
