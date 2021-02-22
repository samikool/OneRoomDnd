import {useLayoutEffect, useState} from 'react'
import {Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core'
import { getFromDndAPI } from './adapters/get'

export function ResolvingTable(props){

    const unresolvedData = props.data
    const headers = props.headers
    const keys = props.keys
    const nothingMsg = props.nothingMsg
    const defaultDesc = props.defaultDesc
    const [resolvedData, setResolvedData] = useState([])

    // console.log('unresolved data:', unresolvedData)

    const race = props.race
    const subrace = props.subrace

    const [traits, setTraits] = useState(null)
    const [subtraits, setSubtraits] = useState(null)

    useLayoutEffect(() => {
        async function fetchTraits(){
            const rData = []
            
            for(let f of unresolvedData)
                rData.push(getFromDndAPI(f.url))
            
            for(let i in rData)
                rData[i] = await rData[i]

            setResolvedData(rData)
        }
        fetchTraits()
    }, [unresolvedData])

    // useLayoutEffect(() => {
    //     if(!race) {
    //         setTraits(null)    
    //         return
    //     }

    //     async function fetchTraits(){
    //         const resolvedTraits = []
            
    //         for(let f of race.traits)
    //             resolvedTraits.push(getFromDndAPI(f.url))
            
    //         for(let i in resolvedTraits)
    //             resolvedTraits[i] = await resolvedTraits[i]

    //         setTraits(resolvedTraits)
    //     }
    //     fetchTraits()
    // }, [race])

    // useLayoutEffect(() => {
    //     if(!subrace) {
    //         setSubtraits(null)
    //         return
    //     }

    //     async function fetchTraits(){
    //         const resolvedTraits = []

    //         for(let f of subrace.racial_traits)
    //             resolvedTraits.push(getFromDndAPI(f.url))
            
    //         for(let i in resolvedTraits)
    //             resolvedTraits[i] = await resolvedTraits[i]

    //         setSubtraits(resolvedTraits)
    //     }
    //     fetchTraits()
    // }, [subrace])

    function renderHead(headers){
        // console.log('rendering headers:',headers)
        return headers.map((header) => {
            return <TableCell>{header}</TableCell>
        })
    }

    function renderRows(data, keys){
        console.log('rendering data:',data)
        if(!data.length > 0) 
            return(
                <TableRow>
                    <TableCell>
                       {nothingMsg}
                    </TableCell>
                    <TableCell/>
                </TableRow>
            )

        return data.map((d) => {
            return(
                <TableRow key={d[keys[0]]}>
                    <TableCell>{d[keys[0]]}</TableCell>
                    <TableCell>{d[keys[1]] ? d[keys[1]] : defaultDesc}</TableCell> 
                </TableRow>
            )
        })
    }
 
    return(
        <Table>
            <TableHead>
            <TableRow>
            {renderHead(headers)}
            </TableRow>
            </TableHead>
            
            <TableBody>
                {renderRows(resolvedData, keys)}
            </TableBody>
        </Table>
    )
}