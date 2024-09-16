import AnvilSvg from "./svg/anvilSvg";
import CampfireSvg from "./svg/campfireSvg";
import MoonSvg from "./svg/moonSvg";

export default function TopPanel() {
    return <div className=' h-[100px] flex flex-row justify-between items-center'>
        <div className=' w-[250px] h-full flex flex-row gap-2'>
            <div className='flex flex-row justify-center items-center'>
                <img src="./img/1949499.jpg" alt="img" className='w-[100px] border border-solid border-red-700' />
            </div>
            <div>
                <div className='flex flex-row'>
                    <h6 className='text-sm text-white'>Character Name</h6> <button className='text-sm border border-solid border-red-700 hover:border-red-600 rounded-sm text-white'>MANAGE</button>
                </div>
                <p className='text-sm text-white'>Character Level and Race</p>
            </div>
        </div>
        <div className=' w-[300px] h-full flex flex-row justify-center items-center gap-3'>
            <div className='flex flex-row justify-center items-center border border-red-700 border-solid rounded-sm hover:border-red-600 cursor-pointer px-1'>
                <CampfireSvg className="w-[25px]" />
                <h6 className='text-white'>SHORT REST</h6>
            </div>
            <div className='flex flex-row justify-center items-center border border-red-700 border-solid rounded-sm hover:border-red-600 cursor-pointer px-1'>
                <MoonSvg className="w-[25px] h-[15px]" />
                <h6 className='text-white'>LONG REST</h6>
            </div>
            <div >
                <AnvilSvg className="w-[25px]" />
            </div>
        </div>
    </div>
}