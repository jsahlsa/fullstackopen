require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')
const app = express()

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
            const length = persons.length
            const date = new Date()
            const html = `<p>Phonebook has info for ${length} people</p><p>${date}</p>`
            response.send(html)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).
    then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.error('person not deleted', err)
            next(error)
        })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body, 'this is body')

    if (!body.name) {
        return response.status(400).json({
            error: 'name must be given'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number must be given'
        })
    }

    console.log(body.name)

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {
        name,
        number
    } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then(updatedPerson => {
                console.log(`${name} has been updated`)
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformed id'
        })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
