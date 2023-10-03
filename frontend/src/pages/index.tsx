import bg from "@assets/hero-bg.gif";
import mask from "@assets/mask.png";
import Image from "next/image";
import { resolveDomainETH, revResolveETH } from "@/components/spaceID";

export default function Home() {
  revResolveETH("0xB72a04B01BB80DfD6a42ea8E0907B892286113F2");

  return (
    // bg-gradient-to-r from-cyan-50 to-cyan-100
    <div className="bg-[#fed385">
      {/* // hero */}
      {/* bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-300 to-violet-400 */}
      <main className=" hero  mt2 relative md:w-11/12 mx-auto  min-h-screen flex flex-col items-center justify-center w-full">
        <div className="   -mt-24 relative h-full flex items-center justify-between  w-full font-bold tracking-wide">
          <div className=" w-full z-20 text-center ">
            {/* <div className=" z-10 self-start text-start font-bold mb-3 text-5xl tracking-wide ml-10 bg-clip-text drop-shadow-lg text-transparent bg-bttom bg-[url('../assets/bg.jpg')]">
              SecureID
            </div> */}
            {/* <div className=" self-start text-[150px]">BUT WITH</div> */}
            <div className=" relative flex flex-col items-center justify-center max-w-7xl mx-auto">
              <div className=" font-extrabold mb-8 tracking-wide text-7xl text-[120px]">
                {/* <span className="text-transparent  drop-shadow-lg bg-clip-text bg-gradient-to-r from-sky-500 to-[#1fb4b0] "> */}
                <span className=" bg-clip-text drop-shadow-lg text-transparent bg-top bg-[url('../assets/bg.jpg')]">
                  Smart{" "}
                </span>
                {/* <span className=" bg-clip-text text-transparent bg-center bg-[url('../assets/hero-bg.gif')]"> */}
                <span className=" bg-clip-text drop-shadow-lg text-transparent bg-bottom bg-[url('../assets/bg.jpg')]">
                  Accounts
                </span>
              </div>
              <div className=" absolute bottom-0 right-48  bg-clip-text drop-shadow-lg text-transparent bg-top bg-[url('../assets/bg.jpg')] tracking-wide text-2xl text-end mt-4">
                Powered by SpaceID
              </div>
            </div>
            <p className=" max-w-3xl text-xl tracking-wide font-semibold text-center mx-auto mt-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
              doloribus nobis, nemo perferendis voluptatem laudantium ut
              adipisci dolor ex blanditiis rerum repellat qui. Nostrum, omnis
              adipisci vel accusantium magnam cupiditate.
            </p>
            <button className=" text-white font-normal tracking-wide text-lg mt-5 self-start z-20 bg-[#130f06] cursor-pointer rounded-md active:scale-95 transition-all ease-in-out px-3 py-2 ">
              {/* <span className="text-transparent font-normal tracking-wide text-lg bg-clip-text bg-gradient-to-r from-black -400 to-black -600"> */}
              Get Started
              {/* </span> */}
            </button>
          </div>
          {/* <Image
            className=" opacity-0 blur-sm mt-10 max-w-4xl absolute top-1/2 left-1/2 transform rotate-[18deg] -translate-x-1/2 -translate-y-1/2 z-0"
            // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
            src={bg}
            alt="bg"
          /> */}
        </div>
        {/* // className=" mask opacity-100 blur-sm mt-10 max-w-4xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" */}
        {/* <Image
          className=" mask max-w-2xl absolute top-60 left-96 z-0 "
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={mask}
          alt="bg"
        /> */}
        {/* <Image
          className=" mask max-w-2xl absolute top-[49vh] right-[-80px] z-0 "
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={mask}
          alt="bg"
        /> */}
      </main>
      <div className=" min-h-screen bg-[#0f0e11]">s</div>
    </div>
  );
}
