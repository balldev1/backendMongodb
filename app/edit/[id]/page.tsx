'use client'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Edit = ({ params: { id } }) => {

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [remark, setRemark] = useState('');
    const [getProduct, setGetProduct] = useState<typeof Edit[]>([]);
    const router = useRouter();
    console.log(getProduct)
    console.log(id)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getProductUser/?id=${id}`);
                const data = await response.json();
                setGetProduct(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (productId: string) => {
        try {

            const shouldEdit = window.confirm("คุณต้องการแก้ไขสินค้านี้ใช่หรือไม่?");
            if (!shouldEdit) {
                return; // ไม่ดำเนินการแก้ไขถ้าผู้ใช้ไม่ยืนยัน
            }


            const updatedData = {
                name: name,
                title: title,
                description: description,
                remark: remark,
            };

            await axios.patch(`/api/editProductUser?id=${productId}`, updatedData)

            // const updatedProducts = getProduct.filter(product => productId);

            toast.success('Edit successfully')
            setTimeout(() => {
                router.push('/home')
            }, 3000);
        } catch (error) {
            console.error('Delete error:', error);
        }
    }

    const handleBack = () => {
        toast.loading('Wait .. .', { duration: 3000 })
        setTimeout(() => {
            router.push('/home')
        }, 3000);
    }


    return (
        <div className='mx-5 my-5 flex flex-col items-center justify-center border-2'>
            <Toaster />
            <p>Hello, name</p>
            <button>Sign Out</button>
            {getProduct.map((product: any, i) => (
                <div className='mt-10 flex flex-col gap-2' key={i}>
                    <p>สินค้าชิ้นที่ {i + 1}</p>
                    <label>name</label>
                    <input onChange={(e) => setName(e.target.value)}
                        defaultValue={product.name}
                        type='text' className='border-2 ml-5' />
                    <label>title</label>
                    <input onChange={(e) => setTitle(e.target.value)}
                        defaultValue={product.title}
                        type='text' className='border-2 ml-5' />
                    <label>description</label>
                    <input onChange={(e) => setDescription(e.target.value)}
                        defaultValue={product.description}
                        type='text' className='border-2 ml-5' />
                    <label>remark</label>
                    <input onChange={(e) => setRemark(e.target.value)}
                        defaultValue={product.remark}
                        type='text' className='border-2 ml-5' />


                    <button onClick={() => handleEdit(product.id)} type='submit' className='border-2 w-[100px] h-[50px] ml-20'>
                        Update
                    </button>
                    <button onClick={handleBack} className='border-2 w-[100px] h-[50px] ml-20'>
                        Back Home
                    </button>
                </div>
            ))}

        </div>
    );
}

export default Edit
