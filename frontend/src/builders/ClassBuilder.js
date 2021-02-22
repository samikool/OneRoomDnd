import {useState, useLayoutEffect, useEffect} from 'react'
import {Choice} from './Choice'
import {getFromDndAPI} from '../adapters/get'
import {ResolvingTable} from '../ResolvingTable'

export function ClassBuilder(props) {
    const [class_, setClass_] = [props.class_, props.setClass_]
    const [subclass, /*setSubclass*/] = [props.subclass/*, props.setSubclass*/]
    //const [resolvedChoices, setResolvedChoices] = [props.raceChoices, props.setRaceChoices]
    //const setValid = props.setValid

    const [classChoice, setClassChoice] = useState(null)
    //const [subclassChoice, setSubclassChoice] = useState(null)
    
    useLayoutEffect(() => {
        async function fetchClasses(){
            const classes = await getFromDndAPI('/api/classes')
            const classChoices = []

            for(let c of classes.results)
                classChoices.push(getFromDndAPI(c.url))
            
            for(let i in classChoices)
                classChoices[i] = await classChoices[i]

            setClassChoice({
                choose: 1,
                from: classChoices,
                label: 'Class',
                id: 'class-choice',
            })
        }
        fetchClasses()
    }, [])

    useEffect(() => {
        console.log('class:', class_)
    }, [class_])

    return(
        <div>
            {classChoice ? <Choice setChoice={setClass_} choice={classChoice}/> : null}
            {class_ ? <ResolvingTable 
                    data={subclass ? 
                        class_.proficiencies.concat(subclass.starting_proficiencies) 
                        : class_.proficiencies}
                    headers={['Proficiency', 'Proficiency Description']}
                    keys={['name', 'desc']}
                    nothingMsg={'This class has no special proficiencies!'}
                    defaultDesc={'You have proficiency in this skill or with this weapon'}
                /> : null}
        </div>
    )
}
