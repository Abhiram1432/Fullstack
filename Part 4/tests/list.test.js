const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const result = listHelper.dummy([])
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})

	test('when list has only one element', () => {
		const listWithOneBlog = [
			{
				id: '7slmasdb1u2831f',
				title: 'Go To Statement considered harmful',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 5
			}
		]

		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when list is larger', () => {
		const listLonger = [
			{
				id: '7slmasdb1u2831f',
				title: 'Go To Statement considered harmful',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 5
			}
		]

		listLonger.push(listLonger[0])

		const result = listHelper.totalLikes(listLonger)
		expect(result).toBe(10)
	})
})

describe('Favorite Blog', () => {
	test('when parameter passed was empty array', () => {
		expect( listHelper.favoriteBlog([]) ).toEqual({})
	})
	
	test('when single entry', () => {
		const listWithOneBlog = [
			{
				id: '7slmasdb1u2831f',
				title: 'Canonical string reduction',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 5
			}
		]
	
		const expectedOutput = {
			title: 'Canonical string reduction',
			author: 'Edgar W. Djikshta',
			likes: 5
		}
	
		const result = listHelper.favoriteBlog(listWithOneBlog)
		expect(result).toEqual(expectedOutput)
	})
})

describe('most blogs', () => {
	test('should return empty object when array length is zero', () => {
		expect(listHelper.mostBlogs([])).toEqual({})
	})

	test('when list is longer', () => {
		const list = [
			{
				id: '019knxkanaksskn19782wyeuqwg',
				title: 'Why is happening',
				author: 'Parshva Barbhaya',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 10
			},
			{
				id: '7slmasdb1u2831f',
				title: 'Canonical string reduction',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 5
			},
			{
				id: '182aaxacbhas128ds',
				title: 'What is happening',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 12
			}
		]

		const output = {
			author: 'Edgar W. Djikshta',
			blogs: 2
		}

		expect(listHelper.mostBlogs(list)).toEqual(output)
	})
})

describe('most likes', () => {
	test('When array is empty', () => {
		expect(listHelper.mostLikes([])).toEqual({})
	})

	test('multiple entries', () => {
		const list = [
			{
				id: '019knxkanaksskn19782wyeuqwg',
				title: 'Why is happening',
				author: 'Parshva Barbhaya',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 10
			},
			{
				id: '7slmasdb1u2831f',
				title: 'Canonical string reduction',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 5
			},
			{
				id: '182aaxacbhas128ds',
				title: 'What is happening',
				author: 'Edgar W. Djikshta',
				url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
				likes: 12
			}
		]
	
		const output = {
			author: 'Edgar W. Djikshta',
			likes: 12
		}

		expect( listHelper.mostLikes(list)).toEqual(output)
	})
})