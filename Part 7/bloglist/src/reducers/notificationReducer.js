const reducer = ( state = null, action ) => {
	switch( action.type ) {
	case 'SET':
		return action.data
	case 'CLEAR':
		return null
	default:
		return state
	}
}

export const setNotification = ( message, color, time ) => {
	return dispatch => {
		setTimeout( () => dispatch(clearNotification()), time * 1000 )
		dispatch({
			type: 'SET',
			data: { message, type: color }
		})
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR'
	}
}

export default reducer