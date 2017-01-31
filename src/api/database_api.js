const URL = "http://localhost:8000"
const EMAIL = 'courtney.od@gmail.com'

function getPhotoList(){
	const REQUEST_URL = `${URL}/photos?email=${EMAIL}`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is in teh ap call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function getCategoriesList(id){
	const REQUEST_URL = `${URL}/categories/${id}`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			console.log(forJSON, 'this is the json back')
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is in teh ap call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function googleAuth(){
	const REQUEST_URL = `${URL}/auth/google`

	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default'
		   };

   	return fetch(REQUEST_URL, myInit)
	   .then((forJSON)=>{
		   // console.log(forJSON, 'this is the json back from sign up')
		   return forJSON.json()
	   })
	   .then((data)=>{
		   console.log("hello?????")
		   console.log(data, 'this is in data from google auth')
		   return data
	   }).catch(function(err) {
		   console.log('Fetch Error :-S', err);
		   });
}

function signUp(obj){
	// console.log(obj, 'this is the obj in sign up api')
	const email = obj.email
	const password = obj.password
	const firstName = obj.firstName

	const REQUEST_URL = `${URL}/signup?email=${email}&password=${password}&firstName=${firstName}`

	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'POST');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'POST',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default'
		   };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			// console.log(forJSON, 'this is the json back from sign up')
			return forJSON.json()
		})
		.then((data)=>{
			// console.log("hello?????")
			// console.log(data, 'this is in data from sign up call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function login(obj){
	const email = obj.email
	const password = obj.password

	const REQUEST_URL = `${URL}/login?email=${email}&password=${password}`

	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'POST');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'POST',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default'
		   };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			// console.log(forJSON, 'this is the json back from sign up')
			return forJSON.json()
		})
		.then((data)=>{
			console.log("hello?????")
			console.log(data, 'this is in data from loogin up call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

export default {googleAuth, getPhotoList, login, signUp}
