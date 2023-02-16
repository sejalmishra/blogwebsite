const config = require('./utils/config')
const Blog = require('./models/blog')
const express = require('express');
const mongoose = require('mongoose')
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

app.get('/api/blogs', async(request, response) => {
  try{
    const blogs = await Blog.find({});
    if(blogs){
      response.json(blogs)
    }
  } catch(err){
    res.status(400).send(err)
  }
})

app.post('/api/blogs', async (req, res) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    content: body.content,
    dateOfCreation: body.dateOfCreation
  })
  try{
    const result = await blog.save();
    res.json(result)
  } catch(err){
    res.status(400).send(err)
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).send({
      message: "Resource deleted successfully",
      deletedId: deletedBlog._id
    })
  } catch(err) {
    res.status(400).send(err)
  }
})

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true});
    res.status(200).json(updatedBlog)
  } catch(err) {
    res.status(400).send(err)
  }
})
