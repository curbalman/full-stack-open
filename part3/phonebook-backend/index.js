require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const now = new Date();
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info for ${result.length} people</p>` +
                  `<p>${now.toString()}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  console.log("Get all persons...")
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response) => {
  console.log(request.headers)
  console.log(request.body)
  const body = request.body
  if (!(body.name && body.number)) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const person = new Person({
      name: body.name, 
      number: body.number,
  })

  person.save().then(result => {
      console.log(`Saved ${result.name}!\n`, result)
      response.json(result)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(p => {
      if(!p) {
        return response.status(404).end()
      }

      p.name = request.body.name
      p.number = request.body.number

      return p.save().then( updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  console.log('unknown endpoint')
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

