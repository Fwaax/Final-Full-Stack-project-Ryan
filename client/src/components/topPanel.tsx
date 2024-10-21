import AnvilSvg from "./svg/anvilSvg";
import CampfireSvg from "./svg/campfireSvg";
import MoonSvg from "./svg/moonSvg";
import { appearanceAtom, classAtom, levelAtom, nameAtom, raceAtom } from "../atoms";
import { useAtom } from "jotai";

export default function TopPanel() {

    const [appearance, setAppearance] = useAtom(appearanceAtom);
    const [name, setName] = useAtom(nameAtom);
    const [classy, setClassy] = useAtom(classAtom);
    const [race, setRace] = useAtom(raceAtom);
    const [level, setLevel] = useAtom(levelAtom);

    return (
        <div className='h-[100px] flex flex-row justify-between items-center bg-[#1d1e2a] p-4 rounded-sm shadow-lg border-4 border-[#14151f] border-solid'>
            <div className='w-[250px] h-full flex flex-row gap-4 items-center'>
                <div className='flex flex-row justify-center items-center'>
                    <img src="./img/1949499.jpg" alt="img" className='w-[100px] border border-solid border-[#bfbfba] rounded-full' />
                </div>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='flex flex-col'>
                            <div className="flex flex-row gap-x-4">
                                <h6 className='text-xl text-[#bfbfba]'>{name}</h6>
                                <button className='text-sm border border-solid border-[#bfbfba] hover:border-[#556b82] rounded-sm px-2 py-1 text-[#bfbfba]'>
                                    MANAGE
                                </button>
                            </div>
                            <h6 className="text-sm text-[#bfbfba]">
                                {`${appearance.gender} ${race} ${classy}`}
                            </h6>
                        </div>
                    </div>
                    <p className='text-sm text-gray-400'>{`Level ${level}`}</p>
                </div>
            </div>
            <div className='w-[350px] h-full flex flex-row justify-center items-center gap-4'>
                <div className='flex flex-row justify-center items-center border border-[#bfbfba] rounded-sm hover:border-[#556b82] cursor-pointer px-3 py-1'>
                    <CampfireSvg className="w-[25px]" />
                    <h6 className='text-[#bfbfba] ml-2'>SHORT REST</h6>
                </div>
                <div className='flex flex-row justify-center items-center border border-[#bfbfba] rounded-sm hover:border-[#556b82] cursor-pointer px-3 py-1'>
                    <MoonSvg className="w-[25px] h-[15px]" />
                    <h6 className='text-[#bfbfba] ml-2'>LONG REST</h6>
                </div>
                <div>
                    <AnvilSvg className="w-[25px] cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
