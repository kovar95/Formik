
class Communicators {

	
	static omdbURL = 'https://www.omdbapi.com/?type=movie&apikey=2d2c144c';

	static Fetch = searchedTerm => {
		return fetch(`${Communicators.omdbURL}&s=${searchedTerm}`)
	  		   .then( response => response.json())
	}
	
}

export { Communicators };