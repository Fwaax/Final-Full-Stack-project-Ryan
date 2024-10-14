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
    skills: Record<SkillKey, Skill>;
    proficiencyBonus: number;
    coreAttributes: Record<AttributeKey, number>;
    hitPoints: {
        max: number;
        current: number;
        temp: number;
    }
    userId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type AttributeKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type SkillKey = 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand' | 'stealth' | 'survival';

export interface Skill {
    modifier: AttributeKey;
    proficiency: boolean;
}