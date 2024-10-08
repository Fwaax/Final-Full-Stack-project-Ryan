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
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    userId: string;
    createdAt: string; // ISO string for date
    updatedAt: string; // ISO string for date
    __v: number;
}