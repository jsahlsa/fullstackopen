import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

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

    const handleBlogAdd = (e) => {
        e.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        try {
            blogService.create(newBlog)
            setMessage(['success', `${title} added to blogs`])
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } catch (error) {
            console.error(error)
            setMessage(['error', `error adding ${title} to blogs`])
        }
    }

    const loginForm = () => (
        <>
            <h2>
                Login
            </h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>username
                        <input
                            type='text'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type='password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />

                    </label>
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )

    return (
        <>
            <Notification message={message} />
            {!user && loginForm()}
            {user && <Blogs blogs={blogs} user={user} handleLogout={handleLogout} handleBlogAdd={handleBlogAdd} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />}
        </>
    )
}

export default App
