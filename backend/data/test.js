const fetch = require('node-fetch')
const fs = require('fs')

const dndURL = 'https://www.dnd5eapi.co/api'

async function getFromDndAPI(path){
    return await get(dndURL+path)
}

async function get(url){
    // console.log("Fetching:",url)
    const res = await fetch(url)
    return await checkResponse(res)
}

async function checkResponse(res){
    if(res.ok) {
        res = await res.json()
        res.ok = true
        return res
    }
    return res
}

main()

async function main(){

    // let classList = await getFromDndAPI('/subraces')
    // classList = classList.results

    // const classData = []

    // for(let cls of classList){
    //     classData.push(getFromDndAPI('/subraces/'+cls.index))
    // }

    // for(let i in classData){
    //     let d = await classData[i]
    //     classData[i] = d
    // }

    // let keyMap = {}

    // const classCount = classData.length

    // for(let k of classData){
    //     for(let key in k){
            
    //         if(keyMap[key]) keyMap[key]++
    //         else keyMap[key] = 1

    //     }
    // }

    // const commonKeys = []

    // for(let key in keyMap){
    //     if(keyMap[key] == 1) commonKeys.push(key)
    // }

    // let spellList = await getFromDndAPI('/spells')

    // const spells = {}

    
    // let i = 0;

    // for(let spell of spellList.results){
    //     spells[i] = getFromDndAPI(spell.url.replace('/api/', '/'))
    //     i++
    // }

    // for(let k in spells){
    //     spells[k] = await spells[k]
    // }

    // fs.writeFileSync('spells.json', JSON.stringify(spells, null, 2))

    const spells = require('./spells.json')
    
    console.log(spells)
}
   