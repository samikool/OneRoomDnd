const https = require('https')
const fs = require('fs')

require('dotenv').config()
const privateKey = fs.readFileSync(process.env.keyPath)
const certificate = fs.readFileSync(process.env.certificatePath)

const express = require('express')
const app = express()

const config = require('./constants').config()

if(!config) throw "Enviorment variable NODE_ENV was not set...";
const port = config.port

//import cors access control


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const cors = require('cors')
app.use(cors(corsOptions));

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//default test route
app.get('/', async (req,res) => {
    console.log('Api hit')
    res.send('You found me')
})

app.use('/dndAPI*', require('./routes/dndAPI'))
app.use('/itemList', require('./routes/itemList'))

if(process.env.NODE_ENV === 'development'){
    app.listen(port, () => {console.log("Listening on port:", port)})
}else{
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(port, () => {console.log("Listening on port:", port)})    
}


module.exports.app=app