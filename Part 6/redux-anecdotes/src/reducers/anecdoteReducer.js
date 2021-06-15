import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
	switch( action.type ) {
		case 'NEW_ANECDOTE':
			return [...state, action.data]
		case 'INIT_STATE':
			return action.data
		case 'INCREMENT_VOTES':
			const id = action.data.id
			const anecdoteToChange = state.find( n => n.id === id )
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			}
			return state.map( anec =>
				anec.id !== id ? anec : changedAnecdote
			)
		default:
			return state
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.postNew( content )
		dispatch ({
			type: 'NEW_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const incrementVotes = (id) => {
	return async dispatch => {
		await anecdoteService.voteStory( id )
		dispatch ({
			type: 'INCREMENT_VOTES',
			data: {id}
		})
	}
}

export const initialization = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch ({
			type: 'INIT_STATE',
			data: anecdotes
		})
	}
}

export default reducer