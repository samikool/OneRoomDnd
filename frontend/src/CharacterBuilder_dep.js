/**
 * Won't be going down this route, it didn't work out, but might have some useful code for parsin character data
 * Once character building is finalized this file should be deleted and removed from the master branch
 */

// import { FormControl, FormGroup, InputLabel, Select, MenuItem, Button, makeStyles } from '@material-ui/core'
// import {useState, useEffect, useLayoutEffect} from 'react'
// import {getFromAPI, getFromDndAPI} from './adapters/get'

// const JSONPretty  = require('react-json-pretty')


// const useStyles = makeStyles((theme) => ({
//   root:{
//     flexGrow: 1,
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));


// export function CharacterBuilder_dep(props){

//     const [buildQueue, setBuildQueue]  = useState([])
//     const [raceData, setRaceData] = useState({})
//     const [subraceData, setSubraceData] = useState({})
//     const [classData, setClassData] = useState({})
//     const [subclassData, setSubclassData] = useState({})
//     const [levelData, setLevelData] = useState({})
//     const [curChoice, setCurChoice] = useState()
//     const [curChoiceVal, setCurChoiceVal] = useState('0')
//     const [choosing, setChoosing] = useState(false)
//     const [building, setBuilding] = useState(false)
//     const [character, setCharacter] = useState()

//     const classes = useStyles()

//     useLayoutEffect(() => {

//         async function fetchData(){
//           let raceData = getFromDndAPI('/api/races/'+props.race)
//           let subraceData = getFromDndAPI('/api/subraces/'+props.subrace)
//           let classData = getFromDndAPI('/api/classes/'+props.clas)
//           let subclassData = getFromDndAPI('/api/subclasses/'+props.subclass)
//           let levelData = getFromDndAPI('/api/classes/'+ props.clas + '/levels')
        
//           raceData = await raceData
//           subraceData = await subraceData
//           classData = await classData
//           subclassData = await subclassData
//           levelData = await levelData
          
//           setRaceData(raceData)
//           setSubraceData(subraceData)
//           setClassData(classData)
//           setSubclassData(subclassData)
//           setLevelData(levelData)

//           initCharacter(raceData, subraceData, classData, subclassData, levelData)

//         }
  
//         fetchData()
  
//       },[])

//       async function initCharacter(raceData, subraceData, classData, subclassData, levelData){

//         console.log(raceData)
//         console.log(subraceData)
//         console.log(classData)
//         console.log(subclassData)
//         console.log(levelData)

//         const character = {}

//         function initSkills(str, dex, con, int, wis, cha){
          
//           //standard array
//           for(let i of [8, 10, 12, 13, 14, 15])
//           addChoicesToQueue({
//             type: 'skill',
//             choose: 1,
//             from: [
//                 {index: "cha", name: "CHA", url: "/api/ability-scores/cha", bonus: i},
//                 {index: "con",name: "CON", url: "/api/ability-scores/con", bonus: i},
//                 {index: "dex",name: "DEX", url: "/api/ability-scores/dex", bonus: i},
//                 {index: "int",name: "INT",url: "/api/ability-scores/int", bonus: i},
//                 {index: "str",name: "STR",url: "/api/ability-scores/str", bonus: i},
//                 {index: "wis",name: "WIS",url: "/api/ability-scores/wis", bonus: i}
//               ]
//           })
//           const skills = {
//             str: str,
//             dex: dex,
//             con: con,
//             int: int,
//             wis: wis,
//             cha: cha
//           }
//           character.skills = skills
//         }

//         function initChecks(skills){
//           const checks = {
//             // acrobatics: skills.dex,
//             // animal_handling: skills.wis,
//             // arcana: skills.int,
//             // athletics: skills.str,
//             // deception: skills.cha,
//             // history: skills.int,
//             // insight: skills.wis, 
//             // intimidation: skills.cha,
//             // investigation: skills.int,
//             // medicine: skills.wis,
//             // nature: skills.int,
//             // perception: skills.wis,
//             // performance: skills.cha,
//             // pursuasion: skills.cha,
//             // religion: skills.int, 
//             // slight_of_hand: skills.dex,
//             // stealth: skills.dex,
//             // survival: skills.wis
//           }

//           character.checks = checks
//         }

//         function initProfBonus(bonus){
//           character.prof_bonus = bonus
//         }

//         function initAbilityBonuses(){
//           character.abilityBonuses = []
//         }

//         function initSavingThrows(skills){
//           character.savingThrows = skills
//         }

//         function initLanguages(){
//           character.languages = []
//         }

//         function initTraits(){
//           character.traits = []
//         }

//         function initProficiencies(){
//           character.proficiencies = []
//         }

//         function initFeatures(){
//           character.features = []
//         }

//         function initEquipment(){
//           character.equipment = []
//         }

//         function initSpells(){
//           character.spells = {
//             0: [],
//             1: [],
//             2: [],
//             3: [],
//             4: [],
//             5: [],
//             6: [],
//             7: [],
//             8: [],
//             9: [],
//           }
//         }

//         function initClassSpecific(){
//           character.classSpecific = {}
//         }

//         function checkCommonClassOptions(clas){
//           for(let c of clas.proficiency_choices){
//             addChoicesToQueue(c)
//           }

//           for(let c of clas.starting_equipment_options){
//             for(let i in c.from){
//               if(c.from[i].equipment) 
//                 c.from[i] = c.from[i].equipment
//               else if(c.from[i].equipment_option)
//                 c.from[i] = c.from[i].equipment_option.from.equipment_category
//             }
//             addChoicesToQueue(c)
//           }
//         }

//         function checkUniqueRaceOptions(race){
//           if(race.trait_options) addChoicesToQueue(race.trait_options)
//           if(race.ability_bonus_options) addChoicesToQueue(race.ability_bonus_options)
//         }


//         function checkSubcommonRaceOptions(race){
//           if(race.starting_proficiency_options) addChoicesToQueue(race.starting_proficiency_options)
//           if(race.language_options) addChoicesToQueue(race.language_options)
//         }

//         function checkUniqueSubraceOptions(subrace){
//           if(subrace.language_options) addChoicesToQueue(subrace.language_options)
//           if(subrace.racial_trait_options) {
//             subrace.racial_trait_options.type = 'spell'
//             for(let k of subrace.racial_trait_options.from){
//               k.level = 0
//             }
//             addChoicesToQueue(subrace.racial_trait_options)
//           }
//         }

//         function parseLanguages(languages){
//           for(let l of languages){
//             character.languages.push(l)
//           }
//         }

//         function parseAbilityBonuses(bonuses){
//           console.log(bonuses)
//           for(let b of bonuses){
//             character.abilityBonuses.push(b)
//           }
//         }

//         function parseTraits(traits){
//           for(let trait of traits){
//             character.traits.push(trait)
//           }
//         }

//         function parseFeatures(levelData){
          
//           const level = props.level

//           for(let i=0; i<level; i++){
//             for(let f of levelData[i].features){
//               console.log(f)
//               if(f.index.includes('ability-score-improvement')){
//                 addChoicesToQueue({
//                   type: 'skill',
//                   choose: 1,
//                   from: [
//                     {index: "cha", name: "CHA", url: "/api/ability-scores/cha", bonus: 2},
//                     {index: "con",name: "CON", url: "/api/ability-scores/con", bonus: 2},
//                     {index: "dex",name: "DEX", url: "/api/ability-scores/dex", bonus: 2},
//                     {index: "int",name: "INT",url: "/api/ability-scores/int", bonus: 2},
//                     {index: "str",name: "STR",url: "/api/ability-scores/str", bonus: 2},
//                     {index: "wis",name: "WIS",url: "/api/ability-scores/wis", bonus: 2}
//                   ]
//                 })
//                 continue
//               }

//               character.features.push(f)
//             }
//           }
          
//         }

//         async function parseEquipment(equipment){  
//           for(let e of equipment){
//             character.equipment.push(e)
//           }
//         }

//         function parseProficiencies(proficiencies){
//           for(let p of proficiencies){
//             if(character.proficiencies.includes(p)) {
//               console.log('proficiency already added')
//               continue
//             }
//             character.proficiencies.push(p)
//           }
//         }

//         async function parseSpells(spellcasting){ 

//           const spells = []
//           const res = await getFromAPI('/spells')

//           for(let k in res){
//             spells.push(res[k])
//           }

//           for(let k in spellcasting){
//             let v = spellcasting[k]

//             if(!v) break //no spells at this level so break

//             let c = {
//               choose: v,
//               type: 'spell',
//             }

//             let spellLevel

//             if(k === 'cantrips_known'){
//               spellLevel = 0
//             }
//             else{
//               spellLevel = parseInt(k.charAt(k.length-1))
//             }

//             c.from = await spells.filter((spell) =>{return spell.level === spellLevel})

//             addChoicesToQueue(c)
//           }
//         }

//         function parseClassSpecific(classSpecific){
//           character.classSpecific = classSpecific
//         }

//         //initial values
//         initSkills(0, 0, 0, 0, 0, 0)
//         initChecks(character.skills)
//         initSavingThrows(character.skills)
//         initProfBonus(levelData[props.level].prof_bonus)
//         initAbilityBonuses()
//         initLanguages()
//         initTraits()
//         initProficiencies()
//         initFeatures()
//         initEquipment()
//         initSpells()
//         initClassSpecific()

//         //find all choices?
//         checkCommonClassOptions(classData)

//         checkUniqueRaceOptions(raceData)
//         checkSubcommonRaceOptions(raceData)

//         checkUniqueSubraceOptions(subraceData)

//         //combine results
//         parseLanguages(raceData.languages)
//         parseLanguages(subraceData.languages)

//         parseTraits(raceData.traits)
//         parseTraits(subraceData.racial_traits)

//         parseFeatures(levelData)

//         parseProficiencies(raceData.starting_proficiencies)
//         parseProficiencies(subraceData.starting_proficiencies)
//         parseProficiencies(classData.proficiencies)

//         parseAbilityBonuses(raceData.ability_bonuses)
//         parseAbilityBonuses(subraceData.ability_bonuses)
       
//         parseEquipment(classData.starting_equipment)

//         parseClassSpecific(levelData[props.level].class_specific)

//         if(levelData[props.level].spellcasting) await parseSpells(levelData[props.level].spellcasting)



//         console.log(character)
//         console.log(buildQueue)

//         setCharacter(character)
//         setCurChoice(buildQueue.pop())
//         setChoosing(true)
//       }

//       function addChoicesToQueue(data){
//         if(!data.choose || !Array.isArray(data.from)){
//           console.error('failed to resolve choice:',data)
//           return
//         }
        
//         buildQueue.push(data)
//       }

//       async function resolveArray(arr){
        
//         const rarr = []
        
//         for(let d of arr){
//           rarr.push(getFromDndAPI(d.url))
//         }

//         for(let i in rarr){
//           rarr[i] = await rarr[i]
//         }

//         return rarr
//       }

//       async function resolveEquipment(equipment){

//         const rEquipment = []

//         for(let e of equipment){
//           if(e.equipment) rEquipment.push(getFromDndAPI(e.equipment.url))
//           else rEquipment.push(getFromDndAPI(e.url))
//         }

//         for(let i in rEquipment){
//           rEquipment[i] = await rEquipment[i]
//         }

//         return rEquipment
//       }

//       //return 
//       function processAbilityBonuses(char){
        
//         const bonuses = char.abilityBonuses
        
//         for(let b of bonuses){
//           let bIndex = b.ability_score.index
//           let bAmt = b.bonus

//           char.skills[bIndex] += bAmt;
//         }
//         delete char.abilityBonuses
//       }

//       function processSavingThrows(char){
//         char.savingThrows = char.skills
//       }

//       function processChecks(char){

//         const skills = char.skills

//         const checks = {
//           acrobatics: skills.dex,
//           animal_handling: skills.wis,
//           arcana: skills.int,
//           athletics: skills.str,
//           deception: skills.cha,
//           history: skills.int,
//           insight: skills.wis, 
//           intimidation: skills.cha,
//           investigation: skills.int,
//           medicine: skills.wis,
//           nature: skills.int,
//           perception: skills.wis,
//           performance: skills.cha,
//           pursuasion: skills.cha,
//           religion: skills.int, 
//           slight_of_hand: skills.dex,
//           stealth: skills.dex,
//           survival: skills.wis
//         }
//         char.checks = checks
//       }

//       async function processTraits(char){
//         for(let t of char.traits){
//           if(t.proficiencies.length != 0) {

//             let proficiencies = await resolveArray(t.proficiencies)
//             console.log(proficiencies)
//             for(let p of proficiencies){
//               if(char.proficiencies.find((val) => {return val.index === p.index})) 
//                 continue
              
//               char.proficiencies.push(p)
//             }
//           }
//         }
//       }

//       function processProficiencies(char){
//         const proficiencies = char.proficiencies
        
//         let proficientEquipment = []
        
//         for(let prof of proficiencies){
//           console.log(prof)
//           let type = prof.references[0].type
//           if(type === 'skills'){
//             char.checks[prof.references[0].index] += char.prof_bonus
//           }
//           else if(type === 'equipment'){
//             let equipment = prof.references[0]

//             proficientEquipment.push(equipment.index)
//           }
//         }
        
//         char.proficientEquipment = proficientEquipment
//         // delete char.proficiencies 
//       }

//       function processFeatures(char){
//         const features = char.features
//         for(let f of features){
//           console.log(f) //haven't seen anything to do with these yet
//         }
//       }

//       function processEquipment(char){
//         const equipment = char.equipment
//         for(let e of equipment){
//           if(e.contents){
//             console.log('pack detected')
//             console.log(e)
//           }
//         }
//       }
      
//       function buildCharacter(){
//         if(!building) return
        
//         console.log('building...') 
//         build()

//         async function build(){
//           const char = character

//           const langData = resolveArray(char.languages)
//           const traitData = resolveArray(char.traits)
//           const profData = resolveArray(char.proficiencies)
//           const featData = resolveArray(char.features)
//           const equipData = resolveEquipment(char.equipment)

//           char.languages = await langData
//           char.traits = await traitData
//           char.proficiencies = await profData
//           char.features = await featData
//           char.equipment = await equipData

//           processAbilityBonuses(char)
//           processSavingThrows(char)
//           processChecks(char)
//           await processTraits(char)
//           processProficiencies(char)
//           processFeatures(char)
//           processEquipment(char)

//           setBuilding(false)
//           setCharacter(char)
          
//         }
//       }
//       useEffect(buildCharacter, [building, character])
      
//       function handleChoice(){

//       }

//       function handleSubmit(){
//         console.log('here')
        
//         const choice = curChoice.from[parseInt(curChoiceVal)]

//         console.log(choice)
//         console.log(curChoice)

//         if(curChoice.type === 'trait'){

//         }
//         else if(curChoice.type === 'proficiency'){
//           character.proficiencies.push(choice)
//         } 
//         else if(curChoice.type === 'equipment'){
//           character.equipment.push(choice)
//         }
//         else if(curChoice.type === 'language'){
//           character.languages.push(choice)
//         }
//         else if(curChoice.type === 'spell'){
//           character.spells[choice.level].push(choice)
//         }
//         else if(curChoice.type === 'skill'){
//           character.abilityBonuses.push({bonus: choice.bonus, ability_score: choice})
//         }

//         if(buildQueue.length === 0) {
//           setChoosing(false)
//           setBuilding(true)
//         }
//         else {
//           // setCurChoiceVal('')
//           setCurChoice(buildQueue.pop())
//         }
//       }

//       function renderMenuItems(){
//         return(
//           <Select
//           value={curChoiceVal}
//           label={curChoice.type}
//           labelId={curChoice.type}
//           name={curChoice.type}
//           onChange={(e) => {setCurChoiceVal(e.target.value.toString())}
//         }
//         >
//           <MenuItem key={'None'} value=''><em>None</em></MenuItem>
//           {curChoice.from.map((option, i) => {
//             return(
//               <MenuItem key={i} value={i}>{option.name}</MenuItem>
//             )
//           })}
//         </Select>
//         )
//       }

//       function renderChoice(){
//         console.log(curChoice)
//         return(
//           <FormControl variant="outlined" className={classes.formControl}>
//             <InputLabel id="subrace">{curChoice.type}</InputLabel>
//               {renderMenuItems()}
//             <Button onClick={handleSubmit}>Submit</Button>
//           </FormControl> 
//         )

//       }

//       return(
//         <div>
//           {choosing ? renderChoice(curChoice) : null}
//           {character ? <JSONPretty  id="character" data={character}/> : null}
//         </div>
        
//       )
// }