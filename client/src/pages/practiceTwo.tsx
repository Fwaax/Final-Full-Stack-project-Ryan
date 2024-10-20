import React, { useState } from 'react'

function rollDieForDamage(die_size: number, die_num: number, mod: number) {
    let finalDmg = 0;
    let dmgRoll = 0;

    for (let i = 1; i <= die_num; i++) {
        dmgRoll = Math.floor(Math.random() * die_size) + 1;
        finalDmg = finalDmg + dmgRoll;
        console.log(`dmgRoll`, dmgRoll);
        console.log(`finalDmg`, finalDmg);
    }
    finalDmg = finalDmg + mod
    return finalDmg
}

const DICE_SIDES = [4, 6, 8, 10, 12, 20]

const PracticeTwo = () => {
    const [diceSize, setDiceSize] = useState(0)
    const [mod, setMod] = useState(0)
    const [numberOfRolls, setNumberOfRolls] = useState(0)
    const [dmgRoll, setDmgRoll] = useState(0)
    const [hasRolled, setHasRolled] = useState(false)

    function handleDieClick(die_size: number) {
        setDiceSize(die_size);
        setDmgRoll(rollDieForDamage(diceSize, numberOfRolls, mod));
        setHasRolled(true);
    }

    return (
        <div>
            <h1>Practice Two</h1>
            <div className='flex flex-col gap-5'>
                {DICE_SIDES.map((d, i) => (
                    <button key={i} onClick={() => handleDieClick(d)}>D{d}</button>
                ))}
                <div>
                    <label htmlFor="modifier">Modifier:</label>
                    <input type="number" name='modifier' id='modifier' className='bg-gray-800' onChange={(e) => setMod(Number(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="numberOfRolls">Number of Dices</label>
                    <input type="number" name="dices" id="dives" className='bg-gray-800' onChange={(e) => setNumberOfRolls(Number(e.target.value))} />
                </div>
            </div>
            {hasRolled &&
                <div id="roll-results">
                    <p>You rolled {numberOfRolls}D{diceSize}+{mod}</p>
                    <p className='text-3xl border border-[#bfbfba] p-2 rounded-md'>{dmgRoll}</p>
                </div>
            }
        </div>
    )
}

export default PracticeTwo