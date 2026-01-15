import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            console.log(user)
            setMessage(['success', `${user.name} was logged in`])
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } catch {
            console.error('could not get user')
            setMessage(['error', 'wrong username or password'])
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleBlogAdd = (newBlog) => {
        try {
            blogFormRef.current.toggleVisibility()
            blogService.create(newBlog)
            setMessage(['success', `${newBlog.title} added to blogs`])
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } catch (error) {
            console.error(error)
            setMessage(['error', `error adding ${newBlog.title} to blogs`])
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    const handleLike = (newBlog, id) => {
        try {
            console.log('in App component', newBlog)
            blogService.like(newBlog, id)
        } catch (error) {
            console.error(error, 'error liking blog')
        }
    }

    return (
        <>
            <Notification message={message} />
            <h2>Blogs</h2>

            {!user &&
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            </Togglable>}
            {user &&
                <>
                    <p>{user.name} is logged in</p>

                    <button onClick={handleLogout}>logout</button>
                </>}
            {user &&
                <Togglable buttonLabel='create blog' ref={blogFormRef}>
                    <BlogForm handleBlogAdd={handleBlogAdd} />

                </Togglable>}

            {user && <Blogs
                blogs={blogs}
                user={user}
                handleLogout={handleLogout}
                handleLike={handleLike}
            />}
        </>
    )
}

export default App
