import logger from '../middlewares/logger/logger.js'
import sqlite3 from 'sqlite3'
sqlite3.verbose()

const db = new sqlite3.Database('./database/database.sqlite', (error) => {
    if (error) return logger.error(error.message)
    logger.info('Connected to database')
})

export default db