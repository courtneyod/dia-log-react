const URL = "http://localhost:8000/"
const EMAIL = 'courtney.od@gmail.com'

function getPhotoList(){
	const REQUEST_URL = `${URL}/photos?email=${EMAIL}`

	return fetch(REQUEST_URL, {'mode': 'no-cors'})
		.then((forJSON)=>{
			console.log(forJSON, 'this is the json back')
			return forJSON.json()
		}).then((data)=>{
			console.log(data, 'this is in teh ap call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function logIn(obj){
	
}

export default {getPhotoList, logIn}
