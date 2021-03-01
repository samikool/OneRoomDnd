import {useState, useEffect, useLayoutEffect} from 'react'
import { getFromDndAPI } from '../adapters/get'
import {Choice} from './Choice'
import { ResolvingTable } from '../ResolvingTable'

export function RaceBuilder(props){
    const [race, setRace] = [props.race, props.setRace]
    const [subrace, setSubrace] = [props.subrace, props.setSubrace]
    const [resolvedOptions, setResolvedOptions] = [props.raceOptions, props.setRaceOptions]
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
        if(!race){ //reset everything
            setRaceOptions([])
            setResolvedOptions({}) 
            setRaceValid(false)
            setSubrace(null)
            setSubraceChoice(null)
            setSubraceOptions([])
            setSubraceValid(false)
            return
        }

        setRaceValid(true)

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

        if(race.subraces.length > 0){ //need subrace
            fetchSubraces()
            setSubraceValid(false)
        }else{
            setSubrace(null)
            setSubraceChoice(null)
            setSubraceOptions([])
            setSubraceValid(true)
        }
    },[race, setRaceOptions, setResolvedOptions, setRaceValid, setSubrace, setSubraceChoice, setSubraceOptions, setSubraceValid])

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
                    label: 'Race '+race[k].type,
                    type: race[k].type
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
                    id: 'subrace-option-'+subrace[k].type,
                    label: 'Subrace '+subrace[k].type,
                    type: subrace[k].type
                })
            }
        }

        setSubraceOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [subrace])


    useLayoutEffect(() => {
        let v = true
        for(let k in resolvedOptions){
            if(!resolvedOptions[k].selected){
                v = false
                break
            }
        }
        setOptionsValid(v)
    }, [resolvedOptions])

    useLayoutEffect(() => {
        setValid(raceValid && subraceValid && optionsValid)
    },[raceValid, subraceValid, optionsValid, setValid])



    function renderOptions(choiceArray){
        return choiceArray.map((choice,i) => {
            return <Choice key={'choice'+i} choice={choice} setChoice={(e) => {handleChoice(e, choice)}}/>
        })
    }

    function handleChoice(e, choice){
        const id = choice.id

        if(!resolvedOptions[id] || resolvedOptions[id].selected !== e){
            const c = {choice: choice, selected: e}
            setResolvedOptions((prevState) => { return( {...prevState, [id]: c})})
        }
    }

    return(
        <div>
            <span>
                {raceChoice ? <Choice setChoice={setRace} choice={raceChoice}/> : null}
                {subraceChoice ? <Choice setChoice={setSubrace} choice={subraceChoice}/> : null}

                {renderOptions(raceOptions)}
                {renderOptions(subraceOptions)}

                {race ? <ResolvingTable 
                    data={subrace ? race.traits.concat(subrace.racial_traits) : race.traits} 
                    headers={['Trait', 'Trait Description']}
                    keys={['name', 'desc']}
                    nothingMsg={'This race has no special traits'}
                    defaultDesc={''}
                /> : null}
                {race ? <ResolvingTable 
                    data={subrace ? 
                        race.starting_proficiencies.concat(subrace.starting_proficiencies) 
                        : race.starting_proficiencies}
                    headers={['Proficiency', 'Proficiency Description']}
                    keys={['name', 'desc']}
                    nothingMsg={'This race has no special proficiencies!'}
                    defaultDesc={'You have proficiency in this skill or with this weapon'}
                /> : null}
            </span>
        </div>
    )
}