function getUserFromJWT(){
	var JWT = localStorage.getItem("jwt");
	var arr = JWT.split('&')
	var id = arr[1].split('id=')[1]
	var email= arr[2].split('email=')[1]
	var obj = {
		'email': email,
		'id': id
	}
	return obj;
}

module.exports = getUserFromJWT
