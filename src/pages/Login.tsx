import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Login() {
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col">
			<h1 className="text-3xl font-bold mb-3">Login</h1>

			<form className='space-y-3'>
				<Input type="text" placeholder="Username" />
				<Input type="password" placeholder="Password" />
				<Button className="w-full">Login</Button>
			</form>
		</div>
	)
}
export default Login
