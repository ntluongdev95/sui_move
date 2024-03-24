'use client'
import { Dispatch, SetStateAction } from "react"

interface IProps{
    setIsDisplayed:Dispatch<SetStateAction<boolean>>
}
const CreateProposal = (props:IProps) => {
  return (
    <div className="fixed top-0 z-[20] left-0 w-screen h-screen layer flex items-center justify-center">
      <div className="w-[40%] text-black h-[55%] bg-white py-[30px] px-[50px] ">
        <div className="flex items-center   relative w-full">
          <h2 className="absolute left-[50%] uppercase translate-x-[-50%] text-[24px]">
            Create An Event
          </h2>
        </div>
        <div className="w-full flex item-center mt-[40px]">
          <label className="w-[30%]">Name :</label>
          <input
            className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
            type="text"
            placeholder="Enter the name of candidate"
          />
              </div>
              <div className="w-full flex item-center mt-[40px]">
            <label className="w-[30%]">Description :</label>
            <input
              className="w-[70%] pb-1 bg-transparent border-b-[1px] border-b-[#212121] outline-none"
              type="text"
              placeholder="Write something about your event"
            />
          </div>
    
          <div className="w-full flex item-center mt-[40px]">
            <label className="w-[30%]">Image :</label>
            <input
              className="w-[70%] pb-1 bg-transparent outline-none"
              type="file"
              
            />
              </div>
              <div className="w-full flex justify-center item-center mt-[40px]">
              <div onClick={()=>props.setIsDisplayed(false)} className="border bg-gray-500 hover:bg-gray-600 cursor-pointer mr-2 rounded-[10px] text-white px-[30px] py-[10px]">Cancel</div>
                  <div className="border bg-green-500 hover:bg-green-600 cursor-pointer rounded-[10px] text-white px-[30px] py-[10px]">Create</div>
             </div>
      </div>
    </div>
  );
}

export default CreateProposal
