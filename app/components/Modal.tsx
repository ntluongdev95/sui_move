import Loading from "./Loading"


const Modal = () => {
  return (
    <div className="layer-bg layer ">
          <div className="h-[30%] w-[30%] text-[20px] flex-col bg-white rounded-[10px] flex justify-center items-center">
              <div className="mb-[30px]">🚀 You are redirecting to log in with Google</div>
              <Loading />
        </div>
    </div>
  )
}

export default Modal
