import React, { useState } from 'react'
import { getRandomInt } from '../utility/numbers'

const DICE_VALUES = [4, 6, 8, 10, 12, 20]
const Dice = () => {

    const [diceResult, setDiceResult] = useState(0)
    function handleDimension(value: number) {
        const randomValue = getRandomInt(1, value)
        setDiceResult(randomValue);
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-3'>
                {DICE_VALUES.map((value, index) => {
                    return <button key={index} onClick={() => handleDimension(value)} className='px-4 py-2 bg-blue-400 rounded-md border border-solid border-black hover:bg-blue-400/80'>D{value}</button>
                })}
            </div>
            <p className='text-3xl text-center'>{diceResult}</p>
        </div>
    )
}

export default Dice
