require('dotenv').config()

const connectionInfo = {
    host: "localhost",
    user: process.env.dbname,
    password: process.env.dbpass,
    database: "oneRoomDnd"
}

const mariadb = require('mariadb')
const db = mariadb.createPool(connectionInfo)

async function query(query_str, values){
    try{ 
        if(values) return await db.query(query_str, values) 
        else return await db.query(query_str)
    }
    catch(e){ 
        printSqlError(e) 
        return false
    }
}

async function insertTest(name1, name2, name3){
    const query_str = "INSERT INTO test (name, name2, name3) VALUES (?,?,?)"
    const values = [name1, name2, name3]
    return await query(query_str, values)
}

async function insertCategory(name, url){
    const query_str = "INSERT INTO category (`index`, name, url) VALUES (?,?,?)"
    const values = [index, name, url] 
    return await query(query_str, values)
}

async function insertItem(name, url, categoryID){
    const query_str = "INSERT INTO item (`index`, name, url, categoryID) VALUES (?, ?, ?, ?)"
    const values = [index, name, url, categoryID]
    return await query(query_str, values)
}

async function insertItemList(itemID, quantity){
    const query_str = "INSERT INTO itemList (itemID, quantity) VALUES (?,?)"
    values = [itemID, quantity]
    return await query(query_str, values)
}

async function getItem(id){
    const query_str = "SELECT * FROM item WHERE id=?"
    const values = [id]
    return await query(query_str, values)
}

async function getItemByName(name){
    const query_str = "SELECT * FROM item WHERE `index`=?"
    const values = [name]
    return await query(query_str, values)
}

async function getAllItems(){
    const query_str = "SELECT * FROM item"
    return await query(query_str)
}

async function getItemList(){
    const query_str = "SELECT * FROM itemList"
    return await query(query_str)
}

async function getItemFromList(id){
    const query_str = "SELECT * from itemList WHERE itemID=?"
    const values = [id]
    return await query(query_str, values)
}

async function updateItemQuantity(id, quantity){
    const query_str = "UPDATE itemList SET quantity=? WHERE itemID=?"
    const values = [quantity, id]
    return await query(query_str, values)
}

async function removeItemFromList(id){
    const query_str = "DELETE FROM itemList WHERE itemID=?"
    const values = [id]
    return await query(query_str, values)
}



function close(){
    db.end()
}

function printSqlError(e){
    console.error(e)

    if(e.code === 'ER_DUP_ENTRY') 
        console.error('Attempted to insert duplicate entry')
    else if(e.code === 'ER_PARSE_ERROR')
        console.error('Error parsing string when inserting')
    else if(e.code === 'ER_BAD_FIELD_ERROR')
        console.error('Attempted to insert value into column that does not exist')
    else
        console.error(e)
}

module.exports = {
    insertTest,

    insertCategory,
    insertItem,
    insertItemList,
    
    getItem,
    getItemByName,
    getItemFromList,
    getAllItems,
    removeItemFromList,
    getItemList,
    updateItemQuantity,
    close
}