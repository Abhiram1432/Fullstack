import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get( baseUrl )
	return response.data
}

const postNew = async content => {
	const object = { content, votes: 0 }
	const response = await axios.post( baseUrl, object )
	return response.data
}

const voteStory = async ( id ) => {
	let anecdotes = await axios.get( baseUrl )
	anecdotes = anecdotes.data
	const anecdote = anecdotes.find( a => a.id === id )
	const object = { ...anecdote, votes: anecdote.votes + 1 }
	const response = await axios.put( `${baseUrl}/${anecdote.id}`, object )
	return response.data
}

export default {
	getAll,
	postNew,
	voteStory
}