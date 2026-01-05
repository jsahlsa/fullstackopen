const blogListRouter = require('express').Router()
const BlogList = require('../models/bloglist.js')

blogListRouter.get('/', async (request, response, next) => {
    const blogs = await BlogList.find({})
    response.json(blogs)
})

blogListRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new BlogList({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
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
