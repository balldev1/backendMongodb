import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        // คิวรี่ id
        const productId = req.query.id;

        const getProduct = await prismadb.product.findMany({
            where: {
                id: productId
            }
        });

        if (getProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found!' });
        }


        return res.status(200).json(getProduct);

    } catch (error) {
        console.log('error 500')
        return res.status(500).json({ error: 'something went wrong error 500!' });
    }
}