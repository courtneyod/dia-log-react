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
			// console.log(data, 'this is the list of photos')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function getCatergiesId(photoId){
	const REQUEST_URL = `${URL}/health-stat-categories/${photoId}`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			// console.log(forJSON, 'this is the json back')
			return forJSON.json()
		})
		.then((data)=>{
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}
function getCatergiesNames(photoId){
	const REQUEST_URL = `${URL}/health-stat-categories/name/${photoId}`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			// console.log(forJSON, 'this is the json back')
			return forJSON.json()
		})
		.then((data)=>{
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function getAllCatergies(){
	const REQUEST_URL = `${URL}/categories/`
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
		   return forJSON.json()
	   })
	   .then((data)=>{
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
			return forJSON.json()
		})
		.then((data)=>{
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

function postNewPhoto(obj){
	console.log(obj, 'about tot send this obj')

	// const REQUEST_URL = `${URL}/photos?email=${email}&password=${password}`
	const REQUEST_URL = `${URL}/photos`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'POST');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json');

	var myInit = { method: 'POST',
			   body: JSON.stringify(obj),
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is the post')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function aws(obj){
	const REQUEST_URL = `${URL}/aws`
	var myHeaders = new Headers();
	var jsonObj = JSON.stringify(obj)

	var formData = new FormData();
	formData.append("file", obj);

	myHeaders.append('Access-Control-Request-Method', 'POST');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Accept', 'application/json')
	// myHeaders.append("Content-Type","multipart/form-data");

	var myInit = { method: 'POST',
			   body: formData,
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is the aws')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}
function fetchAwsPhoto(obj){
	var name = 'GOPR0526.JPG'
	var type = 'image/jpeg'
	const REQUEST_URL = `${URL}/aws/?file-name=${name}?file-name=${type}`;
	var myHeaders = new Headers();
	var jsonObj = JSON.stringify(obj)

	// var formData = new FormData();
	// formData.append("file", obj);

	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Accept', 'application/json')
	// myHeaders.append("Content-Type","multipart/form-data");

	var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is the get aws')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

function deleteCatFromPhoto(obj){
	const category = obj.category
	const id = obj.id

	// const REQUEST_URL = `${URL}/photos?email=${email}&password=${password}`
	const REQUEST_URL = `${URL}/health-stat-categories/`
	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'DELETE');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Accept', 'application/json')
	myHeaders.append('Content-Type', 'application/json');

	var myInit = { method: 'DELETE',
			   body: JSON.stringify(obj),
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

	return fetch(REQUEST_URL, myInit)
		.then((forJSON)=>{
			console.log(forJSON)
			return forJSON.json()
		})
		.then((data)=>{
			console.log(data, 'this is the post')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

export default {
	googleAuth,
	getPhotoList,
	login,
	signUp,
	getCatergiesId,
	getCatergiesNames,
	getAllCatergies,
	postNewPhoto,
	deleteCatFromPhoto,
	aws,
	fetchAwsPhoto
}
