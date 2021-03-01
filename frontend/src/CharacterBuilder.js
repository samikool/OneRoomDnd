import {useState, useEffect} from 'react'
import {ClassBuilder} from './builders/ClassBuilder'
import {RaceBuilder} from './builders/RaceBuilder'
// import {getFromDndAPI} from './adapters/get'

export function CharacterBuilder(){
    const [race, setRace] = useState(null)
    const [subrace, setSubrace] = useState(null)
    const [raceOptions, setRaceOptions] = useState({})
    const [raceValid, setRaceValid] = useState(false)

    const [class_, setClass_] = useState(null)
    const [subclass, setSubclass] = useState(null)
    const [classOptions, setClassOptions] = useState({})
    const [classValid, setClassValid] = useState(false)

    const [level, setLevel] = useState(null)
    const [levelOptions, setLevelOptions] = useState({})

    useEffect(() => {
        if(!race && !subrace) return

        console.log(race)
        console.log(subrace ? subrace : 'Subrace not chosen')
        // 

    }, [race, subrace])

    useEffect(() => {
        if(!class_ && !subclass) return

        console.log(class_)
        console.log(subclass ? subclass : 'Subclass not chosen')
        // 

    }, [class_, subclass])

    useEffect(() => {
        console.log('Level:', level)
    }, [level   ])

    useEffect(() => {
        console.log('Race Options made:', raceOptions)
    }, [raceOptions])

    useEffect(() => {
        console.log('Class Options made:', classOptions)
    }, [classOptions])

    return(
        <div>
            <RaceBuilder 
                race={race} setRace={setRace} 
                subrace={subrace} setSubrace={setSubrace} 
                raceOptions={raceOptions} setRaceOptions={setRaceOptions}
                setValid={setRaceValid}
            />
            {raceValid ? 
            <ClassBuilder
                class_={class_} setClass_={setClass_}
                level={level} setLevel={setLevel}
                subclass={subclass} setSubclass={setSubclass}
                classOptions={classOptions} setClassOptions={setClassOptions}
                valid={classValid} setValid={setClassValid}
            /> : null}
           {raceValid && classValid ? <p>true</p> : <p>false</p>}
        </div>
    )
}