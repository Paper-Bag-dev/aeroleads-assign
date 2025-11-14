import { Link } from "react-router";
import type { BlogInterface } from "../App";

interface BlogPageProps {
  blog: BlogInterface;
}

function BlogPage({ blog }: BlogPageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-white bg-black min-h-screen">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
          {blog.content}
        </p>
        <Link to="/blogs" className="inline-block mt-8 text-blue-400">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogPage;
