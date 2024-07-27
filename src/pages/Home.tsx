import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { PlusCircle, Search } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { FormEvent, useState } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'

function Home() {
	const [userName, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { users } = useUser()

	async function createUser(event: FormEvent) {
		event.preventDefault()

		const user = { userName, password, active: true }

		try {
			const response = await axios.post(baseUrl + '/usuarios/', user)

			if (response.status === 201) {
				console.log('User created successfully')
			} else {
				console.error('Error')
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div className="p-6 max-w-6xl mx-auto space-y-6">
			<h1 className="text-3xl font-bold">Users</h1>

			<div className="flex justify-between">
				<form action="" className="flex gap-2">
					<Input type="text" placeholder="User ID" className="w-auto" />
					<Button variant="link">
						<Search className="w-4 h-4 mr-2" />
						Filter results
					</Button>
				</form>
				<Dialog>
					<DialogTrigger>
						<Button>
							<PlusCircle className="w-4 h-4 mr-2" />
							New user
						</Button>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create new user</DialogTitle>
							<DialogDescription>
								Here you can create a new user to system
							</DialogDescription>
						</DialogHeader>

						<form className="space-y-3" onSubmit={event => createUser(event)}>
							<div className="grid grid-cols-4 items-center gap-2">
								<Label className="text-right">Username</Label>
								<Input
									type="username"
									className="col-span-3"
									onChange={e => setUsername(e.target.value)}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-2">
								<Label className="text-right">Password</Label>
								<Input
									type="password"
									className="col-span-3"
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<DialogFooter>
								<DialogClose>
									<Button variant="outline">Cancel</Button>
									<Button type="submit">Create user</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="border rounded">
				<Table>
					<TableHeader>
						<TableHead>ID</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>Password</TableHead>
						<TableHead>Active</TableHead>
						<TableHead>Created At</TableHead>
					</TableHeader>

					<TableBody>
						{users.map(user => {
							return (
								<TableRow key={user.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.userName}</TableCell>
									<TableCell>{user.password}</TableCell>
									<TableCell>{user.active ? '✅' : '❌'}</TableCell>
									<TableCell>
										{new Date(user.datecreatedAt).toLocaleDateString()}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
export default Home
