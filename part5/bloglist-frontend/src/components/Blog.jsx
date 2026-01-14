import { useState } from "react"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const handleDetails = () => {
        setVisible(!visible)
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
                <p>likes {blog.likes}<button style={{ marginLeft: 7 }}>like</button></p>
                <p>{blog?.user?.name}</p>
            </>
            }
        </li>
    )
}

export default Blog
