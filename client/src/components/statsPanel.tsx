import CoreStatCard from "./coreStatCard";
import DragonSvg from "./svg/dragonSvg";
import { useCharacterContext } from "../hooks/characterCotextProvider";
import { useState } from "react";
import clsx from "clsx";

export default function StatsPanel() {
    const { character } = useCharacterContext();
    const invisibleSpace = "\u200B";
    const [isInspired, setIsInspired] = useState(false);
    const proficiency = Math.ceil((character.level / 4) + 1);
    const displayProficiency = proficiency >= 0 ? `+${proficiency}` : `${proficiency}`

    return (
        <div className='flex flex-row bg-[#1d1e2a] p-4 shadow-lg'>
            <div className="flex flex-row gap-4 items-center flex-[4_4_0%] justify-center">
                <div className='h-full flex flex-row gap-4 items-center flex-[4_4_0%] justify-center'>
                    {Object.entries(character.coreAttributes).map((stat) => {
                        const [attrKey, attrValue] = stat;
                        const calcModifier = Math.floor((attrValue - 10) / 2);
                        const displayModifier = calcModifier >= 0 ? `+${calcModifier}` : `${calcModifier}`;
                        return <CoreStatCard name={attrKey} key={attrKey} modifier={displayModifier} currentStat={attrValue} />
                    })}
                </div>
                <div className='flex flex-row flex-[3_3_0%] justify-around h-full'>
                    <div className=' flex flex-col gap-2 items-center justify-center border border-red-700 p-2 rounded-md w-[100px]'>
                        <h6 className='text-white'>Proficiency</h6>
                        <h6 className='text-white'>Bonus</h6>
                        <h6>{displayProficiency}</h6>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center border border-red-700 p-2 rounded-md w-[100px]'>
                        <h6 className='text-white'>Speed</h6>
                        <h6 className='text-gray-400'><span>ft.</span></h6>
                    </div>
                </div>
                <div className='flex flex-row flex-[3_3_0%] justify-center  gap-4'>
                    <div className="flex flex-col gap-2 justify-center items-center border border-red-700 px-2 rounded-md" onClick={() => setIsInspired(!isInspired)}>
                        <button className="h-[30px] w-[30px] flex justify-center items-center" >
                            <DragonSvg className={clsx("w-[30px] h-[30px]", isInspired ? "visible" : "hidden")} />
                        </button>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-white">HEROIC</span>
                            <span className="text-xs text-white">INSPIRATION</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <button className="text-sm border border-red-700 rounded-sm px-2 py-1 text-white w-[80px]">HEAL</button>
                        <input type="number" className="w-[80px] border border-red-700 rounded-sm text-white bg-[#1d1e2a]" />
                        <button className="text-sm border border-red-700 rounded-sm px-2 py-1 text-white w-[80px]">DAMAGE</button>
                    </div>
                    <div className="flex flex-col flex-[6_6_0%]  border border-red-700 rounded-md p-2 text-white gap-4 items-center">
                        <div className="flex flex-row justify-center gap-3 ">
                            <div className="flex flex-col items-center">
                                <p>Current</p>
                                <p>1</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p>{invisibleSpace}</p>
                                <p>/</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p>Max</p>
                                <p>2</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p>Temp</p>
                                <p>3</p>
                            </div>
                        </div>
                        <div>
                            <p>HIT POINTS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
