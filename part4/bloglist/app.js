const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogListRouter = require('./controllers/bloglists')
const usersRouter = require('./controllers/users')

const app = express()

mongoose
    .connect(config.MONGODB_URI, {
        family: 4
    })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(err => {
        logger.error('error connection to MongoDB:', err.message)
    })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogListRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
