import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const handleDetails = () => {
        setVisible(!visible)
    }

    const handleAddLike = () => {

        const newLikes = likes + 1
        setLikes(newLikes)
        console.log(blog.id, 'blog in blog')

        handleLike({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: newLikes,
        }, blog.id)
    }

    const blogStyle = {
        border: 'solid',
        borderWidth: 1,
        borderColor: 'teal',
        padding: '0.5rem',
        marginBottom: '0.2rem'
    }

    return (
        <li style={blogStyle}>
            {blog.title} {blog.author}<button style={{ marginLeft: 7 }} onClick={handleDetails}>{visible ? 'hide' : 'view'}</button>
            {visible &&
            <>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>likes {likes}<button onClick={handleAddLike} style={{ marginLeft: 7 }}>like</button></p>
                <p>{blog?.user?.name}</p>
            </>
            }
        </li>
    )
}

export default Blog
