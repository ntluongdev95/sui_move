/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { ConnectButton, ConnectModal } from '@suiet/wallet-kit';
// import {useWallet} from '@suiet/wallet-kit';
const SwapToken = () => {
  const [coins, setCoins] = useState<any>([]);
  const [trigger, setTrigger] = useState(0);
  
  useEffect(() => {
    const inter = setInterval(() => {
      setTrigger(Math.floor(Math.random() * 100));
    }, 60000);
    return () => clearInterval(inter);
  });
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.error(error));
  }, [trigger]);
  
  

  const account =
    "0x947eeb84c73a99a0df87d9e39626f4604aa6366bb744ddd4f5a437b29b2b2af4";

  return (
    <div className="h-screen w-screen swap-bg ">
      <header className="border-b-[1px] text-white py-[10px] h-[80px] flex items-center px-[30px]">
        <Link className="w-[40%]" href="/">
          <div className="text-[35px] w-full font-[600] cursor-pointer flex uppercase italic">
            <img
              className="rounded-[50%] h-[50px] w-[50px]"
              src="https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
              alt="logo"
            />
            <p>Swap</p>
          </div>
        </Link>
        <div className="w-[60%] ">
          <ul className="flex w-full ">
            {coins?.map((i) => (
              <li key={i.id} className="show_price items-center">
                {i?.symbol}
                {i.price_change_percentage_24h < 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
                <span> $ {i.current_price}</span>
              </li>
            ))}
            {account ? (
              <li className="connect_wallet account">{`${account?.substring(
                0,
                5
              )}...${account?.substring(account.length - 4)}`}</li>
            ) : (
              
                <li style={{ cursor: "pointer" }} className="connect_wallet">
                  Connect wallet
                </li>
            )}
          </ul>
        </div>
      </header>
      <section className="swap-height w-full flex items-center justify-center">
        <div className=" w-[40%] p-[30px] rounded-[10px] relative border bg-[#3f2b66]">
          <div className="absolute top-[-30px] left-[50%] translate-x-[-50%] z-[1]">
            <svg
              width="222"
              height="59"
              viewBox="0 0 222 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 1L0 25.5L14.5 58H206L221.5 25.5L205 1H14.5Z"
                fill="#3B2D62"
              ></path>
              <path
                d="M149.57 6.29688H69.4307V5.94384H149.57V6.29688Z"
                fill="#CECAD7"
              ></path>
              <path
                d="M149.57 53.4277H69.4307V53.0747H149.57V53.4277Z"
                fill="#CECAD7"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.0027 1.35254H20.0298L19.0093 2.37303C18.803 2.57932 18.4676 2.57841 18.2613 2.37211C18.055 2.16581 18.0541 1.83042 18.2604 1.62412L18.532 1.35254H14.0033L2 20.0635H3.50041L6.94253 15.2975H11.179L16.8276 5.94203H28.8309L30.9491 4.52988H68.0181L66.2529 1.35254H22.5005L21.48 2.37303C21.2737 2.57932 20.9383 2.57841 20.732 2.37211C20.5257 2.16581 20.5248 1.83042 20.7311 1.62412L21.0027 1.35254Z"
                fill="#CECAD7"
              ></path>
              <path
                d="M3.41211 20.5939L10.8063 9.67062C11.0341 9.33418 11.0487 8.89696 10.844 8.54603L9.94331 7.00195"
                stroke="#000C1A"
                stroke-width="0.528256"
              ></path>
              <path
                d="M55.6621 1L57.0743 2.32389H67.1358L69.4306 6.29557H71.1958"
                stroke="#000C1A"
                stroke-width="1.05651"
              ></path>
              <path
                d="M56.0156 1.35352H69.078L71.5493 6.29604H69.4311L67.1363 2.32437H57.0747L56.0156 1.35352Z"
                fill="#CECAD7"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M197.997 1.35254H198.97L199.991 2.37303C200.197 2.57932 200.532 2.57841 200.739 2.37211C200.945 2.16581 200.946 1.83042 200.74 1.62412L200.468 1.35254H204.997L217 20.0635H215.5L212.057 15.2975H207.821L202.172 5.94203H190.169L188.051 4.52988H150.982L152.747 1.35254H196.5L197.52 2.37303C197.726 2.57932 198.062 2.57841 198.268 2.37211C198.474 2.16581 198.475 1.83042 198.269 1.62412L197.997 1.35254Z"
                fill="#CECAD7"
              ></path>
              <path
                d="M215.588 20.5939L208.194 9.67062C207.966 9.33418 207.951 8.89696 208.156 8.54603L209.057 7.00195"
                stroke="#000C1A"
                stroke-width="0.528256"
              ></path>
              <path
                d="M163.338 1L161.926 2.32389H151.864L149.569 6.29557H147.804"
                stroke="#000C1A"
                stroke-width="1.05651"
              ></path>
              <path
                d="M162.984 1.35352H149.922L147.451 6.29604H149.569L151.864 2.32437H161.925L162.984 1.35352Z"
                fill="#CECAD7"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.0027 58.0166H20.0298L19.0093 56.9961C18.803 56.7898 18.4676 56.7907 18.2613 56.997C18.055 57.2033 18.0541 57.5387 18.2604 57.745L18.532 58.0166H14.0033L2 39.3056H3.50041L6.94253 44.0716H11.179L16.8276 53.4271H28.8309L30.9491 54.8393H68.0181L66.2529 58.0166H22.5005L21.48 56.9961C21.2737 56.7898 20.9383 56.7907 20.732 56.997C20.5257 57.2033 20.5248 57.5387 20.7311 57.745L21.0027 58.0166Z"
                fill="#CECAD7"
              ></path>
              <path
                d="M3.41211 38.7772L10.8063 49.7005C11.0341 50.0369 11.0487 50.4741 10.844 50.8251L9.94331 52.3691"
                stroke="#000C1A"
                stroke-width="0.528256"
              ></path>
              <path
                d="M55.6621 58.3701L57.0743 57.0462H67.1358L69.4306 53.0746H71.1958"
                stroke="#000C1A"
                stroke-width="1.05651"
              ></path>
              <path
                d="M56.0156 58.0176H69.078L71.5493 53.075H69.4311L67.1363 57.0467H57.0747L56.0156 58.0176Z"
                fill="#CECAD7"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M197.997 58.0166H198.97L199.991 56.9961C200.197 56.7898 200.532 56.7907 200.739 56.997C200.945 57.2033 200.946 57.5387 200.74 57.745L200.468 58.0166H204.997L217 39.3056H215.5L212.057 44.0716H207.821L202.172 53.4271H190.169L188.051 54.8393H150.982L152.747 58.0166H196.5L197.52 56.9961C197.726 56.7898 198.062 56.7907 198.268 56.997C198.474 57.2033 198.475 57.5387 198.269 57.745L197.997 58.0166Z"
                fill="#CECAD7"
              ></path>
              <path
                d="M215.588 38.7772L208.194 49.7005C207.966 50.0369 207.951 50.4741 208.156 50.8251L209.057 52.3691"
                stroke="#000C1A"
                stroke-width="0.528256"
              ></path>
              <path
                d="M163.338 58.3701L161.926 57.0462H151.864L149.569 53.0746H147.804"
                stroke="#000C1A"
                stroke-width="1.05651"
              ></path>
              <path
                d="M162.984 58.0176H149.922L147.451 53.075H149.569L151.864 57.0467H161.925L162.984 58.0176Z"
                fill="#CECAD7"
              ></path>
              <g filter="url(#filter0_d_7337_154903)">
                <path
                  d="M52.1502 22.1184C53.9262 22.1184 55.3062 22.6884 56.2902 23.8284C57.2862 24.9684 57.7842 26.5764 57.7842 28.6524C57.7842 30.0084 57.5562 31.1784 57.1002 32.1624C56.6562 33.1464 56.0082 33.9024 55.1562 34.4304C54.3162 34.9464 53.3142 35.2044 52.1502 35.2044C50.9862 35.2044 49.9842 34.9464 49.1442 34.4304C48.3042 33.9144 47.6562 33.1704 47.2002 32.1984C46.7562 31.2144 46.5342 30.0324 46.5342 28.6524C46.5342 27.3084 46.7562 26.1444 47.2002 25.1604C47.6562 24.1764 48.3042 23.4264 49.1442 22.9104C49.9842 22.3824 50.9862 22.1184 52.1502 22.1184ZM52.1502 24.2784C51.2982 24.2784 50.6622 24.6264 50.2422 25.3224C49.8342 26.0064 49.6302 27.1164 49.6302 28.6524C49.6302 30.1884 49.8402 31.3044 50.2602 32.0004C50.6802 32.6964 51.3102 33.0444 52.1502 33.0444C53.0142 33.0444 53.6502 32.7024 54.0582 32.0184C54.4782 31.3224 54.6882 30.2004 54.6882 28.6524C54.6882 27.1044 54.4782 25.9884 54.0582 25.3044C53.6382 24.6204 53.0022 24.2784 52.1502 24.2784ZM68.7147 22.4244L68.4267 24.6924H65.3487V34.8984H62.3967V24.6924H59.1747V22.4244H68.7147ZM77.8594 34.8984V29.5524H74.1154V34.8984H71.1634V22.4244H74.1154V27.2484H77.8594V22.4244H80.8114V34.8984H77.8594ZM92.0617 22.4244L91.7557 24.5304H87.3637V27.5184H91.1977V29.5884H87.3637V32.7744H92.0617V34.8984H84.4117V22.4244H92.0617ZM99.2503 30.1284H98.0983V34.8984H95.1463V22.4244H99.2323C100.936 22.4244 102.214 22.7364 103.066 23.3604C103.93 23.9844 104.362 24.9384 104.362 26.2224C104.362 27.0264 104.17 27.6984 103.786 28.2384C103.402 28.7664 102.796 29.2164 101.968 29.5884L105.136 34.8984H101.806L99.2503 30.1284ZM98.0983 28.0944H99.3403C100 28.0944 100.492 27.9444 100.816 27.6444C101.152 27.3444 101.32 26.8704 101.32 26.2224C101.32 25.6224 101.14 25.1844 100.78 24.9084C100.432 24.6324 99.8923 24.4944 99.1603 24.4944H98.0983V28.0944ZM117.079 22.4244C118.723 22.4244 120.001 22.7664 120.913 23.4504C121.825 24.1344 122.281 25.1484 122.281 26.4924C122.281 27.8964 121.831 28.9584 120.931 29.6784C120.043 30.3864 118.849 30.7404 117.349 30.7404H115.999V34.8984H113.047V22.4244H117.079ZM117.097 28.6164C117.793 28.6164 118.321 28.4544 118.681 28.1304C119.053 27.7944 119.239 27.2484 119.239 26.4924C119.239 25.1844 118.507 24.5304 117.043 24.5304H115.999V28.6164H117.097ZM130.14 22.1184C131.916 22.1184 133.296 22.6884 134.28 23.8284C135.276 24.9684 135.774 26.5764 135.774 28.6524C135.774 30.0084 135.546 31.1784 135.09 32.1624C134.646 33.1464 133.998 33.9024 133.146 34.4304C132.306 34.9464 131.304 35.2044 130.14 35.2044C128.976 35.2044 127.974 34.9464 127.134 34.4304C126.294 33.9144 125.646 33.1704 125.19 32.1984C124.746 31.2144 124.524 30.0324 124.524 28.6524C124.524 27.3084 124.746 26.1444 125.19 25.1604C125.646 24.1764 126.294 23.4264 127.134 22.9104C127.974 22.3824 128.976 22.1184 130.14 22.1184ZM130.14 24.2784C129.288 24.2784 128.652 24.6264 128.232 25.3224C127.824 26.0064 127.62 27.1164 127.62 28.6524C127.62 30.1884 127.83 31.3044 128.25 32.0004C128.67 32.6964 129.3 33.0444 130.14 33.0444C131.004 33.0444 131.64 32.7024 132.048 32.0184C132.468 31.3224 132.678 30.2004 132.678 28.6524C132.678 27.1044 132.468 25.9884 132.048 25.3044C131.628 24.6204 130.992 24.2784 130.14 24.2784ZM143.845 22.1184C145.621 22.1184 147.001 22.6884 147.985 23.8284C148.981 24.9684 149.479 26.5764 149.479 28.6524C149.479 30.0084 149.251 31.1784 148.795 32.1624C148.351 33.1464 147.703 33.9024 146.851 34.4304C146.011 34.9464 145.009 35.2044 143.845 35.2044C142.681 35.2044 141.679 34.9464 140.839 34.4304C139.999 33.9144 139.351 33.1704 138.895 32.1984C138.451 31.2144 138.229 30.0324 138.229 28.6524C138.229 27.3084 138.451 26.1444 138.895 25.1604C139.351 24.1764 139.999 23.4264 140.839 22.9104C141.679 22.3824 142.681 22.1184 143.845 22.1184ZM143.845 24.2784C142.993 24.2784 142.357 24.6264 141.937 25.3224C141.529 26.0064 141.325 27.1164 141.325 28.6524C141.325 30.1884 141.535 31.3044 141.955 32.0004C142.375 32.6964 143.005 33.0444 143.845 33.0444C144.709 33.0444 145.345 32.7024 145.753 32.0184C146.173 31.3224 146.383 30.2004 146.383 28.6524C146.383 27.1044 146.173 25.9884 145.753 25.3044C145.333 24.6204 144.697 24.2784 143.845 24.2784ZM155.463 22.4244V32.5584H160.323L160.017 34.8984H152.511V22.4244H155.463ZM166.802 22.1184C167.738 22.1184 168.548 22.2504 169.232 22.5144C169.928 22.7784 170.558 23.1804 171.122 23.7204L169.754 25.3224C168.902 24.6264 167.99 24.2784 167.018 24.2784C166.502 24.2784 166.094 24.3864 165.794 24.6024C165.494 24.8064 165.344 25.1064 165.344 25.5024C165.344 25.7784 165.41 26.0064 165.542 26.1864C165.674 26.3544 165.908 26.5164 166.244 26.6724C166.58 26.8284 167.084 27.0144 167.756 27.2304C169.028 27.6384 169.964 28.1424 170.564 28.7424C171.164 29.3304 171.464 30.1704 171.464 31.2624C171.464 32.0424 171.266 32.7324 170.87 33.3324C170.474 33.9204 169.904 34.3824 169.16 34.7184C168.416 35.0424 167.534 35.2044 166.514 35.2044C165.494 35.2044 164.588 35.0424 163.796 34.7184C163.016 34.3944 162.344 33.9624 161.78 33.4224L163.274 31.7844C163.754 32.1924 164.246 32.4984 164.75 32.7024C165.266 32.9064 165.824 33.0084 166.424 33.0084C167.036 33.0084 167.516 32.8764 167.864 32.6124C168.224 32.3364 168.404 31.9584 168.404 31.4784C168.404 31.1664 168.338 30.9084 168.206 30.7044C168.074 30.4884 167.846 30.2964 167.522 30.1284C167.198 29.9604 166.73 29.7804 166.118 29.5884C164.738 29.1684 163.754 28.6524 163.166 28.0404C162.59 27.4284 162.302 26.6544 162.302 25.7184C162.302 24.9984 162.494 24.3684 162.878 23.8284C163.262 23.2764 163.796 22.8564 164.48 22.5684C165.164 22.2684 165.938 22.1184 166.802 22.1184Z"
                  fill="white"
                ></path>
              </g>
              <defs>
                <filter
                  id="filter0_d_7337_154903"
                  x="41.2516"
                  y="16.8356"
                  width="135.495"
                  height="23.651"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset></feOffset>
                  <feGaussianBlur stdDeviation="2.64128"></feGaussianBlur>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_7337_154903"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_7337_154903"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
          <div className="absolute z-[2] h-[35px] w-[200px] flex items-center justify-center text-[20px] font-[700] left-[50%] translate-x-[-50%] top-[-21px] bg-[#3b2d62] text-white">
            SWAP
          </div>
          <div className="h-[130px] relative bg-[#5c4e82] w-full p-[15px] rounded-[16px] border mt-[20px]">
            <p className="mb-[7px] uppercase text-[12px] leading-[19px] font-[700] text-[#ccc7d7]">
              You pay
            </p>
            <div className="flex justify-between">
              <div className="w-[110px] h-[50px] flex justify-between items-center rounded-[12px] border-[1px] bg-[#6c5b8a] hover:shadow-sm p-[12px] hover:border-[#c2c2c2] hover:scale-[1.01] transition-all 300 ease border-transparent cursor-pointer ">
                <img
                  className="h-[30px] w-[30px]"
                  src="https://assets.staticimg.com/cms/media/8uGGQmvkfODw7cnx3GuekBb404A2bTYUcTjBklHja.png"
                  alt=""
                />
                <div>
                  <p className="text-[16px] font-[600] text-white">SUI</p>
                  <span className="text-[13px] font-[500] text-[#d4cfdc]">
                    $ 0.46
                  </span>
                </div>
              </div>
              <div className="  w-[50%] flex flex-col justify-end items-end ">
                <input
                  type="number"
                  step={0.1}
                  placeholder="0.0"
                  className="bg-transparent w-[150px] text-right text-[24px] text-white h-[30px] placeholder-white border-none outline-none "
                />
                <div className="text-right text-[12px] font-[500] text-[#d4cfdc]">
                  $ 0.00
                </div>
              </div>
            </div>
            <div className="w-full flex  mt-[8px] justify-between">
              <div className="flex w-[110px] items-center font-[700] text-[#a090b1] text-[13px]">
                <div>Balance:</div>
                <div className="text-[#cfc9d8] ml-[15px]">0.0</div>
              </div>
              <div className="w-[45%] flex justify-end">
                <div className="w-[40px] h-[20px] mr-[10px] cursor-pointer text-[#d9d5e2] text-center hover:scale-[1.05] transition-all 300 ease leading-[20px] bg-[#82729b] rounded-[5px] text-[12px]">
                  25%
                </div>
                <div className="w-[40px] h-[20px] mr-[10px] cursor-pointer text-[#d9d5e2] text-center hover:scale-[1.05] transition-all 300 ease leading-[20px] bg-[#82729b] rounded-[5px] text-[12px]">
                  50%
                </div>
                <div className="w-[40px] h-[20px] mr-[10px] cursor-pointer text-[#d9d5e2] text-center hover:scale-[1.05] transition-all 300 ease leading-[20px] bg-[#82729b] rounded-[5px] text-[12px]">
                  25%
                </div>
                <div className="w-[40px] h-[20px]  cursor-pointer text-[#d9d5e2] text-center hover:scale-[1.05] transition-all 300 ease leading-[20px] bg-[#82729b] rounded-[5px] text-[12px]">
                  MAX
                </div>
              </div>
            </div>
            <div className="absolute top-[120px] h-[40px] cursor-pointer flex justify-center items-center rounded-[10px] w-[40px] bg-[#9ff6df] z-[3] left-[50%] translate-x-[-50%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                className="w-6 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
          </div>
          <div className="h-[130px] relative bg-[#5c4e82] w-full p-[15px] rounded-[16px] border mt-[20px]">
            <p className="mb-[7px] uppercase text-[12px] leading-[19px] font-[700] text-[#ccc7d7]">
              You receive
            </p>
            <div className="flex justify-between">
              <div className="w-[110px] h-[50px] flex justify-between items-center rounded-[12px] border-[1px] bg-[#6c5b8a] hover:shadow-sm p-[12px] hover:border-[#c2c2c2] hover:scale-[1.01] transition-all 300 ease border-transparent cursor-pointer ">
                <img
                  className="h-[30px] w-[30px] rounded-[50%]"
                  src="https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
                  alt=""
                />
                <div>
                  <p className="text-[16px] font-[600] text-white">NTL</p>
                  <span className="text-[13px] font-[500] text-[#d4cfdc]">
                    $ 0.46
                  </span>
                </div>
              </div>
              <div className="  w-[50%] flex flex-col justify-end items-end ">
                <input
                  type="number"
                  step={0.1}
                  placeholder="0.0"
                  className="bg-transparent w-[150px] text-right text-[24px] text-white h-[30px] placeholder-white border-none outline-none "
                />
                <div className="text-right text-[12px] font-[500] text-[#d4cfdc]">
                  $ 0.00
                </div>
              </div>
            </div>
            <div className="w-full flex  mt-[8px] justify-between">
              <div className="flex w-[110px] items-center font-[700] text-[#a090b1] text-[13px]">
                <div>Balance:</div>
                <div className="text-[#cfc9d8] ml-[15px]">0.0</div>
              </div>
            </div>
          </div>
          <div className="w-full h-[45px] rounded-[16px] text-white cursor-pointer mt-[20px] border flex justify-center items-center">
            SWAP
          </div>
        </div>
      </section>
    </div>
  );
};

export default SwapToken;
