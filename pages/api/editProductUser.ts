import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'PATCH') {
            return res.status(405).end();
        }
        // คิวรี่ id
        const productId = req.query.id;

        const editProduct = await prismadb.product.findMany({
            where: {
                id: productId
            }
        });

        if (editProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found!' });
        }

        // อัปเดตข้อมูลสินค้า
        const updatedData = req.body; // ข้อมูลใหม่ที่มาจาก front-end
        const updatedProduct = await prismadb.product.update({
            where: {
                id: productId,
            },
            data: updatedData,
        });

        return res.status(200).json(updatedProduct);

    } catch (error) {
        console.log('error 500')
        return res.status(500).json({ error: 'something went wrong error 500!' });
    }
}