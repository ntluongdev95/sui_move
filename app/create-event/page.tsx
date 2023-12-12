/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import CreateProposal from '../components/CreateProposal'

const CreateEvent = () => {
  const[isDisplayed,setIsDisplayed] = useState<boolean>(false)
  return (
    <div className="h-screen w-screen text-white relative swap-bg px-[120px]  ">
      {isDisplayed && (
      <CreateProposal setIsDisplayed ={setIsDisplayed} />)}
      <div className="flex items-center py-[20px]  relative w-full">
        <Link href="/events">Back</Link>
        <h2 className="absolute left-[50%] uppercase translate-x-[-50%] text-[24px]">
          Create An Event
        </h2>
      </div>
      <div className="w-full swap-height flex items-center justify-center">
        <div className="w-[60%] h-[95%] border pl-[120px] rounded-[10px] shadow-sm pr-[20px] py-4 ">
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Name :</label>
            <input
              className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
              type="text"
              placeholder="Enter the name of event"
            />
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Description :</label>
            <input
              className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
              type="text"
              placeholder="Write something about your event"
            />
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Type :</label>
            <div>
              <input type="radio" id="VOTING" name="TYPE" value="VOTING" /> {" "}
              <label>VOTING</label>
                <input type="radio" id="FUNDING" name="TYPE" value="FUNDING" /> {" "}
              <label>FUNDING</label>
            </div>
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Image :</label>
            <input
              className="w-[70%] pb-1 bg-transparent outline-none"
              type="file"
              
            />
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Stating Date :</label>
            <input
              className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
              type="date"
              placeholder="Write something about your event"
            />
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">End Date :</label>
            <input
              className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
              type="date"
              placeholder="Write something about your event"
            />
          </div>
          <div className="w-full flex item-center mb-[30px]">
            <label className="w-[30%]">Proposals :</label>
            <div className="w-[70%] flex ">
              <div className='w-[80%] flex'>
                <div className=' w-[60px] mr-[10px] relative rounded-[5px] px-1 bg-white '>
                  <img className='w-[30px] h-[30px] mt-[3px] rounded-[50%]' src='https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/7/30/hoa-hau-the-gioi-nguoi-viet-2023-huynh-tran-y-nhi-1690712965212417151219.jpeg' alt='' />
                  <p className='absolute right-[5px] cursor-pointer top-0 text-black text-[18px]'>x</p>
                </div>
                <div className=' w-[60px] mr-[10px]  relative rounded-[5px] px-1 bg-white '>
                  <img className='w-[30px] h-[30px] mt-[3px] rounded-[50%]' src='https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/7/30/hoa-hau-the-gioi-nguoi-viet-2023-huynh-tran-y-nhi-1690712965212417151219.jpeg' alt='' />
                  <p className='absolute right-[5px] cursor-pointer top-0 text-black text-[18px]'>x</p>
                </div>
              </div>
              <div onClick={()=>setIsDisplayed(true)} className='w-[20%] flex justify-center py-1 rounded-[5px] cursor-pointer border items-center'>Create</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent
