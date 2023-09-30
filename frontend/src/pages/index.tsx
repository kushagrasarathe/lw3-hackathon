import bg from '@assets/hero-bg.gif'
import mask from "@assets/mask.png";
import Image from "next/image";


export default function Home() {

  return (
    // hero
    <main className=" mt-2 relative  min-h-[85vh] flex items-center justify-center w-full">
      <div className=" relative h-full flex items-center justify-between px-72  w-full font-bold tracking-wide mt-12">
        <div className=" w-full z-20 text-center ">
          <div className=" z-10 self-start text-start font-bold mb-3 text-5xl tracking-wide ml-20 bg-clip-text drop-shadow-lg text-transparent bg-center bg-[url('../assets/bg.jpg')]">
            SecureID
          </div>
          {/* <div className=" self-start text-[150px]">BUT WITH</div> */}
          <div className=" font-extrabold   tracking-wide text-7xl text-[160px]">
            {/* <span className="text-transparent  drop-shadow-lg bg-clip-text bg-gradient-to-r from-sky-500 to-[#1fb4b0] "> */}
            <span className=" bg-clip-text drop-shadow-lg text-transparent bg-left bg-[url('../assets/bg.jpg')]">
              Smart{" "}
            </span>
            {/* <span className=" bg-clip-text text-transparent bg-center bg-[url('../assets/hero-bg.gif')]"> */}
            <span className=" bg-clip-text drop-shadow-lg text-transparent bg-right bg-[url('../assets/bg.jpg')]">
              Accounts
            </span>
          </div>
          <div className="  bg-clip-text drop-shadow-lg text-transparent bg-left bg-[url('../assets/bg.jpg')] tracking-wide text-4xl text-end mr-20 mt-4">
            Powered by SpaceID
          </div>
        </div>
        <Image
          className=" opacity-0 blur-sm mt-10 max-w-4xl absolute top-1/2 left-1/2 transform rotate-[18deg] -translate-x-1/2 -translate-y-1/2 z-0"
          // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
          src={bg}
          alt="bg"
        />
      </div>
      {/* // className=" mask opacity-100 blur-sm mt-10 max-w-4xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" */}
      <Image
        className=" mask max-w-2xl absolute top-60 left-96 z-0 "
        // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
        src={mask}
        alt="bg"
      />
      <Image
        className=" mask max-w-2xl absolute top-[49vh] left-[67vw] z-0 "
        // className=" z-0 absolute rotate-[18deg] right-72 -top-64 "
        src={mask}
        alt="bg"
      />
    </main>
  )
}
