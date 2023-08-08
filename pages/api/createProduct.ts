import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

        const { name, title, description, remark, } = req.body;

        const createProduct = await prismadb.product.create({
            data: {
                name, title, description, remark
            }
        })
        return res.status(200).json(createProduct)

    } catch (error) {
        console.log('error 500')
        return res.status(500).json({ error: `Something went wrong error 500!` });
    }
}

// name , title , description , remark