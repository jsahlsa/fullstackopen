import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, user, handleLogout, handleBlogAdd, title, setTitle, author, setAuthor, url, setUrl }) => {


    return (
        <>
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            <h2>Blogs</h2>
            <h2>create new</h2>
            <BlogForm handleBlogAdd={handleBlogAdd} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Blogs
