import { useEffect, useState } from "react";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from'@material-ui/core'

function validateChoice(choice){
    //console.log(choice)
    if(!choice.from || !choice.from.length > 0) throw Error('choices not provided to Choice component')
    if(!choice.id) throw Error('id not provided to Choice component')
    if(!choice.label) throw Error('label not provided to Choice component')
    if(!choice.choose) throw Error('number of selectinos not provided to Choice component')
}

export function Choice(props){
    validateChoice(props.choice)
    const setChoice = props.setChoice

    const [curChoice, setCurChoice] = useState('')
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if(curChoice === ''){
            setChoice(null)
            setError(true); 
            return
        }
        
        setError(false)
        setChoice(props.choice.from[curChoice])
    }, [curChoice, setChoice, props.choice.from])

    function renderMenuItems(choices){
        // console.log(props.choice)
        if(props.choice.type === 'level'){
            return(
                choices.map((choice, i) => {
                    return(
                      <MenuItem key={choice+i} value={i}>{choice}</MenuItem>
                    )}
                )
            )
        }
        
        return(
            choices.map((choice, i) => {
                return(
                  <MenuItem key={choice+i} value={i}>{choice.name ? choice.name : choice.ability_score.name}</MenuItem>
                )}
            )
        )
    }

    return(
        <div>
            <FormControl error={error} variant="outlined" required>     
            <InputLabel id={props.choice.id}>{props.choice.label}</InputLabel>
            <Select
                value={curChoice}
                label={props.choice.label}
                labelId={props.choice.id}
                name={props.choice.id}
                onChange={(e) => {setCurChoice(e.target.value)}}
                autoWidth={true}
            > 
            <MenuItem key ={props.choice.id+'-choice-none'} value=''><em>None</em></MenuItem>
                {renderMenuItems(props.choice.from)}
            </Select>
            {error ? <FormHelperText>You must make a selection</FormHelperText> : null}
            </FormControl>
        </div>
    )
}



export default Choice