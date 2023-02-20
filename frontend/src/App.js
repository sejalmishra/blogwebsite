import './App.css';
import axios from 'axios';
import {useState, useEffect} from "react"

function App() {
  
  const [blogs, setBlogs] = useState([]);

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

  return (
    <div >
      <h1>Blogs</h1>
      <div>
      {blogs.map((blog) => {
        return(
          <div key={blog.id}>
          <span>Author - {blog.author}    </span>
          <span>Date - {blog.dateOfCreation}</span>
          <p>{blog.content}</p>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
