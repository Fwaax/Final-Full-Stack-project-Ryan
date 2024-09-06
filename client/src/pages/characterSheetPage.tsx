import React from 'react'
import CampfireSvg from '../components/svg/campfireSvg'
import AnvilSvg from '../components/svg/anvilSvg'
import MoonSvg from '../components/svg/moonSvg'

const CharacterSheetPage = () => {
    return (
        <div className='w-full h-full bg-[#292929]'>
            <div className='w-11/12 mx-auto flex flex-col gap-2'>
                <TopPanel />



                <div className='bg-green-500 h-[100px]'>
                    <div>

                    </div>
                </div>


                <div className='bg-red-700 h-[800px]'></div>
            </div>
        </div>
    )
}

function TopPanel() {
    return <div className=' h-[100px] flex flex-row justify-between items-center'>
        <div className=' w-[250px] h-full flex flex-row gap-2'>
            <div className='flex flex-row justify-center items-center'>
                <img src="./img/1949499.jpg" alt="img" className='w-[100px] border border-solid border-black' />
            </div>
            <div>
                <div className='flex flex-row'>
                    <h6 className='text-sm'>Character Name</h6> <button className='text-sm bg-gray-700 border border-solid border-black rounded-sm text-white'>MANAGE</button>
                </div>
                <p className='text-sm'>Character Level and Race</p>
            </div>
        </div>
        <div className=' w-[300px] h-full flex flex-row justify-center items-center gap-3'>
            <div className='flex flex-row justify-center items-center border border-red-700 border-solid hover:border-red-600 cursor-pointer px-1'>
                <CampfireSvg className="w-[25px]" />
                <h6 className='text-white'>SHORT REST</h6>
            </div>
            <div className='flex flex-row justify-center items-center border border-red-700 border-solid hover:border-red-600 cursor-pointer px-1'>
                <MoonSvg className="w-[25px] h-[15px]" />
                <h6 className='text-white'>LONG REST</h6>
            </div>
            <div >
                <AnvilSvg className="w-[25px]" />
            </div>
        </div>
    </div>
}

export default CharacterSheetPage
