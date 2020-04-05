import * as actionTypes from './ActionTypes';

const initialState = {
	data : [],
}

const reducer = (state = initialState, action) => {

	switch(action.type) {

		case actionTypes.DATA_UPDATE :
			return {
				...state,
				data: action.data
			};
	
		default : return state;
	}
}

export { reducer }