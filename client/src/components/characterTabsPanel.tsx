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
        <div className='flex flex-col'>
            {/* Tabs Navigation */}
            <div className='flex flex-row justify-around'>
                {tabs.map((tab) => (
                    <h6
                        key={tab.label}
                        className={clsx(
                            'cursor-pointer hover:underline',
                            activeTab === tab.label && 'font-bold'
                        )}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        {tab.label}
                    </h6>
                ))}
            </div>

            {/* Tab Content */}
            <div className='tab-content mt-4'>
                {renderTabContent()}
            </div>
        </div>
    );
}

export default CharacterTabsPanel;
