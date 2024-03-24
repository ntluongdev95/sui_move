/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { AuthService } from "../utils/authService";
import { useParams } from "next/navigation";
import { useCallback, useEffect,  useState } from "react";
import { SuiService } from "../utils/suiService";

interface Iprops {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  setShowModalFaucet: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = (props: Iprops) => {
  const suiService = new SuiService();
  const pathname = usePathname();
  const authService = new AuthService();
  const params = useParams();
  let eventId = pathname === `/events/${params.eventId}` ? true : false;
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(false)
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setWalletAddress(AuthService.walletAddress());
    }
  }, [AuthService.isAuthenticated()]);

  useEffect(() => {
    authService.completeZkLogin();
  }, []);

  const handleLogout = async () => {
    sessionStorage.clear();

    window.location.href = '/';
  };

  const handleLogin = () => {
    props.setShowModal(true);
    setTimeout(() => {
      props.setShowModal(false);
      authService.login();
    }, 1000);
  };
  return (
    <>
      {pathname === "/" ? (
        <div className="w-full absolute z-[1000] h-[80px] flex items-center  px-[50px]">
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
              {pathname === "/" && (
                <span className="absolute w-full h-[4px] bg-green-500 bottom-[-20px] left-0"></span>
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
            {AuthService.isAuthenticated() ? (
              <motion.li
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4, stiffness: 120 }}
                style={{ cursor: "pointer" }}
                className="connect_wallet py-2 relative"
              >
                {`${walletAddress?.substring(
                  0,
                  5
                )}...${walletAddress?.substring(walletAddress.length - 4)}`}

                <svg
                  onClick={() => { setDropdown(!dropdown) }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {dropdown && (
                <div className="absolute top-[45px] left-0 right-0 rounded-[8px]  w-full py-[20px] bg-white">
                  <div className="text-[16px]  px-[20px] justify-between py-[5px] capitalize flex items-center">
                    Balance
                    <div className="flex items-center">
                     {props.balance}
                    <img
                      className="h-[20px] w-[20px] ml-[2px]"
                      src="https://assets.staticimg.com/cms/media/8uGGQmvkfODw7cnx3GuekBb404A2bTYUcTjBklHja.png"
                      alt=""
                      />
                    </div>
                    </div>
                    {props.balance === '0.00' && (
                      <div onClick={() => { props.setShowModalFaucet(true) , setDropdown(false) }}  className="text-[16px]  px-[20px] mt-[10px] justify-between py-[5px] capitalize flex items-center">
                    Get faucet
                  </div>)}
                  <div onClick={handleLogout} className="text-[16px] mt-[10px] hover:bg-[#daecef] px-[20px] justify-between py-[5px] capitalize flex items-center">
                    Logout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 ml-[20px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                  </div>
                </div>)}
              </motion.li>
            ) : (
              <motion.li
                onClick={handleLogin}
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4, stiffness: 120 }}
                style={{ cursor: "pointer" }}
                className="connect_wallet py-2"
              >
                Connect
              </motion.li>
            )}
          </ul>
        </div>
      ) : (
        <div className="w-full absolute z-[2000] h-[80px] flex items-center  px-[50px]">
          <div className={`w-[40%] h-full text-white flex items-center `}>
            <img
              className="rounded-[50%] cursor-pointer h-[50px] w-[50px]"
              src="https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
              alt="logo"
            />
          </div>
          <ul
            className={`flex w-[60%] ${
              eventId ? "text-black" : "text-white"
            }  uppercase text-[20px] font-[500] justify-end items-center `}
          >
            <li className=" mr-[50px] relative">
              <Link href="/">Home</Link>
            </li>

            <li className=" mr-[50px] relative">
              <Link href="/events">Events</Link>
              {pathname === "/events" && (
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
            <li className=" mr-[50px] relative">
              <Link href="/results">Results</Link>
              {pathname === "/results" && (
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
            <li className="mr-[50px]">
              <Link href="/swap">Swap</Link>
            </li>
            {AuthService.isAuthenticated() ? (
              <li style={{ cursor: "pointer" }} className="connect_wallet py-2">
                {`${walletAddress?.substring(
                  0,
                  5
                  )}...${walletAddress?.substring(walletAddress.length - 4)}`}
                 <svg
                  onClick={()=>setDropdown(!dropdown)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {dropdown && (
                <div className="absolute top-[45px] left-0 right-0 rounded-[8px]  w-full py-[20px] bg-white">
                  <div className="text-[16px]  px-[20px] justify-between py-[5px] capitalize flex items-center">
                    Balance
                    <div className="flex items-center">
                      {props.balance}
                    <img
                      className="h-[20px] w-[20px] ml-[2px]"
                      src="https://assets.staticimg.com/cms/media/8uGGQmvkfODw7cnx3GuekBb404A2bTYUcTjBklHja.png"
                      alt=""
                      />
                    </div>
                  </div>
                  <div onClick={handleLogout} className="text-[16px] mt-[10px] hover:bg-[#daecef] px-[20px] justify-between py-[5px] capitalize flex items-center">
                    Logout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 ml-[20px]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                  </div>
                </div>)}
              </li>
            ) : (
              <li
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
                className="connect_wallet py-2"
              >
                Connect
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
