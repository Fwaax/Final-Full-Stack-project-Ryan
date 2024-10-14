export interface ICharacterApiResponse {
    appearance: {
        alignment: string;
        gender: string;
        eyes: string;
        size: string;
        height: string;
        faith: string;
        hair: string;
        skin: string;
        age: string;
        weight: string;
    };
    _id: string;
    name: string;
    class: string;
    race: string;
    level: number;
    background: string;
    characteristics: string;
    personalityTraits: string;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    skills: Skill[];
    proficiencyBonus: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: {
        max: number;
        current: number;
        temp: number;
    }
    userId: string;
    createdAt: string; // ISO string for date
    updatedAt: string; // ISO string for date
    __v: number;
}

export interface Skill {
    name: string;
    mod: string;
    proficiency: boolean;
}