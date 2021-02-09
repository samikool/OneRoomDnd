const router = require('express').Router()
const db = require('../database')


router.get('/', async (req,res) => {
    //console.log('hit')
    let itemList = await db.getItemList()
    let resData = {}
     
    for(let item of itemList){
        let itemData = await db.getItem(item.itemID)
        itemData = itemData[0]
        itemData.quantity = item.quantity

        resData[item.itemID] = itemData
    }

    res.status(200).json(resData)
})

router.post('/', async (req,res) => {
    const name = req.body['name']
    let quantity = parseInt(req.body['quantity'])

    let item = await db.getItemByName(name)
    item = item[0]

    if(!item) res.status(406).send('Item does not exist')
    else{
        let listItem = await db.getItemFromList(item.id)
        listItem = listItem[0]

        //item exists
        if(listItem){
            quantity += listItem.quantity
            await db.updateItemQuantity(item.id, quantity)
        }
        //item doesnt
        else{
            db.insertItemList(item.id, quantity)
        }

        res.status(200).json({success: true})
    }

    
})

router.delete('/', async (req,res) => {
    const name = req.body['name']
    let quantity = parseInt(req.body['quantity'])

    let item = await db.getItemByName(name)
    item = item[0]

    let listItem = await db.getItemFromList(item.id)
    listItem = listItem[0]

    if(listItem){
        quantity = listItem.quantity - quantity
        if(quantity <= 0) await db.removeItemFromList(item.id)
        else await db.updateItemQuantity(item.id, quantity)

        res.status(200).json({success: true})
    }else
        res.status(406).send('Item not found in item list')
        
    

    
})

module.exports = router;