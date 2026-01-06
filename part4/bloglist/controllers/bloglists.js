const blogListRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const BlogList = require('../models/bloglist')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogListRouter.get('/', async (request, response, next) => {
    const blogs = await BlogList.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(blogs)
})

blogListRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token invalid'
        })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({
            error: 'user does not exist'
        })
    }

    const blog = new BlogList({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogListRouter.delete('/:id', async (request, response, next) => {
    await BlogList.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogListRouter.put('/:id', async (request, response, next) => {
    const {
        title,
        author,
        url,
        likes
    } = request.body

    const blog = await BlogList.findById(request.params.id)

    blog.likes = likes
    blog.title = title
    blog.author = author
    blog.url = url

    const savedBlog = await blog.save()
    response.status(200).json(savedBlog)
})

module.exports = blogListRouter
