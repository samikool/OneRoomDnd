import {useState, useEffect} from 'react'
import {ClassBuilder} from './builders/ClassBuilder'
import {RaceBuilder} from './builders/RaceBuilder'
// import {getFromDndAPI} from './adapters/get'

export function CharacterBuilder(){
    const [race, setRace] = useState(null)
    const [subrace, setSubrace] = useState(null)
    const [raceChoices, setRaceChoices] = useState({})
    const [raceValid, setRaceValid] = useState(false)
    const [class_, setClass_] = useState(null)
    const [subclass, setSubclass] = useState(null)
    const [classChoices, setClassChoices] = useState({})
    const [classValid, setClassValid] = useState(false)

    useEffect(() => {
        if(!race && !subrace) return

        console.log(race)
        console.log(subrace ? subrace : 'Subrace not chosen')
        // 

    }, [race, subrace])

    useEffect(() => {
        if(!class_ && !subclass) return

        console.log(class_)
        console.log(subclass ? subclass : 'Subrace not chosen')
        // 

    }, [class_, subclass])

    useEffect(() => {
        console.log('Race choices made:',raceChoices)
    }, [raceChoices])

    return(
        <div>
            <RaceBuilder 
                race={race} setRace={setRace} 
                subrace={subrace} setSubrace={setSubrace} 
                raceChoices={raceChoices} setRaceChoices={setRaceChoices}
                setValid={setRaceValid}
            />
            {raceValid ? 
            <ClassBuilder
                class_={class_} setClass_={setClass_}
                subclass={subclass} setSubclass={setSubclass}
                classChoices={classChoices} setClassChoices={setClassChoices}
                valid={classValid} setValid={setClassValid}
            /> : null}
           {raceValid ? <p>{classValid ? "true" : 'false'}</p> : null}
        </div>
    )
}