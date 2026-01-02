const blogListRouter = require('express').Router()
const BlogList = require('../models/bloglist.js')

blogListRouter.get('/', async (request, response, next) => {
    const blogs = await BlogList.find({})
    response.json(blogs)
})

blogListRouter.post('/', (request, response, next) => {
    const blog = new BlogList(request.body)

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogListRouter
