'use client'
import Image from 'next/image'
import react, { useState, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Register = () => {

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [toggle, setToggle] = useState(false);

    const toggleLogin = () => {
        setToggle(true)
    }

    const toggleRegister = () => {
        setToggle(false)
    }


    const handleRegister = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                name, email, password
            });

            toast.success('Successfully !')
            setTimeout(() => {
                router.push('/login')  // สมัครสำเร็จ นำทางไปหน้า login
            }, 3000) // 3วิ
        } catch (error) {
            console.log('Email นี้ถูกใช้งานแล้ว');
            toast.error('something went wrong');
        }
    }, [email, name, password])

    return (
        <div className='flex flex-col justify-center items-center my-5 mx-5 gap-2'>
            <Toaster />
            <h1>register</h1>
            <div>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)}
                    type='text' value={name}
                    className='border-2 border-black ml-5' />
            </div>
            <div>
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                    type='email' value={email}
                    className='border-2 border-black ml-5' />
            </div>
            <div>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)}
                    type='password' value={password}
                    className='border-2 border-black ml-5' />
            </div>

            <button onClick={handleRegister}
                className='border-2 w-[60px] h-[60px] border-green-500'>test</button>
        </div>
    )
}

export default Register
