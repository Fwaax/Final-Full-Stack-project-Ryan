// Define an interface for level-based unlocks
export interface ClassFeature {
    name: string;
    description: string;
    toolTip?: string;
    casts?: string;
    level: number;  // Level at which the feature is unlocked
}


export interface Proficiency {
    name: string;
    description: string;
}

export interface Feats {
    name: string;
    description: string;
}

export interface ClassInfo {
    name: string;
    hitDie: string;
    primaryAbility: string;
    savingThrows: string[];
    proficiencies: {
        armor: string[];
        weapons: string[];
    };
    features: ClassFeature[];
    // feats: Feats[];
}

export const Barbarian: ClassInfo = {
    name: "Barbarian",
    hitDie: "d12",
    primaryAbility: "Strength",
    savingThrows: ["Strength", "Constitution"],
    proficiencies: {
        armor: ["Light armor", "Medium armor", "Shields"],
        weapons: ["Simple weapons", "Martial weapons"],
    },
    features: [
        {
            name: "Rage",
            description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.",
            level: 1,
        },
        {
            name: "Unarmored Defense",
            description: "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier.",
            level: 1,
        },
        {
            name: "Reckless Attack",
            description: "Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation.",
            level: 2,
        },
        {
            name: "Danger Sense",
            description: "At 2nd level, you gain an uncanny sense of when things nearby aren't as they should be.",
            level: 2,
        },
        {
            name: "Feat",
            description: "Feat",
            level: 4,
        },
        {
            name: "Extra Attack",
            description: "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action.",
            level: 5,
        },
        {
            name: "Path feature",
            description: "You tap into your inner strength",
            level: 6,
        },
        {
            name: "Feral Instinct",
            description: "your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren’t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn",
            level: 7,
        },
        {
            name: "feat",
            description: "Feat",
            level: 8,
        },
        {
            name: "Brutal Critical",
            description: "you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.",
            level: 9
        },
    ]
};
