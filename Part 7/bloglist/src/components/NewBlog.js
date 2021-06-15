import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Form, Button, Divider, Header, Container } from 'semantic-ui-react'

import { createBlog } from '../reducers/blogReducer'

const NewBlog = (props) => {
	const [title, titleReset] = useField('text')
	const [author, authorReset] = useField('text')
	const [url, urlReset] = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		await props.createBlog({
			title: title.value,
			author: author.value,
			url: url.value,
			user: props.user
		})
		titleReset()
		authorReset()
		urlReset()
	}

	return (
		<div>
			<Header size = "medium" >create new</Header>

			<Container>
				<Form onSubmit={handleSubmit}>
					<Form.Field>
						<label> Title: </label>
						<input {...title} placeholder = 'Title' data-cy="title" />
					</Form.Field>
					<Form.Field>
						<label> Author: </label>
						<input {...author} placeholder = 'Author' id = 'author' />
					</Form.Field>
					<Form.Field>
						<label> URL: </label>
						<input {...url} placeholder = 'URL' id = 'url' />
					</Form.Field>
					<Button primary type='submit'>create</Button>
				</Form>

				<Divider />
			</Container>
		</div>
	)
}

const mapStateToProps = ( state ) => {
	return {
		blogs: state.blogs,
		user: state.user,
		notification: state.notification
	}
}

export default connect(
	mapStateToProps,
	{ createBlog }
)(NewBlog)