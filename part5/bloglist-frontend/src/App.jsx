import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            setUsername('')
            setPassword('')
            console.log(user)
        } catch {
            console.error('could not get user')
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
            {!user && loginForm()}
            {user && <Blogs blogs={blogs} user={user} />}
        </>
    )
}

export default App
