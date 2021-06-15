const reducer = ( state = null, action ) => {
	switch( action.type ) {
	case 'LOGIN':
		return action.data
	case 'LOGOUT':
		return null
	case 'GET_USER':
		return state
	default:
		return state
	}
}

export const loginUser = ( user ) => {
	return {
		type: 'LOGIN',
		data: user
	}
}

export const logout = () => {
	return {
		type: 'LOGOUT'
	}
}

export const getCurrentUser = () => {
	return {
		type: 'GET_USER',
	}
}

export default reducer