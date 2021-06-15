import React, { useState, useEffect } from 'react'

const Books = ({ show, result }) => {
	const [genres, setGenres] = useState([])
	const [ filter, setFilter ] = useState('')
	const books = result.data.allBooks

	useEffect( () => {
		if( books ) {
			books.forEach( book => {
				book.genres.forEach( genre => {
					if( !genres.includes( genre ) ) setGenres(genres.concat(genre))
				})
			})
		}
	}, [books, genres])

	if (!show) {
		return null
	}
	if( result.loading ) {
		return (
			<div>
				Loading...
			</div>
		)
	}

	let booksToShow = books
	if( filter !== '' ) {
		booksToShow = booksToShow.filter( b => b.genres.includes(filter) )
	}
	if( filter === '' ) booksToShow = books

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							author
						</th>
						<th>
							published
						</th>
					</tr>
					{booksToShow.map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>

			{genres.map( genre => 
				<button onClick = { () => setFilter( genre ) } > { genre } </button>
			)}
			<button onClick = { () => setFilter('') } > all genres </button>

		</div>
	)
}

export default Books