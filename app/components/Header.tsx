/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link"
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation'
const Header = () => {
  const pathname = usePathname()
  
  
  return (
  <>
    { pathname === '/' ? (
      <div className="w-full absolute z-[1000000] h-[80px] flex items-center  px-[50px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="w-[40%] h-full text-white flex items-center "
      >
        <img
          className="rounded-[50%] cursor-pointer h-[50px] w-[50px]"
          src="https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
          alt="logo"
        />
      </motion.div>
      <ul className="flex w-[60%] text-white uppercase text-[20px] font-[600] justify-end items-center ">
        <motion.li
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.35 }}
          className=" mr-[50px] relative"
        >
              <Link href="/">Home</Link>
              {pathname==='/' && (
								<span
									className="absolute w-full h-[4px] bg-green-500 bottom-[-20px] left-0"
								></span>
							)}
        </motion.li>
       
        
        <motion.li
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
          className=" mr-[50px] relative"
        >
          <Link href="/events">Events</Link>
        </motion.li>
        <motion.li
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45 }}
          className=" mr-[50px] relative"
        >
          <Link href="/results">Results</Link>
        </motion.li>
        <motion.li
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          className="mr-[50px]"
        >
          <Link href="/swap">Swap</Link>
          
        </motion.li>
        <motion.li
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4, stiffness: 120 }}
          style={{ cursor: "pointer" }}
          className="connect_wallet py-2"
        >
          Connect
        </motion.li>
      </ul>
    </div>
    ) : (
      <div className="w-full absolute z-[2000] h-[80px] flex items-center  px-[50px]">
      <div
        className="w-[40%] h-full text-white flex items-center "
      >
        <img
          className="rounded-[50%] cursor-pointer h-[50px] w-[50px]"
          src="https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
          alt="logo"
        />
      </div>
      <ul className="flex w-[60%] text-white uppercase text-[20px] font-[600] justify-end items-center ">
        <li
          className=" mr-[50px] relative"
        >
           <Link href="/">Home</Link>
         
        </li>
       
        
        <li
          className=" mr-[50px] relative"
        >
          <Link href="/events">Events</Link>
          {pathname==='/events' && (
								<motion.span
									layoutId="rect"
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "100%" }}
									transition={{
										duration: 0.4,
										type: "spring",
									}}
									className="absolute w-full h-[4px] bg-green-500 bottom-[-20px] left-0"
								></motion.span>
							)}
        </li>
        <li
          className=" mr-[50px] relative"
        >
          <Link href="/results">Results</Link>
          {pathname==='/results' && (
                  <motion.span
                  layoutId="rect"
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "100%" }}
									transition={{
										duration: 0.4,
										type: "spring",
									}}
									className="absolute w-full h-[4px] bg-green-500 bottom-[-20px] left-0"
								></motion.span>
							)}
        </li>
        <li
          className="mr-[50px]"
        >
          <Link href="/swap">Swap</Link>
          
        </li>
        <li
          style={{ cursor: "pointer" }}
          className="connect_wallet py-2"
        >
          Connect
        </li>
      </ul>
    </div>
    )}
   </> 
  );
}

export default Header
