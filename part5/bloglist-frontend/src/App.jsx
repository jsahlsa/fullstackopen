import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
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
        } catch {
            console.error('could not get user')
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

        blogService.create(newBlog)
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
            {!user && loginForm()}
            {user && <Blogs blogs={blogs} user={user} handleLogout={handleLogout} handleBlogAdd={handleBlogAdd} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />}
        </>
    )
}

export default App
