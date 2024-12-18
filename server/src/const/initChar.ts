import mongoose from "mongoose";
import { ICharacterInDB, INewCharacterToSentFromFrontend, Item, Profs, Spells } from "../schema/character";
import { func } from "joi";
import * as ItemConst from "./items";
import * as SpellsConst from "./spells";
import { log } from "node:console";

type AdditionalParams = {
    inventory: Item[], baseHp: number, proficiencies: Profs[]
    spells: Spells[]
}
export function initChar(charInitalParamsFromFrontend: INewCharacterToSentFromFrontend, requesterId: string) {
    const s1name: string = charInitalParamsFromFrontend.firstSelectedCantrip
    const s2name: string = charInitalParamsFromFrontend.secondSelectedCantrip
    const spell1 = SpellsConst.findSpellByName(s1name)
    const spell2 = SpellsConst.findSpellByName(s2name)
    const spellsArray: Spells[] = []
    if (spell1) { spellsArray.push(spell1) }
    if (spell2) { spellsArray.push(spell2) }
    const charClass = charInitalParamsFromFrontend.class
    let additionalParamsToAddToCharacter: AdditionalParams;
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
    const calcMaxHp = additionalParamsToAddToCharacter.baseHp + (Math.floor(((charInitalParamsFromFrontend.CON) - 10) / 2));
    const newCharacterWeAreStoringToDB: ICharacterInDB = { ...charInitalParamsFromFrontend, level: 1, proficiencyBonus: 2, userId: new mongoose.Types.ObjectId(requesterId), hitPoints: { current: calcMaxHp, max: calcMaxHp, temp: 0 }, skills: { acrobatics: { modifier: "DEX", proficiency: false }, animalHandling: { modifier: "WIS", proficiency: false }, arcana: { modifier: "INT", proficiency: false }, athletics: { modifier: "STR", proficiency: false }, deception: { modifier: "CHA", proficiency: false }, history: { modifier: "INT", proficiency: false }, insight: { modifier: "WIS", proficiency: false }, intimidation: { modifier: "CHA", proficiency: false }, investigation: { modifier: "INT", proficiency: false }, medicine: { modifier: "WIS", proficiency: false }, nature: { modifier: "INT", proficiency: false }, perception: { modifier: "WIS", proficiency: false }, performance: { modifier: "CHA", proficiency: false }, persuasion: { modifier: "CHA", proficiency: false }, religion: { modifier: "INT", proficiency: false }, sleightOfHand: { modifier: "DEX", proficiency: false }, stealth: { modifier: "DEX", proficiency: false }, survival: { modifier: "WIS", proficiency: false }, }, coreAttributes: { STR: charInitalParamsFromFrontend.STR, DEX: charInitalParamsFromFrontend.DEX, CON: charInitalParamsFromFrontend.CON, INT: charInitalParamsFromFrontend.INT, WIS: charInitalParamsFromFrontend.WIS, CHA: charInitalParamsFromFrontend.CHA }, inventory: additionalParamsToAddToCharacter.inventory, proficiencies: additionalParamsToAddToCharacter.proficiencies, spells: spellsArray, }
    const background = charInitalParamsFromFrontend.background
    switch (background.toLowerCase()) {
        case "acolyte":
            newCharacterWeAreStoringToDB.skills.insight.proficiency = true
            newCharacterWeAreStoringToDB.skills.religion.proficiency = true
            break;
        case "charlatan":
            newCharacterWeAreStoringToDB.skills.deception.proficiency = true
            newCharacterWeAreStoringToDB.skills.sleightOfHand.proficiency = true
            break;
        case "criminal":
            newCharacterWeAreStoringToDB.skills.deception.proficiency = true
            newCharacterWeAreStoringToDB.skills.stealth.proficiency = true
            break;
        case "entertainer":
            newCharacterWeAreStoringToDB.skills.acrobatics.proficiency = true
            newCharacterWeAreStoringToDB.skills.performance.proficiency = true
            break;
        case "guild artisan":
            newCharacterWeAreStoringToDB.skills.insight.proficiency = true
            newCharacterWeAreStoringToDB.skills.persuasion.proficiency = true
            break;
        case "hermit":
            newCharacterWeAreStoringToDB.skills.medicine.proficiency = true
            newCharacterWeAreStoringToDB.skills.religion.proficiency = true
            break;
        case "noble":
            newCharacterWeAreStoringToDB.skills.history.proficiency = true
            newCharacterWeAreStoringToDB.skills.persuasion.proficiency = true
            break;
        case "outlander":
            newCharacterWeAreStoringToDB.skills.survival.proficiency = true
            newCharacterWeAreStoringToDB.skills.athletics.proficiency = true
            break;
        case "sage":
            newCharacterWeAreStoringToDB.skills.arcana.proficiency = true
            newCharacterWeAreStoringToDB.skills.history.proficiency = true
            break;
        case "sailor":
            newCharacterWeAreStoringToDB.skills.athletics.proficiency = true
            newCharacterWeAreStoringToDB.skills.perception.proficiency = true
            break;
        case "soldier":
            newCharacterWeAreStoringToDB.skills.athletics.proficiency = true
            newCharacterWeAreStoringToDB.skills.intimidation.proficiency = true
            break;
        case "urchin":
            newCharacterWeAreStoringToDB.skills.sleightOfHand.proficiency = true
            newCharacterWeAreStoringToDB.skills.stealth.proficiency = true
            break;
    }

    return newCharacterWeAreStoringToDB
}
function getInitBarbarianParams() {
    const initInventory: Item[] = [ItemConst.itemGreatAxe, { ...ItemConst.itemHandaxe, quantity: 2 }, { ...ItemConst.itemJavelin, quantity: 4 }, ItemConst.itemExplorerPack,]
    const baseHp = 12
    const proficiencies = [{ armor: "light armor, medium armor, shields", weapons: "simple weapons, martial weapons", tools: "none", savingThrows: "STR, CON", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitClericParams() {
    const initInventory: Item[] = [ItemConst.itemMace, ItemConst.itemChainMail, ItemConst.itemLightCrossbow, ItemConst.itemPriestsPack, ItemConst.itemHolySymbol, ItemConst.itemShield]
    const baseHp = 8
    const proficiencies = [{ armor: "light armor, medium armor, shields", weapons: "simple weapons", tools: "none", savingThrows: "WIS, CHA", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitDruidParams() {
    const initInventory: Item[] = [ItemConst.itemWoodenShield, ItemConst.itemScimitar, ItemConst.itemLeatherArmor, ItemConst.itemDruidicFocus, ItemConst.itemExplorerPack]
    const baseHp = 8
    const proficiencies = [{ armor: "light armor, medium armor, shields", weapons: " clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears", tools: "Herbalism Kit", savingThrows: "WIS, INT", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitFighterParams() {
    const initInventory: Item[] = [ItemConst.itemChainMail, ItemConst.itemShield, ItemConst.itemMace, ItemConst.itemLightCrossbow, ItemConst.itemDungeoneersPack]
    const baseHp = 10
    const proficiencies = [{ armor: "light armor, medium armor, heavy armor, shields", weapons: "simple weapons, martial weapons", tools: "none", savingThrows: "STR, CON", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitRogueParams() {
    const initInventory: Item[] = [ItemConst.itemShortsword, ItemConst.itemShortbow, ItemConst.itemBurglarsPack, { ...ItemConst.itemDagger, quantity: 2 }, ItemConst.itemLeatherArmor, ItemConst.itemThievesTools]
    const baseHp = 8
    const proficiencies = [{ armor: "light armor", weapons: "simple weapons, hand crossbows, longswords, rapier, shortswords,", tools: "Thieves' Tools", savingThrows: "DEX, INT", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitRangerParams() {
    const initInventory: Item[] = [ItemConst.itemScaleMail, { ...ItemConst.itemShortsword, quantity: 2 }, ItemConst.itemLongbow, ItemConst.itemExplorerPack,]
    const baseHp = 10
    const proficiencies = [{ armor: "light armor , medium armor , shields", weapons: "simple weapons, martial weapons", tools: "none", savingThrows: "DEX, STR", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitWizardParams() {
    const initInventory: Item[] = [ItemConst.itemQuarterstaff, ItemConst.itemComponentPouch, ItemConst.itemScholarspack, ItemConst.itemSpellBook]
    const baseHp = 6
    const proficiencies = [{ armor: "none", weapons: "daggers, darts, slings, quarterstaffs, light crossbows", tools: "none", savingThrows: "INT, WIS", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitMonkParams() {
    const initInventory: Item[] = [ItemConst.itemShortsword, ItemConst.itemDungeoneersPack, { ...ItemConst.itemDart, quantity: 10 },]
    const baseHp = 8
    const proficiencies = [{ armor: "none", weapons: "simple weapons, shortswords", tools: "any one type of artisan's tools or any one musical instrument of your choice", savingThrows: "DEX, STR", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitPaladinParams() {
    const initInventory: Item[] = [ItemConst.itemGreatsWord, { ...ItemConst.itemJavelin, quantity: 5 }, ItemConst.itemPriestsPack, ItemConst.itemChainMail]
    const baseHp = 10
    const proficiencies = [{ armor: "light armor, medium armor, heavy armor, shields", weapons: "simple weapons, martial weapons", tools: "none", savingThrows: "WIS, CHA", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitBardParams() {
    const initInventory: Item[] = [ItemConst.itemRapier, ItemConst.itemDeplomatsPack, ItemConst.itemLute, ItemConst.itemLeatherArmor, ItemConst.itemDagger]
    const baseHp = 8
    const proficiencies = [{ armor: "light armor", weapons: "simple weapons, hand crossbows, longswords, rapier, shortswords,", tools: "musical instruments of your choice", savingThrows: "DEX, CHA", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitWarlockParams() {
    const initInventory: Item[] = [ItemConst.itemRapier, ItemConst.itemComponentPouch, ItemConst.itemScholarspack, ItemConst.itemLeatherArmor, ItemConst.itemDagger]
    const baseHp = 8
    const proficiencies = [{ armor: "light armor", weapons: "simple weapons", tools: "none", savingThrows: "WIS, CHA", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}
function getInitSorcererParams() {
    const initInventory: Item[] = [ItemConst.itemLightCrossbow, ItemConst.itemArcaneFocus, ItemConst.itemExplorerPack, ItemConst.itemDagger]
    const baseHp = 6
    const proficiencies = [{ armor: "none", weapons: "daggers, darts, slings, quarterstaffs, light crossbows", tools: "none", savingThrows: "CON, CHA", }] as Profs[]
    const spells: Spells[] = []
    return { inventory: initInventory, baseHp: baseHp, proficiencies: proficiencies, spells: spells }
}