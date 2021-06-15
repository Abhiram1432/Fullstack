import React from 'react'
import { connect } from 'react-redux'

import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const List = ({anecdote, handleClick}) => {
	return (
		<>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick = { handleClick } > vote </button>
			</div>
			<hr />
		</>
	)
}

const clickHandler = ( props, anecdote ) => {
	const message = `You voted for '${anecdote.content}'`
	props.setNotification( message, 5 )
	props.incrementVotes( anecdote.id )
}

const Listing = (props) => {
	return (
		<>
			<h2>Anecdotes</h2>
			{props.anecdotesLeft
				.sort( ( a, b ) => b.votes - a.votes )
				.map(anecdote =>
				<List 
					anecdote = { anecdote }
					key = { anecdote.id }
					handleClick = { () => clickHandler( props, anecdote ) }
				/>
			)}
		</>
	)
}

const anecdotesToShow = (anecdotes, filter) => {
	return anecdotes.filter(
		anecdote => anecdote.content.includes(filter)
	)
}

const mapStateToProps = ( state ) => {
	return {
		anecdotesLeft: anecdotesToShow(state.anecdotes, state.filter),
		filter: state.filter,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	incrementVotes,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Listing)