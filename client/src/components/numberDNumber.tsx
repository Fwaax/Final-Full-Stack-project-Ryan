import React, { useState } from 'react';
import CreationStatRoll from './creationStatRoll';

function rollDieForDamage(die_size: number, die_num: number, mod: number) {
    let finalDmg = 0;
    let dmgRoll = 0;

    for (let i = 0; i < die_num; i++) {
        dmgRoll = Math.floor(Math.random() * die_size) + 1;
        finalDmg = finalDmg + dmgRoll;
    }
    finalDmg = finalDmg + mod;
    return finalDmg;
}

const DICE_SIDES = [4, 6, 8, 10, 12, 20];

const NumberDNumber = () => {
    const [diceSize, setDiceSize] = useState(0);
    const [mod, setMod] = useState(0);
    const [currentNumberOfRolls, setCurrentNumberOfRolls] = useState(0);
    const [dmgRoll, setDmgRoll] = useState(0);
    const [hasRolled, setHasRolled] = useState(false);
    const [prevNumberOfRolls, setPrevNumberOfRolls] = useState(0);

    function handleDieClick(die_size: number) {
        let numOfDie = currentNumberOfRolls
        setDiceSize(die_size);
        if (numOfDie === 0) {
            numOfDie = 1
        }
        setDmgRoll(rollDieForDamage(die_size, numOfDie, mod));
        setHasRolled(true);
        setPrevNumberOfRolls(numOfDie);
    }

    return (
        <div className="flex flex-col min-h-[93vh] bg-[#1d1e2a]">
            <main className="flex-grow flex flex-col items-center justify-start p-4">
                <h1 className="text-[#bfbfba] text-2xl mb-6">Roll your luck!</h1>
                <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-row flex-wrap sm:gap-3 gap-2 justify-center">
                        {DICE_SIDES.map((d, i) => (
                            <button
                                key={i}
                                className="bg-[#2a2b3c] text-[#bfbfba] p-3 rounded"
                                onClick={() => handleDieClick(d)}
                            >
                                D{d}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-row flex-wrap gap-3 mt-4 justify-center">
                        <div className="flex flex-col w-full sm:w-auto">
                            <label htmlFor="modifier" className="text-[#bfbfba]">
                                Modifier:
                            </label>
                            <input
                                type="number"
                                name="modifier"
                                id="modifier"
                                className="bg-[#1a1b26] border border-solid border-[#bfbfba] p-1 rounded-sm"
                                onChange={(e) => setMod(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col w-full sm:w-auto">
                            <label htmlFor="numberOfRolls" className="text-[#bfbfba]">
                                Number of Dices
                            </label>
                            <input
                                type="number"
                                name="dices"
                                id="dices"
                                className="bg-[#1a1b26] border border-solid border-[#bfbfba] p-1 rounded-sm"
                                onChange={(e) => setCurrentNumberOfRolls(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
                {hasRolled && (
                    <div id="roll-results" className="mt-6">
                        <p className="text-[#bfbfba]">
                            You rolled {prevNumberOfRolls}D{diceSize}+{mod}
                        </p>
                        <p className="text-3xl border border-[#bfbfba] p-2 rounded-md text-[#bfbfba]">
                            {dmgRoll}
                        </p>
                    </div>
                )}
            </main>
        </div>

    );
};

export default NumberDNumber;
