import React from 'react'

const Recommendation = ({ show, result, fav }) => {
	if( !show ) {
		return null
	}

	if( result.loading || fav.loading ) {
		return (
			<div>
				Loading...
			</div>
		)
	}

	const genre = fav.data.me.favoriteGenre
	let books = result.data.allBooks

	books = books.filter( b => b.genres.includes( genre ) )
	return (
		<div>
			<h2> Recommendation </h2>
			<hr/>
			<p> books in your favorite genre: <strong> { genre } </strong> </p>
		
			<table>
				<thead>
					<tr>
						<th></th>
						<th> author </th>
						<th> published </th>
					</tr>
				</thead>
				<tbody>
					{ books.map( b =>
						<tr key = { b.title } >
							<td> { b.title } </td>
							<td> { b.author.name } </td>
							<td> { b.published } </td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Recommendation