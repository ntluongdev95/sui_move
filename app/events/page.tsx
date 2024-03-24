"use client"
import Header from "../components/Header";
//https://imgv3.fotor.com/images/blog-richtext-image/part-blurry-image.jpg
const Events = () => {
  const handleClickPrev = () => {
    const lists: NodeListOf<Element> = document.querySelectorAll(".item");
    const slideElement: HTMLElement | null = document.getElementById("slide");

    if (slideElement && lists.length > 0) {
      slideElement.appendChild(lists[0]);
    }
  }
  const handleClickNext = () => {
    const lists: NodeListOf<Element> = document.querySelectorAll(".item");
    const slideElement: HTMLElement | null = document.getElementById("slide");

    if (slideElement && lists.length > 0) {
      slideElement.prepend(lists[lists.length - 1]);
    }
  }
  return (
    <div className="h-screen w-full    ">
      <Header />
      <div className=" w-full h-screen top-[0px] flex items-center justify-center">
        <div className="container">
        <div id="slide">
            <div className="item bg-[url('https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg')]" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item bg-[url('https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80')]" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item bg-[url('https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80')]" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item  bg-[url('https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80')]" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
            <div className="item  bg-[url('https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80')]" >
                <div className="content">
                    <div className="name">LUNDEV</div>
                    <div className="des">Tinh ru anh di chay pho, chua kip chay pho thi anhchay mat tieu</div>
                    <button>See more</button>
                </div>
            </div>
        </div>
        <div className="buttons">
        <div className="flex ">
          <div onClick={handleClickPrev}  className="button flex  items-center justify-center" id="prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6  "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div onClick={handleClickNext} className="flex button items-center justify-center" id="next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
/**
 *  <div className="buttons">
        <div className="flex ">
          <button className="flex items-center justify-center" id="prev">
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
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center" id="next">
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
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
        </div>
 */