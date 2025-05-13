const mongoose = require("mongoose");

// Verificación de argumentos
if (process.argv.length < 3) {
  console.log("Usage:");
  console.log("To add a person: node mongo.js <password> <name> <number>");
  console.log("To list phonebook: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://naimbarba123:${password}@cluster0.wwat2lw.mongodb.net/Ejercicios?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

// Definición del esquema y modelo
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Conectar a la base de datos
mongoose
  .connect(url)
  .then(() => {
    // Agregar una persona si hay 5 argumentos
    if (process.argv.length === 5) {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({ name, number });

      return person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    }

    // Listar todas las personas si solo hay 3 argumentos
    if (process.argv.length === 3) {
      console.log("Phonebook:");
      return Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
