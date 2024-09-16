import React from 'react'
import CharacterTabsPanel from './characterTabsPanel'

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
    return (
        <div className='bg-red-700 h-[800px] w-full flex-[2_2_0%]'>

            <div className='flex flex-col justify-around gap-2 border border-black border-solid' id='saving_throws'>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>STR</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>DEX</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CON</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                    </div>

                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>INT</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>WIS</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CHA</p>
                            <p className='flex-[2_2_0%] text-center'>PH</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='col-span-2 bg-yellow-500 flex justify-center'>
                        <p>Advantage display</p>
                    </div>
                    <div className='col-span-2 bg-purple-500 flex justify-center'>
                        <p>SAVING THROWS</p>
                    </div>
                </div>
            </div>

            {/* ----------------------------------------------------------- */}

            <div className='border border-black border-solid'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSTIVE PRECEPTION</p>
                        <p className='text-center w-[2rem]'>PH</p>
                    </div>
                    <div className='flex flex-row  justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INVESTIGATION</p>
                        <p className='text-center w-[2rem]'>PH</p>
                    </div>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INSIGHT</p>
                        <p className='text-center w-[2rem]'>PH</p>
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

const SKILLS = [
    { mod: "DEX", skillName: "Acrobatics" },
    { mod: "WIS", skillName: "Animal Handling" },
    { mod: "INT", skillName: "Arcana" },
    { mod: "STR", skillName: "Athletics" },
    { mod: "CHA", skillName: "Deception" },
    { mod: "INT", skillName: "History" },
    { mod: "WIS", skillName: "Insight" },
    { mod: "CHA", skillName: "Intimidation" },
    { mod: "INT", skillName: "Investigation" },
    { mod: "WIS", skillName: "Medicine" },
    { mod: "INT", skillName: "Nature" },
    { mod: "WIS", skillName: "Perception" },
    { mod: "CHA", skillName: "Performance" },
    { mod: "CHA", skillName: "Persuasion" },
    { mod: "INT", skillName: "Religion" },
    { mod: "DEX", skillName: "Sleight of Hand" },
    { mod: "DEX", skillName: "Stealth" },
    { mod: "WIS", skillName: "Survival" },
]
function MiddleSection() {
    return (
        <div className='bg-blue-700 h-[800px] w-full flex-[2_2_0%] flex flex-col gap-y-1' >
            {/* Header Table */}
            <div className='flex flex-row w-full text-center underline'>
                <div className='flex-[1_1_0%]'>PROF</div>
                <div className='flex-[1_1_0%]'>MOD</div>
                <div className='flex-[3_3_0%]'>SKILL</div>
                <div className='flex-[1_1_0%]'>BONUS</div>
            </div>
            {/* Content Table */}
            <div className='flex flex-col gap-y-3'>
                {SKILLS.map((s, index) => {
                    return (
                        <div className='flex flex-row w-full text-center underline'>
                            <div className='flex-[1_1_0%]'>1</div>
                            <div className='flex-[1_1_0%]'>{s.mod}</div>
                            <div className='flex-[3_3_0%]'>{s.skillName}</div>
                            <div className='flex-[1_1_0%]'>4</div>
                        </div>

                    )
                })}
            </div >
        </div>
    )
}

function RightSection() {
    return (
        <div className='bg-green-700 h-[800px] w-full flex-[4_4_0%]'>
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