/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';
import Header from './components/Header'
import { motion } from "framer-motion";
export default function Home() {
  return (

    <main className='w-screen overflow-hidden h-screen home-section '>
      <Header />
      <section className='swap-height  text-white flex'>
        <div className='w-[60%] h-full flex flex-col mt-[100px] pl-[120px] '>
          <motion.h1
             initial={{ y:-50,opacity:0 }}
             animate={{y:0,opacity:1}}
             transition={{ delay: 0.6,stiffness: 120}}
            className='text-[30px] font-[500]'>ONLINE VOTING PLATFORM</motion.h1>
          <motion.p  initial={{ scaleX:0,opacity:0 }}
             animate={{scaleX:1,opacity:1}}
             transition={{ delay: 0.7,stiffness: 120}}>NTL is an eVoting platform which enables you to create and manage elections</motion.p>
          <motion.div
            initial={{ x:50,opacity:0 }}
            animate={{x:0,opacity:1}}
            transition={{ delay: 0.8}}
            className='flex items-center my-[25px]'>
            <img src='https://bvote.vn/images/introduction/tick-protect.svg' alt='' />
            <p className='ml-2 font-[600]'>Easy to use</p> </motion.div>
          <motion.div
            initial={{ x:50,opacity:0 }}
            animate={{x:0,opacity:1}}
            transition={{ delay: 0.85}}
            className='flex items-center mb-[25px]'>
            <img src='https://bvote.vn/images/introduction/tick-protect.svg' alt='' />
            <p className='ml-2 font-[600]'>Cost Effective</p> </motion.div>
          <motion.div
            initial={{ x:50,opacity:0 }}
            animate={{x:0,opacity:1}}
            transition={{ delay: 0.9}}
            className='flex items-center mb-[25px]'>
            <img src='https://bvote.vn/images/introduction/tick-protect.svg' alt='' />
           <p className='ml-2 font-[600]'>100% Secure</p> </motion.div>
          <motion.div
            initial={{ x:50,opacity:0 }}
            animate={{x:0,opacity:1}}
            transition={{ delay: 0.95}}
            className='w-[170px] py-3 rounded-[6px] bg-[#04cb82] cursor-pointer text-center'>
            <Link href='/events'>
                Vote now
            </Link>
         </motion.div>
        </div>
        
      </section>
   </main>
  )
}
