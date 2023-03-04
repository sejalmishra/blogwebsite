import BlogsOverview from "../Blogs/BlogsOverview";
import Header from "./Header";
import Banner from "./Banner";

function HomePage() {
 
  return (
    <div >
      <Header/>
      <Banner/>
      <BlogsOverview/>
    </div>
  );
}

export default HomePage;
