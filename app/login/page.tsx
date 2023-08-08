'use client'
import react, { useCallback, useState, useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleLogin = async () => {
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            // รับผลลัพธ์ result และดำเนินการตามต้องการ
            if (result?.error) {
                toast.error('something went wrong !')
                console.log('ไม่มี email , password ในฐานข้อมูล');
            } else {
                toast.success('Login successful!');
                setTimeout(() => {
                    router.push('/home'); // ลงชื่อเข้าใช้สำเร็จ นำทางไปยังหน้าหลัก
                }, 3000); // 3 วินาที
            }
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center my-5 mx-5 gap-2'>
            <Toaster />
            <h1>login</h1>
            <div>
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                    type='text' value={email}
                    className='border-2 border-black ml-5' />
            </div>
            <div>
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)}
                    type='password' value={password}
                    className='border-2 border-black ml-5' />
            </div>

            <button onClick={handleLogin}
                className='border-2 w-[60px] h-[60px] border-green-500'>login</button>
        </div>
    )
}

export default Login
