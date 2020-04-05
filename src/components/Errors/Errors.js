import React from 'react';
import './Errors.scss';


const Errors = ({touched, message}) => {

	if (!touched) {
		return <div className="invalid message"> &nbsp; </div>
	}
	if (message) {
		return <div className="invalid message"> {message} </div>
	}
	return <div> &nbsp; </div>
}

export {Errors};