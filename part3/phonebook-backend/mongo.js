const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.jglvyzx.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(res=>{
    console.log('Database connected');
},err=>{
    console.log('Connection failed',err);
})


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "Arto Hellas", 
    number: "040-123456",
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
