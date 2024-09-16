import React from 'react'
import TopPanel from '../components/topPanel'
import StatsPanel from '../components/statsPanel'
import BottomPanel from '../components/bottomPanel'


const CharacterSheetPage = () => {
    return (
        <div className='w-full h-full bg-[#292929]'>
            <div className='w-11/12 2xl:w-9/12 mx-auto flex flex-col gap-2'>
                <TopPanel />



                <StatsPanel />

                <BottomPanel />


            </div>
        </div>
    )
}


export default CharacterSheetPage



// < div className = 'flex flex-col items-center' >
//     <div className='flex flex-row gap-x-5 w-[6rem] justify-center'>
//         <div>
//             <p>•</p>
//         </div>
//         <div>
//             <p>STR</p>
//         </div>
//         <div>
//             <p>PH</p>
//         </div>
//     </div>
