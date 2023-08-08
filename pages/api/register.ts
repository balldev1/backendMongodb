import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

        const { name, email, password } = req.body;
        // {เข้าฐานข้อมูลค้นหาemail}
        const userRegister = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if (userRegister) {
            return res.status(422).json({ error: 'Email นี้ถูกใช้งานแล้ว' })
        }

        // {bcrypt password}
        const hashedPassword = await bcrypt.hash(password, 12);
        //create userRegister
        const user = await prismadb.user.create({
            data: {
                name, email, hashedPassword, emailVerified: new Date()
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}

