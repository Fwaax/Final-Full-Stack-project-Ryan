import React from 'react'
import CharacterTabsPanel from './characterTabsPanel'
import { useCharacterContext } from '../hooks/characterCotextProvider';
import { Skill } from '../Interfaces/apiRespose';

const BottomPanel = () => {
    return (
        <div className='flex flex-row w-full'>
            <LeftSection />

            <MiddleSection />

            <RightSection />
        </div>
    )
}

function LeftSection() {
    const { character } = useCharacterContext();
    return (
        <div className='bg-gray-800 h-[800px] w-full flex-[2_2_0%] p-4 rounded-lg'>

            <div className='flex flex-col justify-around gap-2 border border-black border-solid' id='saving_throws'>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>STR</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['STR']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>DEX</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['DEX']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CON</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['CON']}</p>
                        </div>
                    </div>

                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>INT</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['INT']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>WIS</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['WIS']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CHA</p>
                            <p className='flex-[2_2_0%] text-center'>{character.coreAttributes['CHA']}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='col-span-2 flex flex-col justify-center'>
                        <p>Advantage display</p>
                        <p>character.advantages</p>
                    </div>
                    <div className='col-span-2 flex flex-col justify-center'>
                        <p>SAVING THROWS</p>
                        <p>character.savingThrows</p>
                    </div>
                </div>
            </div>

            {/* --------------------------MUST ADD AND CHECK PROFICEINCY--------------------------------- */}

            <div className='border border-black border-solid'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSTIVE PRECEPTION</p>
                        <p className='text-center w-[2rem]'>({Math.floor(10 + ((character.coreAttributes['WIS']) - 10) / 2)})</p>
                    </div>
                    <div className='flex flex-row  justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INVESTIGATION</p>
                        <p className='text-center w-[2rem]'>({Math.floor(10 + ((character.coreAttributes['INT']) - 10) / 2)})</p>
                    </div>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INSIGHT</p>
                        <p className='text-center w-[2rem]'>({(Math.floor(10 + ((character.coreAttributes['WIS']) - 10) / 2))})</p>
                    </div>
                    <div className='flex justify-center'>
                        <p>Darkvision { } ft.</p>
                    </div>
                    <div className='flex justify-center'>
                        <p>SENSES</p>
                    </div>
                </div>
            </div>

            {/* ----------------------------------------------------------- */}

            <div className='border border-black border-solid'>
                <div>
                    <div className='flex flex-col items-center'>
                        <h6>ARMOR</h6>
                        <p>PH</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6>WEAPONS</h6>
                        <p>PH</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6>TOOLS</h6>
                        <p>PH</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6>LANGUAGES</h6>
                        <p>PH</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6>PROFICIENIES & TRAINING</h6>
                    </div>
                </div>
            </div>

        </div>
    )
}


function formatSkillName(skillKey: string) {
    return skillKey
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
        .toUpperCase(); // Convert to uppercase
}

function MiddleSection() {
    const { character } = useCharacterContext();
    return (
        <div className="bg-gray-800 h-[800px] w-full flex-[2_2_0%] p-4 rounded-lg">
            {/* Header Table */}
            <div className="flex flex-row w-full text-center underline mb-4">
                <div className="flex-[1_1_0%]">PROF</div>
                <div className="flex-[1_1_0%]">MOD</div>
                <div className="flex-[3_3_0%]">SKILL</div>
                <div className="flex-[1_1_0%]">BONUS</div>
            </div>
            {/* Content Table */}
            <div className="flex flex-col gap-y-3">
                {Object.entries(character.skills).map(([skillKey, skillObj], index) => (
                    <div className="flex flex-row w-full text-center" key={index}>
                        <div className="flex-[1_1_0%]">{skillObj.proficiency ? '✅' : '❌'}</div>
                        <div className="flex-[1_1_0%]">{formatSkillName(skillKey)}</div>
                        <div className="flex-[3_3_0%]">{skillObj.modifier}</div>
                        <div className="flex-[1_1_0%]">{/* Bonus value logic goes here */}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RightSection() {
    return (
        <div className='bg-gray-800 h-[800px] w-full flex-[4_4_0%] p-4 rounded-lg'>
            <div className='flex flex-row gap-x-4 text-center justify-around h-fit border border-black border-solid' id='initAcResistances'>
                <div className='flex flex-row gap-x-6 items-center'>
                    <div>
                        <h6>INITIATIVE</h6>
                        <p>PH</p>
                    </div>
                    <div>
                        <h6>ARMOR</h6>
                        <p>PH</p>
                        <h6>CLASS</h6>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-x-4'>
                    <div >
                        <h6>DEFENSES</h6>
                        <p>PH</p>
                    </div>
                    <div>
                        <h6>CONDITIONS</h6>
                        <p>PH</p>
                    </div>
                </div>
            </div>

            {/* ------------------------ Actions and inventory  --------------------------
             */}

            <div className='flex flex-col gap-y-4'>
                <CharacterTabsPanel />

                <div>

                </div>
            </div>


        </div>
    )
}

export default BottomPanel
