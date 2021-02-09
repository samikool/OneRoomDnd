const router = require('express').Router()
const fetch = require('node-fetch')
const config = require('../constants').config()

router.get('/', async (req,res) => {
    let url = config.dndURL + req.baseUrl.replace('/dndAPI', '')
    let data = await fetch(url)
    data = await data.json()
    res.status(200).json(data)
})
module.exports = router;