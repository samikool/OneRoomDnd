const db = require('../database')
const fetch = require('node-fetch')

const baseURL = "https://www.dnd5eapi.co"

async function main(){

    // await  db.insertTest('samm', 'youu')

    //categories
    if(true){
        console.log('inserting categories...')
        await insertCategories()
    }

    //items
    if(true){
        console.log('inserting items...')
        await insertItems()
    }

    if(true){
        console.log('inserting itemList...')
        await insertItemList()
    }

    db.close()
}

async function insertCategories(){
    let data = require('./categories.json')
    for(let k in data){
        let category = data[k]
        await db.insertCategory(category.index, category.name, category.url)
    }
}

async function insertItems(){
    let data =  require('./items.json')
    for(let k in data){
        let item = data[k]
        await db.insertItem(item.index, item.name, item.url, item.categoryID)
    }
}

async function insertItemList(){
    let data = require('./itemList.json')
    for(let k in data){
        let item = data[k]
        await db.insertItemList(item.itemID, item.quantity)
    }
}

main()