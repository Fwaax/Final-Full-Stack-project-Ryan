import CoreStatCard from "./coreStatCard";
import DragonSvg from "./svg/dragonSvg";
import { useState } from "react";
import clsx from "clsx";
import { coreAttributesAtom, hitPointsAtom, levelAtom } from "../atoms";
import { useAtom } from "jotai";
import { NumericInputWithNumberValue } from "./numberInput";

export default function StatsPanel() {
    const [level, setLevel] = useAtom(levelAtom);
    const [hp, setHp] = useAtom(hitPointsAtom);

    const [coreAttributes, setCoreAttributes] = useAtom(coreAttributesAtom);
    const [inputValue, setInputValue] = useState(0);
    const invisibleSpace = "\u200B";
    const [isInspired, setIsInspired] = useState(false);
    const proficiency = Math.ceil((level / 4) + 1);
    const displayProficiency = proficiency >= 0 ? `+${proficiency}` : `${proficiency}`

    function healHandler() {
        setHp({ ...hp, current: hp.current + inputValue });
        if (hp.current + inputValue > hp.max) {
            setHp({ ...hp, current: hp.max });
            return;
        }
    }
    function damageHandler() {
        setHp({ ...hp, current: hp.current - inputValue });
        if (hp.current - inputValue < 0) {
            setHp({ ...hp, current: 0 });
            return;
        }
    }

    return (
        <div className="flex flex-row flex-wrap bg-[#1d1e2a] p-4 shadow-lg border-4 border-[#14151f] border-solid gap-4 2xl:flex-row sm:flex-wrap md:flex-col">
            <div className="flex flex-wrap gap-4 items-center justify-center flex-[4_4_0%] text-[#bfbfba]">
                {Object.entries(coreAttributes).map(([attrKey, attrValue]) => {
                    const calcModifier = Math.floor((attrValue - 10) / 2);
                    const displayModifier = calcModifier >= 0 ? `+${calcModifier}` : `${calcModifier}`;
                    return (
                        <CoreStatCard
                            name={attrKey}
                            key={attrKey}
                            modifier={displayModifier}
                            currentStat={attrValue}
                        />
                    );
                })}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center w-full sm:w-auto">
                <div className="flex flex-col items-center gap-2 border border-[#bfbfba] p-2 rounded-md w-[100px] bg-[#14151f]">
                    <h6 className="text-[#bfbfba]">Proficiency</h6>
                    <h6 className="text-[#bfbfba]">Bonus</h6>
                    <h6>{displayProficiency}</h6>
                </div>
                <div className="flex flex-col items-center gap-2 h-[105px] border border-[#bfbfba] p-2 rounded-md w-[100px] bg-[#14151f]">
                    <h6 className="text-[#bfbfba]">Speed</h6>
                    <h6 className="text-gray-400">
                        <span>30 ft.</span>
                    </h6>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full sm:w-auto items-center">
                <div
                    className="flex flex-col h-[105px] items-center border border-[#bfbfba] p-2 rounded-md bg-[#14151f] gap-2"
                    onClick={() => setIsInspired(!isInspired)}
                >
                    <button className="h-[30px] w-[30px] flex justify-center items-center">
                        <DragonSvg
                            className={clsx(
                                "w-[30px] h-[30px]",
                                isInspired ? "visible" : "hidden"
                            )}
                        />
                    </button>
                    <div className="flex flex-col items-center bg-[#14151f]">
                        <span className="text-xs text-[#bfbfba]">HEROIC</span>
                        <span className="text-xs text-[#bfbfba]">INSPIRATION</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <button
                        className="text-sm border border-[#bfbfba] rounded-sm px-2 py-1 text-[#bfbfba] w-[80px] bg-[#14151f]"
                        onClick={healHandler}
                    >
                        HEAL
                    </button>
                    <input
                        type="number"
                        placeholder=""
                        className="w-[80px] border border-[#bfbfba] rounded-sm text-[#bfbfba] bg-[#14151f] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseInt(e.target.value))}
                    />
                    <button
                        className="text-sm border border-[#bfbfba] rounded-sm px-2 py-1 text-[#bfbfba] w-[80px] bg-[#14151f]"
                        onClick={damageHandler}
                    >
                        DAMAGE
                    </button>
                </div>

                <div className="flex flex-col border h-fit border-[#bfbfba] rounded-md p-2 text-[#bfbfba] gap-4 items-center bg-[#14151f]">
                    <div>
                        <p>HIT POINTS</p>
                    </div>
                    <div className="flex flex-row justify-center gap-3">
                        <div className="flex flex-col items-center">
                            <p>Current</p>
                            <p>{hp.current}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>/</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Max</p>
                            <p>{hp.max}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Temp</p>
                            <p>{hp.temp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
