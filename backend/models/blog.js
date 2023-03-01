const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateOfCreation: String,
    claps: Number,
    feature_img: String,
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    comments: [
      {
        author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    text: String
      }
    ]
});

const Blog = mongoose.model('Blog', blogSchema);

blogSchema.methods.clap = function() {
 this.claps++
  return this.save()
}

blogSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}

blogSchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}

blogSchema.methods.getUserBlog = async function (_id) {
  const blog = await Blog.find({'author': _id})
  return blog
}

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Blog