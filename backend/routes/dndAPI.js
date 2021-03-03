const router = require('express').Router()
const data = require('../data/master.json')


router.get('/', async (req,res) => {
    let url = req.baseUrl.replace('/dndAPI', '')
    // console.log(url)

    res.status(200).json(data[url])
})
module.exports = router;