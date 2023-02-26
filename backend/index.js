const config = require('./utils/config')
const Blog = require('./models/blog')
const express = require('express');
const mongoose = require('mongoose')
const blogsRouter =require('./controllers/blogs')
const middleware = require('./utils/middleware')
const cors = require('cors');
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

app.use(express.json());
app.use(cors());

app.use('/api/blogs',blogsRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

