import {useState, useEffect} from 'react'
import {ClassBuilder} from './builders/ClassBuilder'
import {RaceBuilder} from './builders/RaceBuilder'
// import {getFromDndAPI} from './adapters/get'

export function CharacterBuilder(){
    const [chosenRace, setChosenRace] = useState(null)
    const [chosenSubrace, setChosenSubrace] = useState(null)
    const [raceChoices, setRaceChoices] = useState({})
    const [raceValid, setRaceValid] = useState(false)
    const [class_, setClass_] = useState(null)
    const [subclass, setSubclass] = useState(null)

    useEffect(() => {
        if(!chosenRace && !chosenSubrace) return

        console.log(chosenRace)
        console.log(chosenSubrace ? chosenSubrace : 'Subrace not chosen')
        // 

    }, [chosenRace, chosenSubrace])

    useEffect(() => {
        console.log('Race choices made:',raceChoices)
    }, [raceChoices])

    return(
        <div>
            <RaceBuilder 
                race={chosenRace} setRace={setChosenRace} 
                subrace={chosenSubrace} setSubrace={setChosenSubrace} 
                raceChoices={raceChoices} setRaceChoices={setRaceChoices}
                valid={raceValid} setValid={setRaceValid}
            />
            {raceValid ? <ClassBuilder
                class={class_} setClass={setClass_}
                subclass={subclass} setSubclass={setSubclass}
            /> : null}
        </div>
    )
}

export default CharacterBuilder