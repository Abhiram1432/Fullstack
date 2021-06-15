import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const GET_AUTHORS = gql`
	{
		allAuthors {
			name,
			born,
			bookCount
		}
	}
`

const GET_BOOKS = gql`
	{
		allBooks {
			title,
			published,
			genres,
			author {
				name,
				born,
				bookCount
			}
		}
	}
`

const ME = gql`
	{
		me {
			username
			favoriteGenre
		}
	}
`

const NEW_BOOK = gql`
	mutation newBook ( $title: String!, $author: String!, $genres: [String!]!, 
		$published: Int!, $born: Int ) {
		addBook (
			title: $title,
			author: $author,
			genres: $genres,
			published: $published,
			born: $born
		) {
			title
			genres
			published
			author {
				name,
				born
			}
		}
	}
`

const SET_YEAR = gql`
	mutation setYear ( $name: String!, $born: Int! ) {
		editAuthor (
			name: $name,
			setBornTo: $born
		) {
			name,
			born,
			bookCount
		}
	}
`

const LOGIN = gql`
	mutation login( $username: String!, $password: String! ) {
		login (username: $username, password: $password) {
			value
		}
	}
`

const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			title,
			genres,
			published,
			author {
				name,
				born
			}
		}
	}
`

const App = () => {
	const client = useApolloClient()

	const [page, setPage] = useState('authors')
	const [ errorMessage, setErrorMessage ] = useState('')
	const [ token, setToken ] = useState(null)

	useEffect( () => {
		const user = localStorage.getItem('phonenumbers-user-token')
		if( user ) {
			setToken(user)
		}
	}, [setToken])

	const handleError = (error) => {
		setErrorMessage(error.graphQLErrors[0].message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	const user = useQuery( ME )
	const authors = useQuery( GET_AUTHORS )
	const books = useQuery( GET_BOOKS )
	const [newBook] = useMutation( NEW_BOOK, {
		refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }]
	})
	const [setYear] = useMutation( SET_YEAR, {
		refetchQueries: [{ query: GET_AUTHORS }]
	})
	const [login] = useMutation( LOGIN, {
		onError: handleError
	})

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			console.log( subscriptionData )
		}
	})

	const ifLogged = () => {
		return (
			<>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick = { () => setPage('recommend') } > recommend </button>
				<button onClick = { () => logout() } > logout </button>
			</>
		)
	}

	const errorNotification = () => errorMessage &&
		<div style = {{color: 'red'}} >
			{ errorMessage }
		</div>

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{ token ? ifLogged(): <button onClick = { () => setPage('login') } > login </button> }
			</div>

			<hr />

			<Authors
				show={page === 'authors'}
				result = { authors }
				setYear = { setYear }
			/>

			<Books
				show={page === 'books'}
				result = { books }
			/>

			<NewBook
				show={page === 'add'}
				result = { newBook }
			/>

			<LoginForm
				show = { page === 'login' }
				login = { login }
				setToken = { (token) => setToken(token) }
				setPage = { setPage }
			/>

			<Recommendation
				show = { page === 'recommend' }
				result = { books }
				fav = { user }
			/>

		</div>
	)
}

export default App