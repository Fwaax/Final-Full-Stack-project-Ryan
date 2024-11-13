import React from 'react'
import CharacterTabsPanel from './characterTabsPanel'
import { Skill } from '../Interfaces/apiRespose';
import { useAtom, useAtomValue } from 'jotai';
import { coreAttributesAtom, inventoryAtom, levelAtom, proficienciesAtom, skillsAtom } from '../atoms';
const BottomPanel = () => {
    return (
        <div className='flex flex-col xl:flex-row w-full h-[800px] xl:gap-x-4 gap-y-4'>
            <LeftSection />
            <MiddleSection />
            <RightSection />
        </div>
    )
}
function LeftSection() {
    const [coreAttributes, setCoreAttributes] = useAtom(coreAttributesAtom);
    const [proficiencies, setProficiencies] = useAtom(proficienciesAtom);
    return (
        <div className='bg-[#1d1e2a] h-[800px] w-full flex-[2_2_0%] p-4 rounded-lg flex flex-col gap-y-7 text-[#bfbfba] border-4 border-[#14151f] border-solid'>
            <div className='flex flex-col justify-around gap-2 border border-[#bfbfba] border-solid py-2 bg-[#14151f]' id='saving_throws'>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>STR</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['STR']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>DEX</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['DEX']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CON</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['CON']}</p>
                        </div>
                    </div>
                    <div className='flex flex-col flex-[1_1_0%]'>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>INT</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['INT']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>WIS</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['WIS']}</p>
                        </div>
                        <div className='flex flex-row gap-x-3 justify-between'>
                            <p className='flex-[3_3_0%] text-center'>CHA</p>
                            <p className='flex-[2_2_0%] text-center'>{coreAttributes['CHA']}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='col-span-2 flex flex-col items-center justify-center'>
                        <p>Advantage display</p>
                        <p>character.advantages</p>
                    </div>
                    <div className='col-span-2 flex flex-col items-center justify-center'>
                        <p>SAVING THROWS</p>
                        <p>character.savingThrows</p>
                    </div>
                </div>
            </div>
            <div className='border border-[#bfbfba] border-solid '>
                <div className='flex flex-col gap-y-2 bg-[#14151f] py-3'>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSTIVE PRECEPTION</p>
                        <p className='text-center w-[2rem]'>({Math.floor(10 + ((coreAttributes['WIS']) - 10) / 2)})</p>
                    </div>
                    <div className='flex flex-row  justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INVESTIGATION</p>
                        <p className='text-center w-[2rem]'>({Math.floor(10 + ((coreAttributes['INT']) - 10) / 2)})</p>
                    </div>
                    <div className='flex flex-row justify-around'>
                        <p className='text-center w-[11rem]'>PASSIVE INSIGHT</p>
                        <p className='text-center w-[2rem]'>({(Math.floor(10 + ((coreAttributes['WIS']) - 10) / 2))})</p>
                    </div>
                    <div className='flex justify-center'>
                        <p>Darkvision 15 ft.</p>
                    </div>
                    <div className='flex justify-center'>
                        <p>SENSES</p>
                    </div>
                </div>
            </div>

            <div className='border border-[#bfbfba] border-solid'>
                <div className='flex flex-col py-2 gap-y-2 bg-[#14151f]'>
                    <div className='flex flex-col items-center text-center'>
                        <h6>ARMOR</h6>
                        <p>{proficiencies[0].armor}</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h6>WEAPONS</h6>
                        <p>{proficiencies[0].weapons}</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h6>TOOLS</h6>
                        <p>{proficiencies[0].tools}</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h6>PROFICIENIES & TRAINING</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
function formatSkillName(skillKey: string) {
    return skillKey
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toUpperCase();
}
function MiddleSection() {
    const skill = useAtomValue(skillsAtom);
    const level = useAtomValue(levelAtom);
    const coreAttributes = useAtomValue(coreAttributesAtom);
    const calcProficiency = Math.ceil((level / 4) + 1);
    return (
        <div className="bg-[#1d1e2a] h-[800px] w-full flex-[2_2_0%] p-4 rounded-lg flex flex-col border-4 border-[#14151f] border-solid">
            <div className='bg-[#14151f] p-2 border border-[#bfbfba] border-solid'>
                <div className="grid grid-cols-[1fr_3fr_3fr_1fr] w-full text-center underline mb-4 text-[#bfbfba] font-semibold ">
                    <div>PROF</div>
                    <div>SKILL</div>
                    <div>MOD</div>
                    <div>BONUS</div>
                </div>
                <div className="flex flex-col gap-y-3">
                    {Object.entries(skill).map(([skillKey, skillObj], index) => {
                        const modifierValueOfCurrentSkill = coreAttributes[skillObj.modifier];
                        const base = Math.floor((modifierValueOfCurrentSkill - 10) / 2);
                        let bonus = base;
                        if (skillObj.proficiency) {
                            bonus += calcProficiency;
                        }
                        return (
                            <div
                                className="grid grid-cols-[1fr_3fr_3fr_1fr] w-full text-center items-center text-[#bfbfba]"
                                key={index}
                            >
                                <div>{skillObj.proficiency ? '✅' : '❌'}</div>
                                <div>{formatSkillName(skillKey)}</div>
                                <div>{skillObj.modifier}</div>
                                <div>{bonus}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
function RightSection() {
    const [inventory] = useAtom(inventoryAtom);
    const [coreAttributes] = useAtom(coreAttributesAtom);
    const calcInitiative = Math.floor(0 + ((coreAttributes['DEX'] - 10) / 2));
    const displayInitiative = calcInitiative >= 0 ? `+${calcInitiative}` : `${calcInitiative}`;
    let calcACNoArmor = Math.floor(10 + ((coreAttributes['DEX'] - 10) / 2));
    if (calcACNoArmor < 10) {
        calcACNoArmor = 10;
    }
    let totalAC = calcACNoArmor;
    let armorClass = 0;
    let shieldBonus = 0;
    inventory.forEach(item => {
        if (item.armorClass && item.armorClass > armorClass) {
            armorClass = item.armorClass;
        }
        if (item.armorBonus) {
            shieldBonus += item.armorBonus;
        }
    });
    totalAC = armorClass > 0 ? armorClass + shieldBonus : calcACNoArmor + shieldBonus;
    return (
        <div className='bg-[#1d1e2a] h-[800px] w-full flex-[4_4_0%] p-4 rounded-lg border-4 border-[#14151f] border-solid'>
            <div className='flex flex-row gap-x-4 text-center justify-around border border-[#bfbfba] border-solid h-[110px] text-[#bfbfba] bg-[#14151f]' id='initAcResistances'>
                <div className='flex flex-row gap-x-10 items-center'>
                    <div>
                        <h6>INITIATIVE</h6>
                        <p>{displayInitiative}</p>
                    </div>
                    <div>
                        <h6>ARMOR CLASS</h6>
                        <p>{totalAC}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-4'>
                <CharacterTabsPanel />
            </div>
        </div>
    );
}
export default BottomPanel