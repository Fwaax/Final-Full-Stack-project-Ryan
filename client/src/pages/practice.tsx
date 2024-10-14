import React, { useState } from 'react'


const DICE_SIZE = [4, 6, 8, 10, 12, 20]



function randomizer(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const Practice = () => {

    const [diceSize, setDiceSize] = useState(0)
    const [mod, setMod] = useState(0)

    function handleRoll(d: number, m: number) {
        const randomValue = randomizer(1, d)
        setDiceSize(randomValue + m)
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1>Practice</h1>
            <div>
                <div className='flex flex-row gap-4'>
                    {DICE_SIZE.map((d, i) => (
                        <button key={i} onClick={() => handleRoll(d, mod)}>D{d}</button>
                    ))}
                    <div>
                        <label htmlFor="modifier" >Modifier:</label>
                        <input type="number" className='bg-gray-800' name="modifier" id="modifier" onChange={(e) => setMod(Number(e.target.value))} />
                    </div>
                    <p>{diceSize}</p>
                </div>
            </div>
        </div>
    )
}

export default Practice
