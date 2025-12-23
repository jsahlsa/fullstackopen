const {
    test,
    describe
} = require('node:test')
const assert = require('node:assert')

const {
    totalLikes,
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes
} = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        assert.strictEqual(dummy([]), 1)
    })
})

describe('total likes', () => {

    test('of empty list is 0', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const listWithOneBlog = [{
            "title": "Fairplay app",
            "author": "Joe Sahlsa",
            "url": "https://joesahlsa.dev/blog/fairplay-app/",
            "likes": 3,
            "id": "69449e4da2a3a8836d1a61b1"
        }]

        assert.strictEqual(totalLikes(listWithOneBlog), 3)
    })

    test('of a bigger list is calculated right', () => {
        const listWithAllBlogs = [{
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
        }, {
            "title": "Wrapping up 2025",
            "author": "Andy Bell",
            "url": "https://piccalil.li/blog/wrapping-up-2025/",
            "likes": 4,
            "id": "6945b2c0a2a3a8836d1a61b6"
        }, {
            "title": "Programming principles for self taught front-end developers",
            "author": "Kilian Valkhof",
            "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
            "likes": 11,
            "id": "6945b2ffa2a3a8836d1a61b8"
        }, {
            "title": "Brand New Layouts with CSS Subgrid",
            "author": "Josh Comeau",
            "url": "https://www.joshwcomeau.com/css/subgrid/",
            "likes": 7,
            "id": "6945b32da2a3a8836d1a61ba"
        }, {
            "title": "An Interactive Guide to SVG Paths",
            "author": "Josh Comeau",
            "url": "https://www.joshwcomeau.com/svg/interactive-guide-to-paths/",
            "likes": 2,
            "id": "6945b35ba2a3a8836d1a61bc"
        }]

        assert.strictEqual(totalLikes(listWithAllBlogs), 28)
    })
})

describe('favorite blog', () => {
    const listWithAllBlogs = [{
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
    }, {
        "title": "Wrapping up 2025",
        "author": "Andy Bell",
        "url": "https://piccalil.li/blog/wrapping-up-2025/",
        "likes": 4,
        "id": "6945b2c0a2a3a8836d1a61b6"
    }, {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
        "likes": 11,
        "id": "6945b2ffa2a3a8836d1a61b8"
    }, {
        "title": "Brand New Layouts with CSS Subgrid",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/css/subgrid/",
        "likes": 7,
        "id": "6945b32da2a3a8836d1a61ba"
    }, {
        "title": "An Interactive Guide to SVG Paths",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/svg/interactive-guide-to-paths/",
        "likes": 2,
        "id": "6945b35ba2a3a8836d1a61bc"
    }]

    const blogWithMost = {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
        "likes": 11,
        "id": "6945b2ffa2a3a8836d1a61b8"
    }


    test('returns favorite blog', () => {
        assert.deepStrictEqual(favoriteBlog(listWithAllBlogs), blogWithMost)
    })
})

describe('most blogs', () => {
    const listWithAllBlogs = [{
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
    }, {
        "title": "Wrapping up 2025",
        "author": "Andy Bell",
        "url": "https://piccalil.li/blog/wrapping-up-2025/",
        "likes": 4,
        "id": "6945b2c0a2a3a8836d1a61b6"
    }, {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
        "likes": 11,
        "id": "6945b2ffa2a3a8836d1a61b8"
    }, {
        "title": "Brand New Layouts with CSS Subgrid",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/css/subgrid/",
        "likes": 7,
        "id": "6945b32da2a3a8836d1a61ba"
    }, {
        "title": "An Interactive Guide to SVG Paths",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/svg/interactive-guide-to-paths/",
        "likes": 2,
        "id": "6945b35ba2a3a8836d1a61bc"
    }]

    test('author with most blogs', () => {
        assert.strictEqual(mostBlogs(listWithAllBlogs), 'Joe Sahlsa')
    })
})

describe('most likes', () => {
    const listWithAllBlogs = [{
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
    }, {
        "title": "Wrapping up 2025",
        "author": "Andy Bell",
        "url": "https://piccalil.li/blog/wrapping-up-2025/",
        "likes": 4,
        "id": "6945b2c0a2a3a8836d1a61b6"
    }, {
        "title": "Programming principles for self taught front-end developers",
        "author": "Kilian Valkhof",
        "url": "https://piccalil.li/blog/programming-principles-for-self-taught-front-end-developers/",
        "likes": 11,
        "id": "6945b2ffa2a3a8836d1a61b8"
    }, {
        "title": "Brand New Layouts with CSS Subgrid",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/css/subgrid/",
        "likes": 7,
        "id": "6945b32da2a3a8836d1a61ba"
    }, {
        "title": "An Interactive Guide to SVG Paths",
        "author": "Josh Comeau",
        "url": "https://www.joshwcomeau.com/svg/interactive-guide-to-paths/",
        "likes": 55,
        "id": "6945b35ba2a3a8836d1a61bc"
    }]

    const authorMostLikes = {
        author: 'Josh Comeau',
        likes: 62
    }

    test('author with most likes', () => {
        assert.deepStrictEqual(mostLikes(listWithAllBlogs), authorMostLikes)
    })
})
