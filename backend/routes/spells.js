const router = require('express').Router()
const fetch = require('node-fetch')
const config = require('../constants').config()
const spells = require('../data/spells.json')

router.get('/', async (req,res) => {
    res.status(200).json(spells)
})
module.exports = router;