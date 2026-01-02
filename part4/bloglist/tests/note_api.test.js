const assert = require('node:assert')
const {
    test,
    after,
    beforeEach
} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const BlogList = require('../models/bloglist')

const api = supertest(app)

beforeEach(async () => {
    await BlogList.deleteMany({})

    let blogObject = new BlogList(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new BlogList(helper.initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a spocific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Fairplay app'), true)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
        "likes": 11,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Programming principles for self taught front-end developers'))
})

after(async () => {
    await mongoose.connection.close()
})
