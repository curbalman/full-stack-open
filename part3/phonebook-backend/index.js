const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.jglvyzx.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p>` +
                  `<p>${now.toString()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
  console.log("Get all persons...")
  Person.find({}).then(result => {
    response.json(result)
    // mongoose.connection.close()
  })
})

app.post('/api/persons', (request, response) => {
  console.log(request.headers)
  console.log(request.body)
  const person = request.body
  if (!(person.name && person.number)) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (persons.map(p => p.name).includes(person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  person.id = String(Math.floor(Math.random() * 1000000) + 1)
  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
