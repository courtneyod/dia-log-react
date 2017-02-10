var getUserFromJWT = require('./helpers');
const URL = "http://localhost:8000"

// --------------------------------------------
// ----------- GET/UPDATE CATEGORIES ----------
// --------------------------------------------

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

// --------------------------------------------
// ------------------ GOOGLE AUTH -------------
// --------------------------------------------

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

// --------------------------------------------
// -------------- LOGIN /SIGN UP --------------
// --------------------------------------------

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
			console.log(data, 'this is in data from login api call')
			return data
		}).catch(function(err) {
    		console.log('Fetch Error :-S', err);
 		});
}

// --------------------------------------------
// -------------- GET & UPDATE USER------------
// --------------------------------------------

function getUser(obj){
	var userObj = getUserFromJWT()
	var id = userObj.id

	const REQUEST_URL = `${URL}/login/${id}`

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

function updateUser(obj){
	var userObj = getUserFromJWT()
	var id = userObj.id
	console.log(obj, 'obj emplty? ')
	var bodyObj = obj

	const REQUEST_URL = `${URL}/login/${id}`

	var myHeaders = new Headers();
	myHeaders.append('Access-Control-Request-Method', 'PUT');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Content-Type', 'application/json')

	var myInit = {
		method: 'PUT',
		body: JSON.stringify(bodyObj),
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

// --------------------------------------------
// ----------------- AWS CALLS ----------------
// --------------------------------------------

function aws(obj){
	const REQUEST_URL = `${URL}/aws`


	var myHeaders = new Headers();
	var json =  JSON.stringify(fileObj);

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
			console.log(data, 'DATA FROM AWS CALL')
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

	myHeaders.append('Access-Control-Request-Method', 'GET');
	myHeaders.append('Access-Control-Allow-Origin', '*');
	myHeaders.append('Accept', 'application/json')

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

// --------------------------------------------
// -------------- CATEGORIES ------------------
// --------------------------------------------
function deleteCatFromPhoto(obj){
	const category = obj.category
	const id = obj.id

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

function addCatToPhoto(obj){

	// const REQUEST_URL = `${URL}/photos?email=${email}&password=${password}`
	const REQUEST_URL = `${URL}/health-stat-categories/addcat`
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

// --------------------------------------------
// -------------- GET/UPDATE/ADD PHOTO --------
// --------------------------------------------
function getPhotoList(){

	const JWT = localStorage.getItem("jwt");
	const REQUEST_URL = `${URL}/photos?jwt=${JWT}`
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

function postNewPhoto(obj){
	console.log(obj, 'about tot send this obj')
	var userObj = getUserFromJWT()
	var id = userObj.id
	obj.id = id
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

// --------------------------------------------
// ------------------ POST BDGS ---------------
// --------------------------------------------

function addPostBdgs(obj){

	const REQUEST_URL = `${URL}/photos/addPostBdgs`
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
	getUser,
	updateUser,
	login,
	signUp,
	getCatergiesId,
	getCatergiesNames,
	getAllCatergies,
	postNewPhoto,
	deleteCatFromPhoto,
	aws,
	fetchAwsPhoto,
	addCatToPhoto,
	addPostBdgs
}
