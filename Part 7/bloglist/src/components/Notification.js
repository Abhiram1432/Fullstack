import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	if (props.notification === null) {
		return null
	}

	const style = {
		color: props.notification.type === 'error' ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	return (
		<div style={style}>
			{props.notification.message}
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
	null
)(Notification)