import {useState, useLayoutEffect, useEffect} from 'react'
import {Choice} from './Choice'
import {getFromDndAPI} from '../adapters/get'
import {ResolvingTable} from '../ResolvingTable'

export function ClassBuilder(props) {
    const [class_, setClass_] = [props.class_, props.setClass_]
    const [subclass, setSubclass] = [props.subclass, props.setSubclass]
    const [resolvedOptions, setResolvedOptions] = [props.classOptions, props.setClassOptions]
    const [level, setLevel] = [props.level, props.setLevel]
    const setValid = props.setValid

    const [classChoice, setClassChoice] = useState(null)
    const [subclassChoice, setSubclassChoice] = useState(null)

    const [classOptions, setClassOptions] = useState([])
    const [subclassOptions, setSubclassOptions] = useState([])
    const [levelOptions, setLevelOptions] = useState([])

    const [classValid, setClassValid] = useState(false)
    const [subclassValid, setSubclassValid] = useState(false)
    const [optionsValid, setOptionsValid] = useState(false)
    
    const [classFeatures, setClassFeatures] = useState(null)

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

    useLayoutEffect(() => {
        if(!class_){
            setClassOptions([])
            setClassValid(false)
            setSubclass(null)
            setSubclassChoice(null)
            setSubclassOptions([])
            setSubclassValid(false)
            setLevel(null)
            setLevelOptions([])
            return
        }

        setClassValid(true)

        async function fetchSubclasses(){
            const subclassChoices = []

            for(let c of class_.subclasses)
                subclassChoices.push(getFromDndAPI(c.url))
            
            for(let i in subclassChoices)
                subclassChoices[i] = await subclassChoices[i]

            setSubclassChoice({
                choose: 1,
                from: subclassChoices,
                label: 'Subclass',
                id: 'subclass-choice'
            })
        }

        if(class_.subclasses.length > 0){
            fetchSubclasses()
            setSubclassValid(false)
        }
        else{
            setSubclass(null)
            setSubclassChoice(null)
            setSubclassOptions([])
            setSubclassValid(true)
        }
        
    }, [class_, setClassOptions, setClassValid, setSubclass, setSubclassChoice, setSubclassOptions, setSubclassValid])

    useLayoutEffect(() => {
        if(subclass) setSubclassValid(true)
    }, [subclass])

    useLayoutEffect(() => {
        if(!class_) return

        const c = []
        for(let k in class_){
            if(Array.isArray(class_[k]) && k !== 'starting_equipment_options'){
                let i=0
                for(let opt of class_[k]){
                    if(opt.choose){
                        console.log('opt found', opt)
                        c.push(
                        {
                            choose: opt.choose,
                            from: opt.from,
                            id: 'class-option-'+opt.type+'-'+(i++),
                            label: 'class_'+opt.type,
                            type: opt.type
                        })
                    }
                }
            }
        }
        setClassOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [class_])

    useLayoutEffect(() => {
        if(!subclass) return

        const c = []
        for(let k in subclass){
            if(Array.isArray(subclass[k]) && k !== 'starting_equipment_options'){
                let i=0
                for(let opt of subclass[k]){
                    if(opt.choose){
                        console.log('opt found', opt)
                        c.push(
                        {
                            choose: opt.choose,
                            from: opt.from,
                            id: 'subclass-option-'+opt.type+'-'+(i++),
                            label: 'subclass_'+opt.type,
                            type: opt.type
                        })
                    }
                }
            }
        }
        setSubclassOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [subclass])

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
        if(!class_ || !level || !subclassValid) return

        async function fetchLevel(){
            let levels = await getFromDndAPI(class_.url+'/levels')
            let sublevels = subclass ? await getFromDndAPI(subclass.url+'/levels') : []
            levels = levels.filter((val) => {return val.level <= level && !val.subclass})
            if(sublevels) sublevels = sublevels.filter((val) => {return val.level <= level})

            const finalLevels = levels.concat(sublevels)
            
            console.log('Levels:', finalLevels)

            let feats = []
            for(let lvl in finalLevels){
               feats = feats.concat(finalLevels[lvl].features)
               feats = feats.concat(finalLevels[lvl].feature_choices)
            }

            let rFeats = []
            for(let f of feats){
                rFeats.push(getFromDndAPI(f.url))
            }

            for(let i in rFeats){
                rFeats[i] = await rFeats[i]
            }
            console.log('Resolved Feataures:', rFeats)
            setClassFeatures(rFeats)
        }
        fetchLevel()

    },[level, class_, subclass, subclassValid])

    useLayoutEffect(() => {
        if(!classFeatures) return

        const c = []
        //push any choices from different classes to c - for each class has an if statement
        for(let i in classFeatures){
            let f = classFeatures[i]
            if(f.index.includes('ability-score-improvement')){
                c.push({
                    choose: 1, 
                    from: [
                        {name: 'Strength', id: 'str', type: 'ability-score-improvement'}, 
                        {name: 'Dexterity', id: 'dex', type: 'ability-score-improvement'}, 
                        {name: 'Constitution', id: 'con', type: 'ability-score-improvement'}, 
                        {name: 'Intelligence', id: 'int', type: 'ability-score-improvement'}, 
                        {name: 'Wisdom', id: 'wis', type: 'ability-score-improvement'}, 
                        {name: 'Charisma', id: 'cha', type: 'ability-score-improvement'}
                    ], 
                    id: f.index, 
                    label: f.name,
                    type: 'ability-score-improvement'
                })
            }
        }

        setLevelOptions(c)
        if(c.length > 0){
            setOptionsValid(false)
        }
    }, [classFeatures])

    useLayoutEffect(() => {
        setValid(classValid && subclassValid && optionsValid)
    }, [classValid, subclassValid, optionsValid])

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
            {classChoice ? <Choice setChoice={setClass_} choice={classChoice}/> : null}
            {class_ ? <Choice setChoice={setLevel} choice={{choose: 1, from: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,28,19,20], id: 'class-level', label: 'Level', type: 'level'}}/> : null}
            {subclassChoice ? <Choice setChoice={setSubclass} choice={subclassChoice}/> : null}
            {renderOptions(classOptions)}
            {renderOptions(subclassOptions)}
            {renderOptions(levelOptions)}
            {class_ ? <ResolvingTable 
                data={class_.proficiencies}
                headers={['Proficiency', 'Proficiency Description']}
                keys={['name', 'desc']}
                nothingMsg={'This class has no special proficiencies!'}
                defaultDesc={'You have proficiency in this skill or with this weapon'}
            /> : null}
            {classFeatures ? <ResolvingTable
                data={classFeatures}
                headers={['Features', 'Description']}
                keys={['name', 'desc']}
                nothingMsg={"This class has no features?"}
                defaultDesc={"I guess this feature doesn't have a description?"}
            /> : null}
        </div>
    )
}
