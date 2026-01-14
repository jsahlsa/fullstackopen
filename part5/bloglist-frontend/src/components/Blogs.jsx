import Blog from './Blog'

const Blogs = ({ blogs, user }) => {


    return (
        <>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default Blogs
