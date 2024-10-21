import React, { useState } from 'react';
import clsx from 'clsx';

// Placeholder components for each tab's content
function ActionsTab() {
    return <div>Actions content goes here</div>;
}

function SpellsTab() {
    return <div>Spells content goes here</div>;
}

function InventoryTab() {
    return <div>Inventory content goes here</div>;
}

function FeaturesTraitsTab() {
    return <div>Features & Traits content goes here</div>;
}

function BackgroundTab() {
    return <div>Background content goes here</div>;
}

function NotesTab() {
    return <div>Notes content goes here</div>;
}

function ExtraTab() {
    return <div>Extra content goes here</div>;
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
        { label: 'EXTRA', component: <ExtraTab /> }
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
