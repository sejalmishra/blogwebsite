const config = require('./utils/config')
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then((result) => {
   console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
})

app.get('/', (request, response) => {
    response.send('heyy')
})
