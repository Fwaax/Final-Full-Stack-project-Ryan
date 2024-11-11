import React, { useState } from 'react'
import { getRandomInt } from '../utility/numbers'
import { NumericInputWithNumberValue } from './numberInput'

const DICE_VALUES = [4, 6, 8, 10, 12, 20]
const Dice = () => {

    const [diceResult, setDiceResult] = useState(0)
    const [modifier, setModifier] = useState(0)

    function handleDimension(value: number, modifier: number) {
        const randomValue = getRandomInt(1, value)
        setDiceResult(randomValue + modifier);
    }


    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-3'>
                {DICE_VALUES.map((value, index) => {
                    return <button key={index} onClick={() => handleDimension(value, Number(modifier))} className='px-4 py-2 bg-[#556b82] text-[#bfbfba] rounded-md border border-solid border-[#bfbfba] hover:bg-blue-400/80'>D{value}</button>
                })}
                <div>
                    <label htmlFor="modifier">Modifier:</label>
                    <NumericInputWithNumberValue className='mt-1' onlyAllowIntegers={true} setValue={setModifier} value={modifier} />
                </div>
            </div>
            <p className='text-3xl text-center'>{diceResult}</p>
        </div>
    )
}

export default Dice
