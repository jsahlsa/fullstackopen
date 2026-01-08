import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
    return (
        <>
            <p>{user.name} is logged in</p>
            <h2>Blogs</h2>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Blogs
