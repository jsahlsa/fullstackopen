const BlogList = require('../models/bloglist')

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

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}
