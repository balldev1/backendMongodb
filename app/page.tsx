'use client'
import Image from 'next/image'
import react, { useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name, email, password
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password])



  return (
    <div className='flex gap-5 justify-center'>
      <Link href='/register'>Register</Link>
      <Link href='/login'>login</Link>
    </div>
  )
}
