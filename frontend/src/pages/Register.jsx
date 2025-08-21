import React,{useState}  from 'react'
import RegisterPic from '../assets/register.webp'
import {Link} from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login:",{name,email, password});
    }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-10'>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                <div className='flex justify-center mb-4'>
                    <h2 className='text-xl font-medium'>Rabbit</h2>
                </div>
                <h2 className='text-2xl font-bold mb-2 text-center'>Hey there!</h2>
                <p className='text-center mb-4'>Enter your details to register</p>
                <div className='mb-4'>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input type="text" className='w-full rounded border p-1.5' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='mb-4'>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" className='w-full rounded border p-1.5' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='mb-5'>
                    <label className='block text-sm font-semibold mb-2'>Password</label>
                    <input type="password" className='w-full rounded border p-1.5' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className='w-full bg-black text-white p-2 rounded font-semibold hover:bg-gray-800 transition'>Sign In</button>
                <p className='mt-6 text-center text-sm'>Already have an account?&nbsp;
                    <Link to='/login' className='text-rabbit-red underline'>Login</Link>
                </p>
            </form>
        </div>

        <div className='hidden md:block w-1/2  bg-gray-600'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={RegisterPic} alt="Register Account" className='h-[600px] w-full object-cover'/>
            </div> 
        </div>
    </div>
  )
}

export default Register