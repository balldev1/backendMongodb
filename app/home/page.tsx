'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Product from '../components/Product';
import { Toaster, toast } from 'react-hot-toast';


const Home = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // รับ session เก็บไว้ localstorage

    useEffect(() => {
        // อ่านค่า session จาก local storage
        // อ่านค่า session จาก local storage
        const localSessionStr = localStorage.getItem('session');
        const localSession = localSessionStr ? JSON.parse(localSessionStr) : null;

        if (localSession) {
            // ถ้ามี session ใน localStorage ให้ใช้ session จาก localStorage

            // ลบ session หลังจาก 3 วินาที
            // ทำการลบ session ออกจาก localStorage
            // และทำการ redirect ไปยังหน้าที่ต้องการ
            //    { const timeoutId = setTimeout(() => {
            //         localStorage.removeItem('session');
            //         router.push('/');
            //     }, 3000);}

            // คืนค่าฟังก์ชันที่จะถูกเรียก
            // {return () => clearTimeout(timeoutId);}
        } else if (session) {
            // ถ้ามี session ให้บันทึก localsotrage
            localStorage.setItem('session', JSON.stringify(session));

        } else {
            // ถ้าไม่มีให้ไปหน้าแรก
            router.push('/');
        }
    }, [session, router]);



    // {ออกจากระบบลบค่า localStorage}
    const handleSignOut = () => {
        signOut();
        localStorage.removeItem('session');
    };

    // input name,title,description,remark
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [remark, setRemark] = useState('');


    const handleCreateProduct = useCallback(async () => {
        try {
            await axios.post('/api/createProduct', {
                name, title, description, remark,
            })
            toast.success('Create Successfully !')
            setTimeout(() => {
                window.location.reload(); // รีเฟสหน้าจอเมือมีการ CreateProduct
            }, 3000); // 3 วินาที

        } catch (error) {
            console.log('Something went wrong!')
        }
    }, [name, title, description, remark,])



    return (
        <div className='mx-5 my-5 flex flex-col items-center justify-center  border-2'>
            <Toaster />
            <p>Hello,{session?.user?.name}</p>
            <button onClick={handleSignOut}>Sign Out</button>

            <div className='mt-10 flex flex-col gap-2 '>

                <label>name</label>
                <input onChange={(e) => setName(e.target.value)}
                    type='text' value={name}
                    className='border-2 ml-5' />
                <label>title</label>
                <input onChange={(e) => setTitle(e.target.value)}
                    type='text' value={title}
                    className='border-2 ml-5' />
                <label>description</label>
                <input onChange={(e) => setDescription(e.target.value)}
                    type='text' value={description}
                    className='border-2 ml-5' />
                <label>remark</label>
                <input onChange={(e) => setRemark(e.target.value)}
                    type='text' value={remark}
                    className='border-2 ml-5' />


                <button onClick={handleCreateProduct}
                    type='submit' className='border-2 w-[100px] h-[50px] ml-20'>CREATE</button>

            </div>

            <div className='mt-5'>
                <Product />
            </div>
        </div>
    );
};

export default Home;

