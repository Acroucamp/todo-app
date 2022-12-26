import logger from '../middlewares/logger/logger.js'
import sqlite3 from 'sqlite3'
sqlite3.verbose()

const database = new sqlite3.Database('./database/todo.db', sqlite3.OPEN_READWRITE, (error) => {
    if (error) return logger.error(error.message)
    logger.info('Connected to database')
})

database.close((error) => {
    if (error) return logger.error(error.message)
    logger.info('Close the database connection')
})

export default database