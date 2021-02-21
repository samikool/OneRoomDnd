import {useLayoutEffect, useState} from 'react'
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
import { getFromDndAPI } from './adapters/get'

export function ProficiencyTable(props){

    const race = props.race
    const subrace = props.subrace

    const [proficiencies, setProficiencies] = useState(null)
    const [subproficiencies, setSubproficiencies] = useState(null)

    useLayoutEffect(() => {
        if(!race) {
            setProficiencies(null)    
            return
        }

        async function fetchProficiencies(){
            const resolvedProficiencies = []
            
            for(let f of race.starting_proficiencies)
                resolvedProficiencies.push(getFromDndAPI(f.url))
            
            for(let i in resolvedProficiencies)
                resolvedProficiencies[i] = await resolvedProficiencies[i]

            setProficiencies(resolvedProficiencies)
        }
        fetchProficiencies()
    }, [race])

    useLayoutEffect(() => {
        if(!subrace) {
            setSubproficiencies(null)
            return
        }

        async function fetchProficiencies(){
            const resolvedProficiencies = []

            for(let f of subrace.starting_proficiencies)
                resolvedProficiencies.push(getFromDndAPI(f.url))
            
            for(let i in resolvedProficiencies)
                resolvedProficiencies[i] = await resolvedProficiencies[i]

            setSubproficiencies(resolvedProficiencies)
        }
        fetchProficiencies()
    }, [subrace])

    function renderRows(data){
        if(!data.length > 0 && data !== subproficiencies) 
            return(
                <TableRow>
                    <TableCell>
                        This race has no special proficiencies!
                    </TableCell>
                    <TableCell/>
                </TableRow>
            )

        return data.map((proficiency) => {
            return(
                <TableRow key={proficiency.name}>
                    <TableCell>{proficiency.name}</TableCell>
                    <TableCell>{proficiency.desc ? proficiency.desc : 'You have proficiency in this skill or with this weapon'}</TableCell>
                </TableRow>
            )
        })
    }
 
    return(
        <Table>
            <TableHead>
                <TableRow>
                <TableCell> 
                    Proficiency
                </TableCell>
                <TableCell>
                    Proficiency Description
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {proficiencies ? renderRows(proficiencies) : null}
                {subproficiencies ? renderRows(subproficiencies) : null}
            </TableBody>
        </Table>
    )
}

export default ProficiencyTable