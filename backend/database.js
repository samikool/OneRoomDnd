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

async function select(table, selectColumn, conditionColumn, conditionValue){
    let query_str = "SELECT "
    query_str += selectColumn + " "
    query_str += "FROM " + table + " "

    if(conditionColumn) {
        query_str += "WHERE `"+conditionColumn+"`='"+conditionValue+"'"
        const res = await query(query_str)
        return res[0]
    }

    return await query(query_str)
}

async function update(table, upCol, upVal, conCol, conVal){
    if(!conCol) return new Error('Condition must be defined')

    const query_str = "UPDATE " + table 
    + " SET `" + upCol + "`='" + upVal 
    + "' WHERE `" + conCol + "`='" + conVal + "'"
    return await query(query_str)
}

async function del(table, conCol, conVal){
    if(!conCol) return new Error('Condition must be defined')

    const query_str = "DELETE FROM " + table 
    + " WHERE `" + conCol + "`='" + conVal + "'"
    return await query(query_str)
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
    insertCategory,
    insertItem,
    insertItemList,
    select,
    update,
    del,
    close
}