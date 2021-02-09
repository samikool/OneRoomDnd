
const items = require('./items.json')
const itemList = require('./itemList.json')
const categories = require('./categories.json')

const fs = require('fs')
const fetch = require('node-fetch')
const baseURL = "https://www.dnd5eapi.co"

async function main(){
    let newItems = {}
    let i=0
    
    for(let k in items){
        let v = items[k]
       

        let res = await fetch(baseURL + v.url)
        res = await res.json()

        let catIndex = res.equipment_category.index
        let catID = await findCategoryByIndex(catIndex)


        v.categoryID = catID

        newItems[k] = v
    }
    console.log(newItems)

    let s = JSON.stringify(newItems,null,2)
    fs.writeFile('newItems.json', s, (err)=>{console.error(err)})
}

async function findCategoryByIndex(index){
    for(let k in categories){
        let v = categories[k]
        if(v.index === index){
            return k
        }
    }
}

main()