const _ = require('lodash')

const dummy = (blogs) => {
	if(Array.isArray(blogs)) return 1
	return 0
}

const totalLikes = (blogs) => {
	const reducer = ( sum, item ) => {
		return sum + item.likes
	}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	if(Array.isArray(blogs) && blogs.length > 0 ) {
		let cBlogs = blogs.map( b => b.likes)
		const maxValue = Math.max(...cBlogs)
		let unpack = blogs
			.find( b => b.likes === maxValue)
		return (({author, title, likes}) => ({author, title, likes}))(unpack)
	}
	else return {}
}

const mostBlogs = (blogs) => {
	let counts = _.countBy(blogs, (blog) => {
		return blog.author
	})

	let sortCounts = Object.keys(counts)
		.sort( function (a, b) { return counts[b] - counts[a] })
	
	return {
		author: sortCounts[0],
		blogs: counts[sortCounts[0]]
	}
}

const mostLikes = (blogs) => {
	if( Array.isArray(blogs) && blogs.length > 0) {
		let counts = _.sortBy(blogs, 'likes').reverse()

		return {
			author: counts[0].author,
			likes: counts[0].likes
		}
	}
	else return {}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}