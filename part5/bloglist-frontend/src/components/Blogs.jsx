import Blog from './Blog'

const Blogs = ({ blogs, user, handleLike, deleteOne }) => {

  return (
    <>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} user={user?.id} handleLike={handleLike} deleteOne={deleteOne} />
      )}
    </>
  )
}

export default Blogs
