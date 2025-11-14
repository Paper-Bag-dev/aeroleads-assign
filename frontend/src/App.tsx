import { BrowserRouter, Route, Routes } from "react-router";
import Blogs from "./components/Blogs";
import AutoDialer from "./components/AutoDialer";
import { useState } from "react";
import BlogPage from "./components/BlogPage";

export interface BlogInterface {
  title: string;
  slug: string;
  content: string;
}

const App = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutoDialer />} />
        <Route
          path="/blogs"
          element={<Blogs blogs={blogs} setBlogs={setBlogs} />}
        />

        {blogs.map((b) => (
          <Route
            key={b.slug}
            path={`/blogs/${b.slug}`}
            element={<BlogPage blog={b} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
