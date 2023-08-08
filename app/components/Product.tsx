import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast';

const Product = () => {

  const [getProduct, setGetProduct] = useState<typeof Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/getProduct'); // Use Axios here
        const inProductsData = response.data;

        setGetProduct(inProductsData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchData();// เรียกใช้ฟังก์ชัน fetchData เพื่อดึงข้อมูลเมื่อคอมโพเนนต์ถูกเรนเดอร์ครั้งแรก

  }, []); // Dependency array เป็นว่างหมายความว่า useEffect จะทำงานเมื่อคอมโพเนนต์ถูกเรนเดอร์ครั้งแรกเท่านั้น

  const handleDelete = async (productId: string) => {
    try {

      const shouldDelete = window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?");
      if (!shouldDelete) {
        return; // ไม่ดำเนินการลบถ้าผู้ใช้ไม่ยืนยัน
      }

      await axios.delete(`/api/deleteProduct?id=${productId}`);

      const updatedProducts = getProduct.filter(product => productId);

      toast.success('Delete successfully')
      setTimeout(() => {
        setGetProduct(updatedProducts);
        window.location.reload(); // รีเฟสหน้าจอเมือมีการ Delete
      }, 3000);
    } catch (error) {
      console.error('Delete error:', error);
    }
  }


  const handleEdit = (id: any) => { //รับค่า productId 
    const shouldEdit = window.confirm("คุณต้องการแก้ไขสินค้านี้ใช่หรือไม่?");
    if (!shouldEdit) {
      return; // ไม่ดำเนินการแก้ไขถ้าผู้ใช้ไม่ยืนยัน
    }

    toast.loading('Waiting', { duration: 3000 }) //3วิ
    setTimeout(() => {
      router.push(`/edit/${id}`); // ไปหน้า Edit พร้อมกับส่ง productId ไปใน URL
    }, 3000); // 3 วินาที
  }

  return (
    <div>
      <Toaster />
      {getProduct.map((product: any, i) => {
        return (
          <div key={product.id}>
            <p>สินค้าชิ้นที่ {i + 1}</p>
            <p>Name: {product.name}</p>
            <p>Title: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Remark: {product.remark}</p>
            <div className=' flex flex-row gap-5'>
              <button onClick={() => handleDelete(product.id)}
                type='submit' className='border-2 w-[160px] h-[50px] text-sm '>DELETE PRODUCT {i + 1}</button>
              <button onClick={() => handleEdit(product.id)}
                type='submit' className='border-2 w-[140px] h-[50px]  text-sm'>EDIT PRODUCT {i + 1}</button>
            </div>

            <hr className='my-5 mx-5' />
          </div>
        )
      })}

    </div>
  );
}

export default Product;