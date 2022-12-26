import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
dotenv.config()

import logger from './middlewares/logger/logger.js'
import router from './routes/todo.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(port, () => {
    logger.info(`Server running on port: ${port}`)
})