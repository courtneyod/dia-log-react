const URL = "localhost:8000"

export default function getPhotoList(){
	return fetch(URL)
		.then((forJSON)=>{
			return forJSON.json()
		}).then((data)=>{
			console.log(data, 'this is in teh ap call')
			return data
		})
}
