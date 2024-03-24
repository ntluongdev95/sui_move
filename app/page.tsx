/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';
import Header from './components/Header'
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from 'react';
import Modal from './components/Modal';
import { SuiService } from './utils/suiService';
import { AuthService } from './utils/authService';
import FaucetModal from './components/FaucetModal';
export default function Home() {
  const suiService = new SuiService();
  const [showModal, setShowModal] = useState(false)
  const[showModalFaucet,setShowModalFaucet]=useState(false)
  const [balance, setBalance] = useState("0")

  const getBalance = useCallback(async () => {
    try {
      if (AuthService.isAuthenticated()) {
        setBalance(await suiService.getFormattedBalance(AuthService.walletAddress()));
        // if (balance === "0") {
        //   suiService.requestSuiFromFaucet('devnet', AuthService.walletAddress())
        // }
      }
    } catch (error) {
      console.log({ error });
    } finally {
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

 
  return (
    
    
    <main className='w-screen overflow-hidden h-screen home-section relative'>
      <Header setShowModal ={setShowModal} balance={balance} setBalance={setBalance}  setShowModalFaucet={setShowModalFaucet} />
      {showModal && <Modal />}
      {showModalFaucet && <FaucetModal setShowModalFaucet={setShowModalFaucet} />}
      <section className='swap-height  text-white flex'>
        <div className='w-[60%] h-full flex flex-col mt-[100px] pl-[120px] '>
          <motion.h1
             initial={{ y:-50,opacity:0 }}
             animate={{y:0,opacity:1}}
             transition={{ delay: 0.6,stiffness: 120}}
            className='text-[30px] font-[500] capitalize'>The Hub of Web3 Events and Beyond</motion.h1>
          <motion.p
            className='w-[80%]'
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            
             transition={{ delay: 0.7,stiffness: 120}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, when an unknown printer took a galley </motion.p>
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
            <Link href='/create-event'>
                Create an event
            </Link>
         </motion.div>
        </div>   
      </section>
   </main>
  )
}
