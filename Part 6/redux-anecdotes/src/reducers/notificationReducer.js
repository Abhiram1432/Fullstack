const reducer = ( state = null, action ) => {
    switch( action.type ) {
        case 'ALERT':
            return action.data
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const setNotification = ( message, time ) => {
	return dispatch => {
		dispatch({
			type: 'ALERT',
			data: message
		})
		setTimeout( () => {
			dispatch(clearNotification())
		}, time * 1000 )
	}
}

const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default reducer