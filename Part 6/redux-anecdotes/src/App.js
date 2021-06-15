import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import anecdoteService from './services/anecdotes'
import { initialization } from './reducers/anecdoteReducer'

const App = (props) => {
	useEffect( () => {
		anecdoteService.getAll().then( notes => 
			props.initialization( notes )
		)
	})

	return (
		<div>
			<Notification />
			<Filter />
			<hr />
			<AnecdoteList />
			<hr />
			<AnecdoteForm />
		</div>
	)
}

export default connect( null, { initialization })(App)