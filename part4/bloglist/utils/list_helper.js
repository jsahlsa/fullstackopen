const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, post) => {
        return sum + post.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
    const authorCountObj = makeCountsOfKey(blogs, 'author')
    const highestValue = getHighestObjectValue(authorCountObj)
    const keyOfHighestValue = getKeyOfHighestValue(authorCountObj, highestValue)
    return keyOfHighestValue
}

const mostLikes = (blogs) => {
    const likesObject = makeLikesObject(blogs, 'author', 'likes')
    const highestLikes = getHighestLikes(likesObject)
    const objectWithHighestLikes = getObjectMostLikes(likesObject, highestLikes)
    console.log(objectWithHighestLikes)
    return objectWithHighestLikes
}

// helper functions
//
const getObjectMostLikes = (arr, val) => {
    return arr.find(n => n.likes === val)
}
//
const getHighestLikes = (arr) => {
    return Math.max(...arr.map(n => n.likes))

}
//
// Create object that looks up first param and tallies second param, returns arrray of objects
const makeLikesObject = (obj, lookup, tally) => {
    const reducer = (acc, item) => {
        if (!acc.find(n => n.author === item.author)) {
            const newPerson = {
                author: item.author,
                likes: item.likes
            }

            acc.push(newPerson)
        } else {
            const index = acc.findIndex(n => n.author === item.author)
            acc[index].likes += item.likes
        }

        return acc
    }
    const authorLikesSums = obj.reduce(reducer, [])
    return authorLikesSums
}


// Get counts of keys value based on how many times it occurs in object
const makeCountsOfKey = (obj, key) => {
    const reducer = (acc, item) => {
        acc[item[key]] = (acc[item[key]] || 0) + 1
        return acc
    }
    const authorCounts = obj.reduce(reducer, {});
    return authorCounts
}

// gets highest value in object of objects
const getHighestObjectValue = (obj) => {
    return Math.max(...Object.values(obj))
}

// get key of highest value
const getKeyOfHighestValue = (obj, val) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value === val) {
            return key
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
