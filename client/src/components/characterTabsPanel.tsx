import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useAtom } from 'jotai';
import { backgroundAtom, classAtom, levelAtom, nameAtom, raceAtom, inventoryAtom, backstoryAtom, alliesAtom, enemiesAtom, appearanceAtom, otherAtom, spellsAtom } from '../atoms';

// Placeholder components for each tab's content

function ActionsTab() {
    return <div>Actions content goes here</div>;
}

function SpellsTab() {
    const [spells] = useAtom(spellsAtom); // Destructure to get the spells array
    return (
        <div>
            <h2>Spells</h2>
            <ul>
                {spells.map((item, index) => (
                    <li key={index}>
                        {/* Adjust to display relevant item properties */}
                        <strong>{item.name}</strong> - {item.discription}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function InventoryTab() {
    const [inventory] = useAtom(inventoryAtom);  // Access the inventoryAtom
    return (
        <div>
            <div className="border-b-2 border-solid border-[#556b82]">
                <strong className='text-[#556b82]'><h2>Inventory</h2></strong>
            </div>
            <ul>
                {inventory.map((item, index) => (
                    <li key={index}>
                        {/* Adjust to display relevant item properties */}
                        <strong>{item.name}</strong> - {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FeaturesTraitsTab() {
    return <div>Features & Traits content goes here</div>;
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
                <p><ul className='flex flex-row'>
                    {Object.entries(appearance).map(([key, item]) => (
                        <li key={key}>
                            {/* Adjust to display relevant item properties */}
                            <strong>{key}</strong> {item}
                        </li>
                    ))}
                </ul></p>
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
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('ACTIONS');

    // Array of tab labels and corresponding components
    const tabs = [
        { label: 'ACTIONS', component: <ActionsTab /> },
        { label: 'SPELLS', component: <SpellsTab /> },
        { label: 'INVENTORY', component: <InventoryTab /> },
        { label: 'FEATURES & TRAITS', component: <FeaturesTraitsTab /> },
        { label: 'BACKGROUND', component: <BackgroundTab /> },
        { label: 'NOTES', component: <NotesTab /> },
    ];

    // Function to render the active tab's content
    function renderTabContent() {
        const activeTabObject = tabs.find(tab => tab.label === activeTab);
        return activeTabObject ? activeTabObject.component : null;
    }

    return (
        <div className="flex flex-col w-full">
            {/* Tabs Navigation */}
            <div className="flex justify-around bg-[#1d1e2a] m-2 border border-[#bfbfba] border-solid">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={clsx(
                            'px-4 py-2 transition-colors duration-300',
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

            {/* Tab Content */}
            <div className="tab-content mt-4 p-4 bg-[#14151f] text-[#bfbfba] border border-[#bfbfba] border-solid">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default CharacterTabsPanel;
