import Image from 'next/image'
import two from "../../public/two.jpeg";
export default function Home() {
  return (
    <main className="bg-[#fdfdfa] w-screen h-screen relative flex items-center justify-center p-9 ">
        {/* form container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5 items-center">
        {/* left  */}
        <div className="sm:w-1/2 px-16">
          <h1 className='text-[30px] font-bold text-[#c3a791]'>Add details</h1>
          <p className="text-[15px] text-[#c3a791] mt-1">add the details below!</p>
          <form action="" className='flex flex-col gap-4'>
            <input className="p-2 mt-8 rounded-xl border " type="email" name="email" placeholder='Email Address'/>
            <input className="p-2 mt-8 rounded-xl border"  type="text" name="twitter" placeholder='Twitter'/>
            <input className="p-2 mt-8 rounded-xl border" type="text" name="github" placeholder='GitHub'/>
            <input className="p-2 mt-8 rounded-xl border" type="text" name="linkdin" placeholder='LinkdIn'/>
            <div className='flex flex-row gap-10 justify-center py-3'>
            <button className="bg-[#aa8c76] rounded-xl text-white py-2 hover:scale-105 duration-300" style={{ width: '120px' }}>Create</button>
            <button className="bg-[#aa8c76] rounded-xl text-white py-2 hover:scale-105 duration-300" style={{ width: '120px' }}>Cancel</button>

            </div>
          </form>
        </div>
        {/* img  */}
        <div className="sm:block hidden w-1/2 ">
        <Image
          className="rounded-2xl"
          style={{ width: '600px', height: '500px' }}
          src={two}
          alt="alt"
        />
        </div>
      </div>
    </main>
  );
}
