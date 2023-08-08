import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'DELETE') {
            return res.status(405).end();
        }

        const productId = req.query.id as string;

        const deletedProduct = await prismadb.product.delete({
            where: {
                id: productId
            }
        });

        return res.status(200).json(deletedProduct);


    } catch (error) {
        console.log('error 500')
        return res.status(500).json({ error: `Something went wrong error 500!` });
    }
}

// name , title , description , remark