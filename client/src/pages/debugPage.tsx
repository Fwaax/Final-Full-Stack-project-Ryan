import React from 'react'
import Dice from '../components/dice'
import CreationStatRoll from '../components/creationStatRoll'

const DebugPage = () => {
    return (
        <div className='flex flex-col bg-[#1a1b26]'>
            <button>Roll Dice</button>
            <Dice />
            <CreationStatRoll />
        </div>
    )
}

export default DebugPage
