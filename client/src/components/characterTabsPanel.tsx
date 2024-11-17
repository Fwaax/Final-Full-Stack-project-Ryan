import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useAtom } from 'jotai';
import { backgroundAtom, classAtom, levelAtom, nameAtom, raceAtom, inventoryAtom, backstoryAtom, alliesAtom, enemiesAtom, appearanceAtom, otherAtom, spellsAtom } from '../atoms';


function SpellsTab() {
    const [spells] = useAtom(spellsAtom);
    return (
        <div>
            <div className="border-b-2 border-solid border-[#556b82]">
                <strong className='text-[#556b82]'><h2>Spells</h2></strong>
            </div>
            <ul>
                {Object.entries(spells).map(([key, item]) => (
                    <li key={key}>
                        <strong>{item.name}</strong> - {item.discription}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function InventoryTab() {
    const [inventory] = useAtom(inventoryAtom);
    return (
        <div>
            <div className="border-b-2 border-solid border-[#556b82]">
                <strong className='text-[#556b82]'><h2>Inventory</h2></strong>
            </div>
            <ul>
                {inventory.map((item, index) => (
                    <li key={index}>
                        <strong>{item.name}</strong> - {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
function BackgroundTab() {
    const [background] = useAtom(backgroundAtom);
    const [allies] = useAtom(alliesAtom);
    const [enemies] = useAtom(enemiesAtom);
    const [appearance] = useAtom(appearanceAtom);
    const [other] = useAtom(otherAtom);
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <div className="border-b-2 border-solid border-[#556b82]" >
                    <strong className='text-[#556b82]'><h2>Background</h2></strong>
                </div>
                <p>{background}</p>
            </div>
            <div>
                <div className="border-b-2 border-solid border-[#556b82]" >
                    <strong className='text-[#556b82]'><h2>Allies</h2></strong>
                </div>
                <p>{allies}</p>
            </div>
            <div>
                <div className="border-b-2 border-solid border-[#556b82]" >
                    <strong className='text-[#556b82]'><h2>Enemies</h2></strong>
                </div>
                <p>{enemies}</p>
            </div>
            <div>
                <div className="border-b-2 border-solid border-[#556b82]">
                    <strong className='text-[#556b82]'><h2>Appearance</h2></strong>
                </div>
                <div><ul className='flex flex-col flex-wrap'>
                    {Object.entries(appearance).map(([key, item]) => (
                        <li key={key}>
                            <strong>{key}</strong> - {item}
                        </li>
                    ))}
                </ul></div>
            </div>
            <div>
                <div className="border-b-2 border-solid border-[#556b82]">
                    <strong className='text-[#556b82]'><h2>Other</h2></strong>
                </div>
                <p>{other}</p>
            </div>
        </div>
    )
}

function NotesTab() {
    const [backstory] = useAtom(backstoryAtom);
    return (
        <div>
            <div className="border-b-2 border-solid border-[#556b82]">
                <strong className='text-[#556b82]'><h2>background</h2></strong>
            </div>
            <p>{backstory}</p>
        </div>
    )
}

function CharacterTabsPanel() {
    const [activeTab, setActiveTab] = useState('ACTIONS');
    const tabs = [
        { label: 'SPELLS', component: <SpellsTab /> },
        { label: 'INVENTORY', component: <InventoryTab /> },
        { label: 'BACKGROUND', component: <BackgroundTab /> },
        { label: 'NOTES', component: <NotesTab /> },
    ];
    function renderTabContent() {
        const activeTabObject = tabs.find(tab => tab.label === activeTab);
        return activeTabObject ? activeTabObject.component : null;
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-wrap justify-around gap-2 bg-[#1d1e2a] m-2 border border-[#bfbfba] border-solid p-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={clsx(
                            'px-4 py-2 text-sm sm:text-base flex-1 sm:flex-none transition-colors duration-300 text-center',
                            activeTab === tab.label
                                ? 'bg-[#556b82] text-[#bfbfba]'
                                : 'bg-[#1a1b26] text-[#bfbfba] hover:bg-[#14151f]'
                        )}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content mt-4 p-4 bg-[#14151f] text-[#bfbfba] border border-[#bfbfba] border-solid h-[550px]">
                {renderTabContent()}
            </div>
        </div>
    );
}
export default CharacterTabsPanel;