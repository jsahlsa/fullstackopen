const assert = require('node:assert')
const {
    test,
    after,
    beforeEach,
    describe
} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const BlogList = require('../models/bloglist')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await BlogList.deleteMany({})
    await BlogList.insertMany(helper.initialBlogs)
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

test('id comes back as id and not _id', async () => {
    const blogs = await helper.blogsInDb()
    const keys = Object.keys(blogs[0])
    assert(keys.includes('id'))
})

test('post without likes defaults to 0', async () => {
    const newBlog = {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('blog without title is not added', async () => {
    const newBlog = {
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog without url is not added', async () => {
    const newBlog = {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
    const newLikes = 67
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = newLikes

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[0].likes, newLikes)
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'joe sahlsa',
            name: 'joe',
            password: 'nunya',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper status code and message if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'superuser',
            password: 'superman',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('check username for appropriate lenth', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jo',
            name: 'jo jo',
            password: 'hohoho',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('check password for appropriate lenth', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'joey',
            name: 'jo jo',
            password: 'ho',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
