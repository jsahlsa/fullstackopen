import Blog from './Blog'

const Blogs = ({ blogs, user, handleLike }) => {

    return (
        <>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
            )}
        </>
    )
}

export default Blogs
