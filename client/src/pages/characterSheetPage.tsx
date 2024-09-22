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