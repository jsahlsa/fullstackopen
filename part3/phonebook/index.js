const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

let persons = [{
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const length = persons.length
    const date = new Date()
    response.send(`<p>
        Phonebook has info for ${length} people
        </p>
        <p>
        ${date}
        </p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(n => n.id === request.params.id)

    if (!person) {
        response.status(404).end()
    } else {
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(n => n.id === id)

    if (person) {
        persons = persons.filter(n => n.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 100000000);

    const body = request.body

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

    const dupe = persons.find(n => n.name === body.name)

    if (dupe) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
