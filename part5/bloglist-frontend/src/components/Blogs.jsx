import Blog from './Blog'

const Blogs = ({ blogs, user, handleLogout }) => {


    return (
        <>
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            <h2>Blogs</h2>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Blogs
