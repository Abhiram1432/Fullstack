import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

import NewComment from './NewComment'

const Blog = ({ blog, likeBlog, postComment }) => {
	return (
		<div>
			<h2> { blog.title } { blog.author } </h2>
			<a href = { blog.url } > { blog.url } </a>
			<div>
				{ blog.likes } likes
				<Button onClick = { () => likeBlog(blog) } style = { { margin: 5 } } >
					<Icon name = 'like' />
				</Button>
			</div>
			<div> added by <strong> { blog.user.name } </strong> </div>

			<h3> comments </h3>

			<NewComment id = {blog.id} postComment = { postComment } />

			<div style = { { padding: 14 } } >
				{/* eslint-disable */}
				{ !blog.hasOwnProperty('comments') ? null
					: <div>
						<List bulleted >
							{ blog.comments.map( b =>
								<List.Item key = { b.id } > { b } </List.Item>
							) }
						</List>
					</div> }
			</div>
		</div>
	)
}

export default Blog