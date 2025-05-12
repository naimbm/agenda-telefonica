const express = require("express");
const morgan = require("morgan");
app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('data',(req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let numbers = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(numbers);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${numbers.length} people</p> <p> ${Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = numbers.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  //response.json(person)
});

app.delete("/api/persons/:id", (request, response) => {
  numbers = numbers.filter((number) => number.id !== Number(request.params.id));
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {

    if ( numbers.find((number) => number.name === request.body.name))
    {
        return response.status(400).json({"error": "persona ya existe"})
    }

    //console.log(request.body.name)
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const number = {
    "name": request.body.name,
    "number": request.body.number,
    "id": Math.random()*1000000
  }
  numbers = numbers.concat(number)
  response.json(number)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
