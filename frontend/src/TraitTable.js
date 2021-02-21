import {useLayoutEffect, useState} from 'react'
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
import { getFromDndAPI } from './adapters/get'

export function TraitTable(props){

    const race = props.race
    const subrace = props.subrace

    const [traits, setTraits] = useState(null)
    const [subtraits, setSubtraits] = useState(null)

    useLayoutEffect(() => {
        if(!race) {
            setTraits(null)    
            return
        }

        async function fetchTraits(){
            const resolvedTraits = []
            
            for(let f of race.traits)
                resolvedTraits.push(getFromDndAPI(f.url))
            
            for(let i in resolvedTraits)
                resolvedTraits[i] = await resolvedTraits[i]

            setTraits(resolvedTraits)
        }
        fetchTraits()
    }, [race])

    useLayoutEffect(() => {
        if(!subrace) {
            setSubtraits(null)
            return
        }

        async function fetchTraits(){
            const resolvedTraits = []

            for(let f of subrace.racial_traits)
                resolvedTraits.push(getFromDndAPI(f.url))
            
            for(let i in resolvedTraits)
                resolvedTraits[i] = await resolvedTraits[i]

            setSubtraits(resolvedTraits)
        }
        fetchTraits()
    }, [subrace])

    function renderRows(data){
        if(!data.length > 0) 
            return(
                <TableRow>
                    <TableCell>
                        This race has no special traits!
                    </TableCell>
                    <TableCell/>
                </TableRow>
            )

        return data.map((trait) => {
            return(
                <TableRow key={trait.name}>
                    <TableCell>{trait.name}</TableCell>
                    <TableCell>{trait.desc}</TableCell>
                </TableRow>
            )
        })
    }
 
    return(
        <Table>
            <TableHead>
                <TableRow>
                <TableCell> 
                    Trait Name
                </TableCell>
                <TableCell>
                    Trait Description
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {traits ? renderRows(traits) : null}
                {subtraits ? renderRows(subtraits) : null}
            </TableBody>
        </Table>
    )
}

export default TraitTable