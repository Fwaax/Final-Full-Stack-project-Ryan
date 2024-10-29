import mongoose from "mongoose";
import { ICharacterInDB, INewCharacterToSentFromFrontend, Item, Profs } from "../schema/character";
import { func } from "joi";
import * as ItemConst from "./items";

export function initChar(charInitalParamsFromFrontend: INewCharacterToSentFromFrontend, requesterId: string) {
    const charClass = charInitalParamsFromFrontend.class
    let additionalParamsToAddToCharacter;
    let profs: Profs = {
        armor: "",
        weapon: "",
        tool: "",
        savingThrows: ""
    }

    switch (charClass) {
        case "Barbarian":
            additionalParamsToAddToCharacter = getInitBarbarianParams();
            break;
        case "Bard":
            additionalParamsToAddToCharacter = getInitBardParams();
            break;
        case "Cleric":
            additionalParamsToAddToCharacter = getInitClericParams();
            break;
        case "Druid":
            additionalParamsToAddToCharacter = getInitDruidParams();
            break;
        case "Fighter":
            additionalParamsToAddToCharacter = getInitFighterParams();
            break;
        case "Monk":
            additionalParamsToAddToCharacter = getInitMonkParams();
            break;
        case "Paladin":
            additionalParamsToAddToCharacter = getInitPaladinParams();
            break;
        case "Ranger":
            additionalParamsToAddToCharacter = getInitRangerParams();
            break;
        case "Rogue":
            additionalParamsToAddToCharacter = getInitRogueParams();
            break;
        case "Sorcerer":
            additionalParamsToAddToCharacter = getInitSorcererParams();
            break;
        case "Warlock":
            additionalParamsToAddToCharacter = getInitWarlockParams();
            break;
        case "Wizard":
            additionalParamsToAddToCharacter = getInitWizardParams();
            break;
        default:
            throw new Error("Invalid character class");
    }
    const calcMaxHp = additionalParamsToAddToCharacter.maxHP + (Math.floor((charInitalParamsFromFrontend.CON) - 10) / 2);
    const newCharacterWeAreStoringToDB: ICharacterInDB = {
        ...charInitalParamsFromFrontend,
        level: 1,
        proficiencyBonus: 2,
        userId: new mongoose.Types.ObjectId(requesterId),
        hitPoints: {
            current: calcMaxHp,
            max: calcMaxHp,
            temp: 0
        },
        skills: {
            acrobatics: { modifier: "DEX", proficiency: false },
            animalHandling: { modifier: "WIS", proficiency: false },
            arcana: { modifier: "INT", proficiency: false },
            athletics: { modifier: "STR", proficiency: false },
            deception: { modifier: "CHA", proficiency: false },
            history: { modifier: "INT", proficiency: false },
            insight: { modifier: "WIS", proficiency: false },
            intimidation: { modifier: "CHA", proficiency: false },
            investigation: { modifier: "INT", proficiency: false },
            medicine: { modifier: "WIS", proficiency: false },
            nature: { modifier: "INT", proficiency: false },
            perception: { modifier: "WIS", proficiency: false },
            performance: { modifier: "CHA", proficiency: false },
            persuasion: { modifier: "CHA", proficiency: false },
            religion: { modifier: "INT", proficiency: false },
            sleightOfHand: { modifier: "DEX", proficiency: false },
            stealth: { modifier: "DEX", proficiency: false },
            survival: { modifier: "WIS", proficiency: false },
        },
        coreAttributes: {
            STR: charInitalParamsFromFrontend.STR,
            DEX: charInitalParamsFromFrontend.DEX,
            CON: charInitalParamsFromFrontend.CON,
            INT: charInitalParamsFromFrontend.INT,
            WIS: charInitalParamsFromFrontend.WIS,
            CHA: charInitalParamsFromFrontend.CHA
        },
        inventory: additionalParamsToAddToCharacter.inventory,
        proficiencies: additionalParamsToAddToCharacter.profs

    } // End of character object

    return newCharacterWeAreStoringToDB
}

// diff starting items
function getInitBarbarianParams() {
    const initInventory: Item[] = [
        {
            name: "Great Axe", quantity: 1, weight: 7, description: "1d12 +Str mod slash dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d12"
        },
        {
            name: "Handaxe", quantity: 2, weight: 2, description: "1d6 +Str mod slash dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Javelin", quantity: 4, weight: 2, description: "1d6 +Str mod slash dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "30/120"
        },
        {
            name: "Explorer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , bedroll , mess kit , tinderbox , 10 rations , 10 torches , waterskin , 50 feet of hempen rope", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: ""
        }
    ]
    const baseHp = 12
    const proficiencies = [{
        armor: "light armor, medium armor, shields",
        weapons: "simple weapons, martial weapons",
        tools: "none",
        savingThrows: "STR, CON",
    }
    ]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}
function getInitClericParams() {
    const initInventory: Item[] = [
        {
            name: "Mace", quantity: 1, weight: 4, description: "1d6 + Str mod bludgeon", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Chain mail", quantity: 1, weight: 55, description: "16 armor class , disadvantage on stealth checks", cost: 30, isActivatable: false, numberOfCharges: 0, armorClass: 16
        },
        {
            name: "Light crossbow", quantity: 1, weight: 5, description: "1d8 + DEX mod ranged and 20 bolts", cost: 15, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "80/320"
        },
        {
            name: "Priest's Pack", quantity: 1, weight: 5, description: " contains backpack, blanket ,10 candles ,tinderbox, alms box , 2 blocks of incense , censer , vestments , 2 days of rations , waterskin", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Holy Symbol", quantity: 1, weight: 1, description: "a symbol of faith of your deity ", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Shield", quantity: 1, weight: 6, description: "shield adds +2 your you armor class", cost: 5, isActivatable: false, numberOfCharges: 0, armorBonus: 2
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "light armor, medium armor, shields",
        weapons: "simple weapons",
        tools: "none",
        savingThrows: "WIS, CHA",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}
function getInitDruidParams() {
    const initInventory: Item[] = [
        ItemConst.itemWoodenShield,
        {
            name: "Scimitar", quantity: 1, weight: 3, description: "1d6 + Str mod slash dmg", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Leather Armor", quantity: 1, weight: 10, description: "11 armor class", cost: 20, isActivatable: false, numberOfCharges: 0, armorClass: 11
        },
        {
            name: "Druidic Focus", quantity: 1, weight: 0, description: " A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus.", cost: 0, isActivatable: false, numberOfCharges: 0,
        },
        {
            name: "Explorer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , bedroll , mess kit , tinderbox , 10 rations , 10 torches , waterskin , 50 feet of hempen rope", cost: 5, isActivatable: false, numberOfCharges: 0
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "light armor, medium armor, shields",
        weapons: " clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears",
        tools: "Herbalism Kit",
        savingThrows: "WIS, INT",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitFighterParams() {
    const initInventory: Item[] = [
        {
            name: "Chain Mail", quantity: 1, weight: 55, description: "Armor class 16 , disadvantage on stealth checks", cost: 45, isActivatable: false, numberOfCharges: 0, armorClass: 16
        },
        {
            name: "Shield", quantity: 1, weight: 6, description: "Adds 2 to armor class", cost: 15, isActivatable: false, numberOfCharges: 0, armorBonus: 2
        },
        {
            name: "Mace", quantity: 1, weight: 5, description: "1d6 + Str mod bludgeoning dmg", cost: 15, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Light Crossbow", quantity: 1, weight: 5, description: "1d8 + DEX mod piercing dmg comes with 20 bolts", cost: 15, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "80/320"
        },
        {
            name: "Dungeoneer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , crowbar , hammer , 10 pitons , 10 rations , 10 torches , waterskin , 50 feet of hempen rope , tinderbox", cost: 5, isActivatable: false, numberOfCharges: 0
        }
    ]
    const baseHp = 10
    const proficiencies = [{
        armor: "light armor, medium armor, heavy armor, shields",
        weapons: "simple weapons, martial weapons",
        tools: "none",
        savingThrows: "STR, CON",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitRogueParams() {
    const initInventory: Item[] = [
        {
            name: "Shortsword", quantity: 2, weight: 2, description: "1d6 + DEX mod slashing dmg", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Shortbow", quantity: 1, weight: 2, description: "1d6 + DEX mod piercing dmg comes with 20 arrows", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "80/320"
        },
        {
            name: "Burglar's Pack", quantity: 1, weight: 5, description: "Contains a backpack , bag of 1,000 ballbearings , 10 feet of sring , bell , 5 candles , crowbar , hammer , 10 pitons , hooded lantern , 2 flasks of oil , 5 rations ,tinderbox , waterskin , 50 feet of hempen rope", cost: 10, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Dagger", quantity: 2, weight: 1, description: "1d4 + DEX mod piercing dmg", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Leather Armor", quantity: 1, weight: 10, description: "Armor class 11", cost: 20, isActivatable: false, numberOfCharges: 0, armorClass: 11
        },
        {
            name: "Thieves' Tools", quantity: 1, weight: 1, description: "This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks.", cost: 35, isActivatable: false, numberOfCharges: 0
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "light armor",
        weapons: "simple weapons, hand crossbows, longswords, rapier, shortswords,",
        tools: "Thieves' Tools",
        savingThrows: "DEX, INT",
    }]
    return {
        inventory: initInventory
    }
}

function getInitRangerParams() {
    const initInventory: Item[] = [
        {
            name: "Scale Mail", quantity: 1, weight: 45, description: "Armor Class 14", cost: 35, isActivatable: false, numberOfCharges: 0, armorClass: 14
        },
        {
            name: "Shortsword", quantity: 2, weight: 2, description: "1d6 + DEX mod slashing dmg", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Explorer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , bedroll , mess kit , tinderbox , 10 rations , 10 torches , waterskin , 50 feet of hempen rope", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Longbow", quantity: 1, weight: 2, description: "1d8 + DEX mod piercing dmg comes with 20 arrows", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "150/600"
        }
    ]
    const baseHp = 10
    const proficiencies = [{
        armor: "light armor , medium armor , shields",
        weapons: "simple weapons, martial weapons",
        tools: "none",
        savingThrows: "DEX, STR",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitWizardParams() {
    const initInventory: Item[] = [
        {
            name: "Quarterstaff", quantity: 1, weight: 2, description: "1d4 + STR mod bludgeoning dmg", cost: 10, isActivatable: false, numberOfCharges: 0, dmgDice: "1d4"
        },
        {
            name: "Component Pouch", quantity: 1, weight: 2, description: "A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).", cost: 10, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Scholar's Pack", quantity: 1, weight: 5, description: "Contains a backpack , book of lore , bottle of ink , ink pen , 10 sheets of parchment , little bag of sand , small knife ", cost: 10, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Spellbook", quantity: 1, weight: 3, description: "Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.", cost: 10, isActivatable: false, numberOfCharges: 0
        }
    ]
    const baseHp = 6
    const proficiencies = [{
        armor: "none",
        weapons: "daggers, darts, slings, quarterstaffs, light crossbows",
        tools: "none",
        savingThrows: "INT, WIS",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitMonkParams() {
    const initInventory: Item[] = [
        {
            name: "Shortsword", quantity: 1, weight: 2, description: "1d6 + DEX mod slashing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6"
        },
        {
            name: "Dungeoneer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , crowbar , hammer , 10 pitons , 10 rations , 10 torches , waterskin , 50 feet of hempen rope , tinderbox", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Darts", quantity: 10, weight: 0.5, description: "1d4 + DEX mod piercing", cost: 1, isActivatable: false, numberOfCharges: 0, dmgDice: "1d4", range: "20/60"
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "none",
        weapons: "simple weapons, shortswords",
        tools: "any one type of artisan's tools or any one musical instrument of your choice",
        savingThrows: "DEX, STR",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitPaladinParams() {
    const initInventory: Item[] = [
        {
            name: "Greatsword", quantity: 1, weight: 6, description: "2d6 + STR mod slashing dmg", cost: 15, isActivatable: false, numberOfCharges: 0, dmgDice: "2d6"
        },
        {
            name: "Javelin", quantity: 5, weight: 2, description: "1d6 + STR mod piercing", cost: 1, isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "30/120"
        },
        {
            name: "Priest's Pack", quantity: 1, weight: 5, description: " contains backpack, blanket ,10 candles ,tinderbox, alms box , 2 blocks of incense , censer , vestments , 2 days of rations , waterskin", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Chain Mail", quantity: 1, weight: 55, description: "16 armor class , disadvantage on stealth checks", cost: 30, isActivatable: false, numberOfCharges: 0, armorClass: 16
        }
    ]
    const baseHp = 10
    const proficiencies = [{
        armor: "light armor, medium armor, heavy armor, shields",
        weapons: "simple weapons, martial weapons",
        tools: "none",
        savingThrows: "WIS, CHA",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitBardParams() {
    const initInventory: Item[] = [
        {
            name: "Rapier", quantity: 1, weight: 2, description: "1d8 + DEX mod piercing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8"
        },
        {
            name: "Diplomat's Pack", quantity: 1, weight: 5, description: "Contains a chest ,2 cases of maps and scrolls ,set of fine clothes ,bottle of ink ,ink pen ,lamp ,2 flasts of oil ,5 sheets of paper ,vial of perfume ,sealing wax ,soap", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Lute", quantity: 1, weight: 2, description: "If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency.", cost: 5, isActivatable: false, numberOfCharges: 0,
        },
        {
            name: "Leather Armor", quantity: 1, weight: 10, description: "Armor class 11", cost: 20, isActivatable: false, numberOfCharges: 0, armorClass: 11
        },
        {
            name: "dagger", quantity: 1, weight: 1, description: "1d4 + DEX mod piecing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d4"
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "light armor",
        weapons: "simple weapons, hand crossbows, longswords, rapier, shortswords,",
        tools: "musical instruments of your choice",
        savingThrows: "DEX, CHA",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}

function getInitWarlockParams() {
    const initInventory: Item[] = [
        {
            name: "Rapier", quantity: 1, weight: 2, description: "1d8 + DEX mod piercing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8"
        },
        {
            name: "Component Pouch", quantity: 1, weight: 2, description: "A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).", cost: 10, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Scholar's Pack", quantity: 1, weight: 5, description: "Contains a backpack , book of lore , bottle of ink , ink pen , 10 sheets of parchment , little bag of sand , small knife ", cost: 10, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Leather Armor", quantity: 1, weight: 10, description: "Armor class 11", cost: 20, isActivatable: false, numberOfCharges: 0, armorClass: 11
        },
        {
            name: "dagger", quantity: 2, weight: 1, description: "1d4 + DEX mod piecing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d4"
        }
    ]
    const baseHp = 8
    const proficiencies = [{
        armor: "light armor",
        weapons: "simple weapons",
        tools: "none",
        savingThrows: "WIS, CHA",
    }]
    return {
        inventory: initInventory
    }
}

function getInitSorcererParams() {
    const initInventory: Item[] = [
        {
            name: "Light crossbow", quantity: 1, weight: 5, description: "1d8 + DEX mod ranged and 20 bolts", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "80/320"
        },
        {
            name: "Arcane Focus", quantity: 1, weight: 1, description: "An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus.", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Explorer's Pack", quantity: 1, weight: 5, description: "Contains a backpack , bedroll , mess kit , tinderbox , 10 rations , 10 torches , waterskin , 50 feet of hempen rope", cost: 5, isActivatable: false, numberOfCharges: 0
        },
        {
            name: "Dagger", quantity: 2, weight: 1, description: "1d4 + DEX mod piecing dmg", cost: 5, isActivatable: false, numberOfCharges: 0, dmgDice: "1d4"
        }
    ]
    const baseHp = 6
    const proficiencies = [{
        armor: "none",
        weapons: "daggers, darts, slings, quarterstaffs, light crossbows",
        tools: "none",
        savingThrows: "CON, CHA",
    }]
    return {
        inventory: initInventory,
        baseHp: baseHp,
        proficiencies: proficiencies
    }
}