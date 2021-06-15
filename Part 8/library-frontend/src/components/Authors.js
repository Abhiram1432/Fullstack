import React, { useState } from 'react'

const Authors = ({ show, result, setYear }) => {
	const [ name, setName ] = useState('')
	const [ born, setBorn ] = useState('')

	if (!show) return null

	if( result.loading ) {
		return (
			<div> Loading... </div>
		)
	}
	const authors = result.data.allAuthors

	const options = authors.map( a => {
		return {
			value: a.name,
			label: a.name
		}
	})
	const submit = async e => {
		e.preventDefault()

		await setYear({
			variables: { name, born: parseInt(born) }
		})

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							born
						</th>
						<th>
							books
						</th>
					</tr>
					{authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>

			<h2> Set birthyear </h2>
			<form onSubmit = { submit } >
				<select onChange = { ({ target }) => setName(target.value) } >
					{ options.map( o => 
						<option key = { o.value } value = { o.value } > { o.label } </option>
					)}
				</select>
				<div>
					born
					<input
						value = { born }
						onChange = { ({target}) => setBorn( target.value ) }
					/>
				</div>
				<button type = "submit" > update author </button>
			</form>
		</div>
	)
}

export default Authors