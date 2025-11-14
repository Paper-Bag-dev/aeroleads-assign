import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import type { BlogInterface } from "../App";

interface BlogProps {
  blogs: BlogInterface[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogInterface[]>>;
}

function Blogs({ blogs, setBlogs }: BlogProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/blog", {
        prompt,
      });

      if (!response) return;

      console.log(response.data);
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-12 p-12 bg-black text-white">
      <div className="text-4xl">Aeroleads Blogs</div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-108 py-3 text-white border-2 border-white/50 rounded-2xl px-4"
        placeholder="Enter Prompt"
      />

      <button
        onClick={onSubmit}
        className="w-32 h-12 px-4 py-3 text-black bg-white rounded-2xl hover:cursor-pointer disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>

      {loading && (
        <div className="flex justify-center items-center mt-8 gap-2 text-white/70">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Generating blogs...</span>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="flex flex-col gap-4 mt-8 w-108">
          <div className="mb-2 text-xl font-semibold">Generated Blogs:</div>
          {blogs.map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${blog.slug}`}
              className="p-4 border border-white/30 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <div className="text-base font-medium text-white">
                {blog.title}
              </div>
              <div className="text-sm text-white/60">{blog.slug}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
