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

module.exports = blogListRouter
