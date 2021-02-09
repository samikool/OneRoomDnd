const config = require('../constants').config()

const dndURL = config.dndAPI
const apiURL = config.APIUrl

export async function getFromAPI(path){
    return await get(apiURL+path)
}

export async function getFromDndAPI(path){
    return await get(dndURL+path)
}

async function get(url){
    // console.log("Fetching:",url)
    const res = await fetch(url)
    return await checkResponse(res)
}

export async function post(path, data){
    let res = await fetch(apiURL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return await checkResponse(res)
}

export async function del(path, data){
    let res = await fetch(apiURL + path, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
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