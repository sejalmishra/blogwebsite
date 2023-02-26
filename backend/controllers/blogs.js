const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async(request, response) => {
  try{
    const blogs = await Blog.find({});
    if(blogs){
      response.json(blogs)
    }
  } catch(err){
    res.status(400).send(err)
  }
})

blogsRouter.post('/', async (req, res) => {
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

blogsRouter.delete('/:id', async (req, res) => {
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

blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true});
    res.status(200).json(updatedBlog)
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = blogsRouter;

