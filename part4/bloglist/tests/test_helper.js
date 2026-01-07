const BlogList = require('../models/bloglist')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [{
    "title": "Fairplay app",
    "author": "Joe Sahlsa",
    "url": "https://joesahlsa.dev/blog/fairplay-app/",
    "likes": 3,
    "id": "69449e4da2a3a8836d1a61b1"
}, {
    "title": "Custom language syntax highlighting",
    "author": "Joe Sahlsa",
    "url": "https://joesahlsa.dev/blog/custom-language-syntax-highlighting/",
    "likes": 1,
    "id": "69449e75a2a3a8836d1a61b3"
}]

const nonExistingId = async () => {
    const blog = new BlogList({
        title: 'willremovethissoon'
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await BlogList.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const getToken = async () => {
    const username = 'root'
    const password = 'sekret'

    const user = await User.findOne({
        username
    })

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    getToken
}
