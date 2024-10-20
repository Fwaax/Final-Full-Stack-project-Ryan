import AnvilSvg from "./svg/anvilSvg";
import CampfireSvg from "./svg/campfireSvg";
import MoonSvg from "./svg/moonSvg";
import { useCharacterContext } from "../hooks/characterCotextProvider";

export default function TopPanel() {

    const { character } = useCharacterContext();
    return (
        <div className='h-[100px] flex flex-row justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg'>
            <div className='w-[250px] h-full flex flex-row gap-4 items-center'>
                <div className='flex flex-row justify-center items-center'>
                    <img src="./img/1949499.jpg" alt="img" className='w-[100px] border border-solid border-red-700 rounded-full' />
                </div>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='flex flex-col'>
                            <div className="flex flex-row gap-x-4">
                                <h6 className='text-xl text-white'>{character.name}</h6>
                                <button className='text-sm border border-solid border-red-700 hover:border-red-600 rounded-sm px-2 py-1 text-white'>
                                    MANAGE
                                </button>
                            </div>
                            <h6 className="text-sm text-white">
                                {`${character.appearance.gender} ${character.race} ${character.class}`}
                            </h6>
                        </div>
                    </div>
                    <p className='text-sm text-gray-400'>{`Level ${character.level}`}</p>
                </div>
            </div>
            <div className='w-[350px] h-full flex flex-row justify-center items-center gap-4'>
                <div className='flex flex-row justify-center items-center border border-red-700 rounded-sm hover:border-red-600 cursor-pointer px-3 py-1'>
                    <CampfireSvg className="w-[25px]" />
                    <h6 className='text-white ml-2'>SHORT REST</h6>
                </div>
                <div className='flex flex-row justify-center items-center border border-red-700 rounded-sm hover:border-red-600 cursor-pointer px-3 py-1'>
                    <MoonSvg className="w-[25px] h-[15px]" />
                    <h6 className='text-white ml-2'>LONG REST</h6>
                </div>
                <div>
                    <AnvilSvg className="w-[25px]" />
                </div>
            </div>
        </div>
    );
}
