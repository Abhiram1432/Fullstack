import React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { useField } from '../hooks'

const NewComment = ({ id, postComment }) => {
	const [ text, textReset ] = useField('text')

	const handleNewComment = async (event) => {
		event.preventDefault()
		const obj = {
			id,
			text
		}
		await postComment( obj )
		textReset()
	}

	return (
		<div>
			<Form onSubmit = { handleNewComment } >
				<div>
					<Form.Group inline>
						<input {...text} placeholder = 'Comment...' fluid />
						<Button type = "submit" primary > Add </Button>
					</Form.Group>
				</div>
			</Form>
		</div>
	)
}

export default NewComment