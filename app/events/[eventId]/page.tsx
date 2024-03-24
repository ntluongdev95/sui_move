/* eslint-disable @next/next/no-img-element */
import Header from "@/app/components/Header";
import React from "react";

function EventDetail() {
  return (
    <div className="w-screen min-h-screen ">
      <Header />
      <div className="bg-[#f9f9f9] top-[80px] left-0 right-0 absolute pt-[20px]">
        <div className="flex justify-between px-[80px]">
          <div className="w-[60%]">
            <img
              src="https://cdn.dorahacks.io/static/files/18e131e546ebd79089e0d7540a787160.png@512h.webp"
              alt=""
            />
          </div>
          <div className="w-[32%] border bg-white rounded-[20px] p-[20px]">
            <h1 className="text-[25px] text-[#ff761c] capitalize">
              Sui overflow
            </h1>
            <p className="text-[14px] text-[#868688]">
              Be the first to know when registration opens Be the first to know
              when registration opens ...
            </p>
            <div className="mt-[10px] flex items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <div className="text-[14px]">10/2 - 10/3</div>
            </div>
            <div className="mt-[10px] flex items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <div className="text-[14px] text-[#868688]">Quan7, Thanh Pho Ho Chi Minh</div>
            </div>
            <div className="flex items-start mt-[20px]">
              <div className="border px-[20px] rounded-[10px] text-white cursor-pointer py-3 bg-[#ff761c]">Register now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
