import CoreStatCard from "./coreStatCard"
import DragonSvg from "./svg/dragonSvg"

const stats = [
    {
        name: "STR",
        modifier: 0,
        currentStat: 0
    },
    {
        name: "DEX",
        modifier: 0,
        currentStat: 0
    },
    {
        name: "CON",
        modifier: 0,
        currentStat: 0
    }
]
export default function StatsPanel() {
    return <div className='flex flex-row bg-blue-400'>
        <div className='h-[100px] flex flex-row gap-1 items-center flex-[4_4_0%] justify-center bg-green-500'>
            {stats.map((stat) => {
                return <CoreStatCard name={stat.name} key={stat.name} modifier={stat.modifier} currentStat={stat.currentStat} />
            })}
        </div>
        <div className='flex flex-row flex-[3_3_0%] justify-center bg-gray-600'>
            <div className='h-[100px] flex flex-col gap-1 items-center justify-center border border-red-700 border-solid mx-2 p-1 rounded-md'>
                <h6>Proficiency</h6>
                <h6>{ }</h6>
                <h6>Bonus</h6>
            </div>
            <div className='h-[100px] flex flex-col gap-1 items-center justify-center border border-red-700 border-solid mx-2 p-1 rounded-md'>
                <h6>Proficiency</h6>
                <h6>{ }<span className="text-gray-500">ft.</span></h6>
                <h6>Bonus</h6>
            </div>
        </div>
        <div className='flex flex-row flex-[3_3_0%] justify-center bg-yellow-400 gap-x-2'>
            <div className="flex flex-col gap-1 flex-[1.5_1.5_0%] justify-center items-center border border-red-700 border-solid rounded-sm">
                <div><DragonSvg className="w-[15px] h-[15px]" /></div>
                <div className="flex flex-col items-center"><span className="text-sm">HEROIC</span> <span className="text-sm">INSPIRATION</span></div>
            </div>

            <div className="flex flex-row justify-center items-center flex-[6_6_0%] gap-x-2">
                <div className="flex flex-col items-center gap-y-1">
                    <button><p className="text-sm border border-red-700 border-solid rounded-sm w-[75px]">HEAL</p></button>
                    <input type="number" className="w-[50px] border border-red-700 border-solid rounded-sm w-[75px] " />
                    <button><p className="text-sm border border-red-700 border-solid rounded-sm w-[75px]">DAMAGE</p></button>
                </div>
                <div className="flex flex-col flex-[6_6_0%] border border-red-700 border-solid rounded-sm">
                    <div className="flex flex-row justify-between"><p>CURRENT</p> <p>MAX</p> <p>TEMP</p></div>
                    <div className="flex flex-row justify-around"><p>0</p><p>/</p> <p>0</p> <p>0</p></div>
                    <div className="flex flex-row justify-around">HIT POINTS</div>
                </div>
            </div>
        </div>
    </div>
}