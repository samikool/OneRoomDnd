const router = require('express').Router()
const db = require('../database')


router.get('/', async (req,res) => {
    const itemList = await db.select('itemList', '*')
    const resData = {}
     
    for(let item of itemList){

        const itemData = await db.select('item', '*', 'id', item.itemID)

        itemData.quantity = item.quantity

        resData[item.itemID] = itemData
    }

    res.status(200).json(resData)
})

router.post('/', async (req,res) => {
    const name = req.body['name']
    let quantity = parseInt(req.body['quantity'])
    const item = await db.select('item', '*', 'index', name)


    if(!item) res.status(406).send('Item does not exist')
    else{
        const listItem = await db.select('itemList', '*', 'itemID', item.id)

        //item exists
        if(listItem){
            quantity += listItem.quantity
            await db.update('itemList', 'quantity', quantity, 'itemID', item.id)
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

    const item = await db.select('item', '*', 'index', name)
    const listItem = await db.select('itemList', '*', 'itemID', item.id)

    if(listItem){
        quantity = listItem.quantity - quantity
        if(quantity <= 0) 
            await db.del('itemList', 'itemID', item.id)
        else 
            await db.update('itemList', 'quantity', quantity, 'itemID', item.id) 

        res.status(200).json({success: true})
    }else
        res.status(406).send('Item not found in item list')
        
    

    
})

module.exports = router;