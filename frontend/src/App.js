import './App.css';
import axios from 'axios';
import {useState, useEffect} from "react"

function App() {
  
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    content: "",
    dateOfCreation: ""
  });
  const [editBlog, setEditBlog] = useState("")


  const getBlogs = async () => {
    try{
      const res = await axios.get('/api/blogs')
      setBlogs(res.data)
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  getBlogs()
  },[]) 

  const handleCreateBlog = async (event) => {
    event.preventDefault()
  try{
    const res = await axios.post('/api/blogs', blog)
     setBlogs([...blogs,res.data])
    setBlog({
      title: "",
    author: "",
    content: "",
    dateOfCreation: ""
    })
  } catch (err) {
    console.log(err)
  }
  }

  const handleEditBlog = async (event) => {
    event.preventDefault()
    try{
    const res = await axios.put(`/api/blogs/${editBlog}`, blog)
     getBlogs()
    setBlog({
      title: "",
    author: "",
    content: "",
    dateOfCreation: ""
    })
    setEditBlog("")
  } catch (err) {
    console.log(err)
  }
  }

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`/api/blogs/${id}`)
      if(res){
      getBlogs()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async (selectedBlog) => {
    setBlog({
      title: selectedBlog.title,
    author: selectedBlog.author,
    content: selectedBlog.content,
    dateOfCreation: selectedBlog.dateOfCreation
    })
    setEditBlog(selectedBlog.id)
  }

  return (
    <div >
      <h1>Blogs</h1>
      <p>create a blog</p>
      <form>
      <div>
      <label>title</label>
      <input value={blog.title} onChange={(e)=> setBlog({...blog, title: e.target.value})}/>
      </div>
      <div>
      <label>author</label>
      <input value={blog.author} onChange={(e)=> setBlog({...blog, author: e.target.value})}/>
      </div>
      <div>
      <label>content</label>
      <input value={blog.content} onChange={(e)=> setBlog({...blog, content: e.target.value})}/>
      </div>
      <div>
      <label>date Of Creation</label>
      <input type="date" value={blog.dateOfCreation} onChange={(e)=> setBlog({...blog, dateOfCreation: e.target.value})}/>
      </div>
      {editBlog ? <button onClick={handleEditBlog}>Edit</button>
       : <button onClick={handleCreateBlog}>Submit</button>}
      </form>
      <div>
      {blogs.map((blog) => {
        return(
          <div key={blog.id} style={{border: "1px solid black"}}>
          <p>title - {blog.title}</p>
          <span>Author - {blog.author}    </span>
          <span>Date - {blog.dateOfCreation}</span>
          <p>{blog.content}</p>
          <button onClick={()=> handleEdit(blog)} style={{backgroundColor: "yellow"}}>Edit</button>
          <button onClick={()=> handleDelete(blog.id)} style={{backgroundColor: "red"}}>delete</button>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
