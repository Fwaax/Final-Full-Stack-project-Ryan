import CoreStatCard from "./coreStatCard";
import DragonSvg from "./svg/dragonSvg";
import { useState } from "react";
import clsx from "clsx";
import { coreAttributesAtom, levelAtom } from "../atoms";
import { useAtom } from "jotai";

export default function StatsPanel() {
    const [level, setLevel] = useAtom(levelAtom);
    const [coreAttributes, setCoreAttributes] = useAtom(coreAttributesAtom);

    const invisibleSpace = "\u200B";
    const [isInspired, setIsInspired] = useState(false);
    const proficiency = Math.ceil((level / 4) + 1);
    const displayProficiency = proficiency >= 0 ? `+${proficiency}` : `${proficiency}`

    return (
        <div className='flex flex-row bg-[#1d1e2a] p-4 shadow-lg border-4 border-[#14151f] border-solid'>
            <div className="flex flex-row gap-4 items-center flex-[4_4_0%] justify-center">
                <div className='h-full flex flex-row gap-4 items-center flex-[4_4_0%] justify-center text-[#bfbfba]'>
                    {Object.entries(coreAttributes).map((stat) => {
                        const [attrKey, attrValue] = stat;
                        const calcModifier = Math.floor((attrValue - 10) / 2);
                        const displayModifier = calcModifier >= 0 ? `+${calcModifier}` : `${calcModifier}`;
                        return <CoreStatCard name={attrKey} key={attrKey} modifier={displayModifier} currentStat={attrValue} />
                    })}
                </div>
                <div className="flex flex-col w-[300px]">
                    <div className='flex flex-row flex-[3_3_0%] justify-around h-full'>
                        <div className=' flex flex-col gap-2 items-center justify-center border border-[#bfbfba] p-2 rounded-md w-[100px] bg-[#14151f]'>
                            <h6 className='text-[#bfbfba]'>Proficiency</h6>
                            <h6 className='text-[#bfbfba]'>Bonus</h6>
                            <h6>{displayProficiency}</h6>
                        </div>
                        <div className='flex flex-col gap-2 items-center justify-center border border-[#bfbfba] p-2 rounded-md w-[100px] bg-[#14151f]'>
                            <h6 className='text-[#bfbfba]'>Speed</h6>
                            <h6 className='text-gray-400'><span>ft.</span></h6>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row flex-[6_6_0%] justify-center  gap-4'>
                    <div className="flex flex-col gap-2 justify-center items-center border border-[#bfbfba] px-2 rounded-md bg-[#14151f]" onClick={() => setIsInspired(!isInspired)}>
                        <button className="h-[30px] w-[30px] flex justify-center items-center" >
                            <DragonSvg className={clsx("w-[30px] h-[30px]", isInspired ? "visible" : "hidden")} />
                        </button>
                        <div className="flex flex-col items-center bg-[#14151f]">
                            <span className="text-xs text-[#bfbfba]">HEROIC</span>
                            <span className="text-xs text-[#bfbfba]">INSPIRATION</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <button className="text-sm border border-[#bfbfba] rounded-sm px-2 py-1 text-[#bfbfba] w-[80px] bg-[#14151f]">HEAL</button>
                        <input type="number" className="w-[80px] border border-[#bfbfba] rounded-sm text-[#bfbfba] bg-[#14151f]" />
                        <button className="text-sm border border-[#bfbfba] rounded-sm px-2 py-1 text-[#bfbfba] w-[80px] bg-[#14151f]">DAMAGE</button>
                    </div>
                    <div className="flex flex-col flex-[6_6_0%]  border border-[#bfbfba] rounded-md p-2 text-[#bfbfba] gap-4 items-center bg-[#14151f]">
                        <div>
                            <p>HIT POINTS</p>
                        </div>
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

                    </div>
                </div>
            </div>
        </div>
    );
}
