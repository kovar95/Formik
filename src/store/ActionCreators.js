import * as actionTypes from './ActionTypes';
import {Communicators} from '../Communicators';

const formatData = myData => {
	const data = [];
	for(const property in myData) {
		data.push({
			...myData[property],
			id: property,
		});
	}

	return data
}

const sortData = (dataA, dataB) =>{
    const orderA = dataA.order;
    const orderB = dataB.order;

    let comparison = 0;
    if (orderA > orderB) {
      comparison = 1;
    } else if (orderA < orderB) {
      comparison = -1;
    }

    return comparison;
  }

const update = data => {
	return {
		type: actionTypes.DATA_UPDATE,
		data: data
	}
}

export const updateData = searchedTerm => {
	return dispatch => {
		Communicators.Fetch(searchedTerm)
	    .then( myJson =>  {
	        if (myJson.Response === "True") {
	        	dispatch(update(myJson.Search));
	        } else {
	        	dispatch(update([]));
	        }
	      })
	    .catch( error => alert(`Error: ${error}`));
	}
}
