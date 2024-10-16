import CoreStatCard from "./coreStatCard";
import DragonSvg from "./svg/dragonSvg";
import { useCharacterContext } from "../hooks/characterCotextProvider";

export default function StatsPanel() {
    const { character } = useCharacterContext();

    return (
        <div className='flex flex-row bg-gray-800 p-4 shadow-lg'>

            <div className='h-[100px] flex flex-row gap-4 items-center flex-[4_4_0%] justify-center  '>
                {Object.entries(character.coreAttributes).map((stat) => {
                    const [attrKey, attrValue] = stat;
                    const calcModifier = Math.floor((attrValue - 10) / 2);
                    return <CoreStatCard name={attrKey} key={attrKey} modifier={calcModifier} currentStat={attrValue} />
                })}
            </div>
            <div className='flex flex-row flex-[3_3_0%] justify-around  '>
                <div className='h-[100px] flex flex-col gap-2 items-center justify-center border border-red-700 p-2 rounded-md'>
                    <h6 className='text-white'>Proficiency</h6>
                    <h6>{Math.ceil((character.level / 4) + 1)}</h6>
                    <h6 className='text-gray-400'>Bonus</h6>
                </div>
                <div className='h-[100px] flex flex-col gap-2 items-center justify-center border border-red-700 p-2 rounded-md'>
                    <h6 className='text-white'>Speed</h6>
                    <h6 className='text-gray-400'><span>ft.</span></h6>
                </div>
            </div>
            <div className='flex flex-row flex-[3_3_0%] justify-center  gap-4'>
                <div className="flex flex-col gap-2 justify-center items-center border border-red-700 p-2 rounded-sm">
                    <DragonSvg className="w-[15px] h-[15px]" />
                    <span className="text-sm text-white">HEROIC</span>
                    <span className="text-sm text-white">INSPIRATION</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <button className="text-sm border border-red-700 rounded-sm px-2 py-1 text-white w-[80px]">HEAL</button>
                    <input type="number" className="w-[80px] border border-red-700 rounded-sm text-white bg-gray-800" />
                    <button className="text-sm border border-red-700 rounded-sm px-2 py-1 text-white w-[80px]">DAMAGE</button>
                </div>
                <div className="flex flex-col flex-[6_6_0%] border border-red-700 rounded-sm p-2 text-white">
                    <div className="flex justify-between">
                        <p>CURRENT</p> <p>MAX</p> <p>TEMP</p>
                    </div>
                    <div className="flex justify-between"><p>0</p> <p>/</p> <p>0</p> <p>0</p></div>
                    <div className="text-center">HIT POINTS</div>
                </div>
            </div>

        </div>
    );
}
