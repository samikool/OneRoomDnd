import {useState, useEffect, useLayoutEffect} from 'react'
import { getFromDndAPI } from '../adapters/get'
import {Choice} from './Choice'
import TraitTable from '../TraitTable'
import {ProficiencyTable} from '../ProficiencyTable'

export function RaceBuilder(props){
    const [race, setRace] = [props.race, props.setRace]
    const [subrace, setSubrace] = [props.subrace, props.setSubrace]
    const [resolvedChoices, setResolvedChoices] = [props.raceChoices, props.setRaceChoices]
    const setValid = props.setValid

    const [raceChoice, setRaceChoice] = useState(null)
    const [subraceChoice, setSubraceChoice] = useState(null)
    
    const [raceOptions, setRaceOptions] = useState([])
    const [subraceOptions, setSubraceOptions] = useState([])

    const [raceValid, setRaceValid] = useState(false)
    const [subraceValid, setSubraceValid] = useState(false)
    const [optionsValid, setOptionsValid] = useState(false)

    useLayoutEffect(() => {
        async function fetchRaces(){
            const races = await getFromDndAPI('/api/races')
            const raceChoices = []

            for(let r of races.results)
                raceChoices.push(getFromDndAPI(r.url))
            
            for(let i in raceChoices)
                raceChoices[i] = await raceChoices[i]

            setRaceChoice({
                choose: 1,
                from: raceChoices,
                label: 'Race',
                id: 'race-choice',
            })
        }
        fetchRaces()
    }, [])

    useLayoutEffect(() => {
        setRaceOptions([])
        setResolvedChoices({})
        if(!race){
            setRaceValid(false)
            return
        }
        setRaceValid(true)
    }, [race, setRaceOptions, setResolvedChoices, setRaceValid])

    useLayoutEffect(() => {
        if(!race) return

        async function fetchSubraces(){
            const subraceChoices = []

            for(let r of race.subraces)
                subraceChoices.push(getFromDndAPI(r.url))
            
            for(let i in subraceChoices)
                subraceChoices[i] = await subraceChoices[i]

            setSubraceChoice({
                choose: 1,
                from: subraceChoices,
                label: 'Subrace',
                id: 'subrace-choice'
            })
        }

        if(race.subraces.length > 0){
            fetchSubraces()
            setSubraceValid(false)
        }else{
            setSubrace(null)
            setSubraceChoice(null)
            setSubraceOptions([])
            setSubraceValid(true)
        }
    },[race, setSubrace, setSubraceChoice, setSubraceOptions, setSubraceValid])

    useLayoutEffect(() => {
        if(subrace) setSubraceValid(true)
    },[subrace])

    useLayoutEffect(() => {
        if(!race) return

        const c = []
        for(let k in race){
            if(race[k].choose){ c.push(
                {
                    choose: race[k].choose,
                    from: race[k].from,
                    id: 'race-option-'+race[k].type,
                    label: 'Race '+race[k].type
                })
            }
        }
        setRaceOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [race])

    useLayoutEffect(() => {
        const c = []
        for(let k in subrace){
            if(subrace[k].choose){ c.push(
                {
                    choose: subrace[k].choose,
                    from: subrace[k].from,
                    id: 'race-option-'+subrace[k].type,
                    label: 'Race '+subrace[k].type
                })
            }
        }

        setSubraceOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [subrace])


    useEffect(() => {
        let v = true
        for(let k in resolvedChoices){
            if(!resolvedChoices[k].selected){
                v = false
                break
            }
        }
        setOptionsValid(v)
    }, [resolvedChoices])

    useLayoutEffect(() => {
        setValid(raceValid && subraceValid && optionsValid)
    },[raceValid, subraceValid, optionsValid, setValid])



    function renderChoices(choiceArray){
        return choiceArray.map((choice,i) => {
            return <Choice key={'choice'+i} choice={choice} setChoice={(e) => {handleChoice(e, choice)}}/>
        })
    }

    function handleChoice(e, choice){
        const id = choice.id

        if(!resolvedChoices[id] || resolvedChoices[id].selected !== e){
            const c = {choice: choice, selected: e}
            setResolvedChoices((prevState) => { return( {...prevState, [id]: c})})
        }
    }

    return(
        <div>
            <span>
                {raceChoice ? <Choice setChoice={setRace} choice={raceChoice}/> : null}
                {subraceChoice ? <Choice setChoice={setSubrace} choice={subraceChoice}/> : null}
                <span>
                    {renderChoices(raceOptions)}
                    {renderChoices(subraceOptions)}
                </span>
                {race ? <TraitTable race={race} subrace={subrace}/> : null}
                {race ? <ProficiencyTable race={race} subrace={subrace}/> : null}
            </span>
        </div>
    )
}

export default RaceBuilder