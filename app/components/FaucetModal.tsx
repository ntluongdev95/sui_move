import React from 'react'
import { AuthService } from '../utils/authService';
import { SuiService } from '../utils/suiService';
interface Iprops {
    setShowModalFaucet: React.Dispatch<React.SetStateAction<boolean>>;
    
  }
const FaucetModal = (props:Iprops) => {
    const suiService = new SuiService();
    const getCoins = () => {
        suiService.requestSuiFromFaucet('devnet', AuthService.walletAddress())
    }
  return (
    <div className="layer-bg layer ">
          <div className="h-[30%] w-[30%] text-[20px] flex-col p-[20px] bg-white rounded-[10px] flex ">
              <div onClick={()=>props.setShowModalFaucet(false)} className='flex justify-end cursor-pointer'>X</div>
              <div className='flex justify-center items-center flex-col' >
              <div className="mb-[30px]">🚀 Get some devnet SUI Token</div>
                  <div onClick={getCoins} className='border text-[14px] cursor-pointer py-1 px-[20px] rounded-[10px] bg-[#45b8d2] text-white'>Request 10 SUI</div>
            </div>
        </div>
    </div>
  )
}

export default FaucetModal
