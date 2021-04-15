const fetchManifest = () => {
    axios.get('https://underminethroughdesign-device.dataplicity.io/manifest')
        .then(response => {
            console.log(response);
        })
        .catch(error => console.error(error));
};

const createManifest = (manifest) => {
    axios.post('https://underminethroughdesign-device.dataplicity.io/manifest', manifest)
        .then(response => {
            console.log(response);
                 })
        .catch(error => console.error(error));
};

 const onClickSubmit = () => {

	var name = document.getElementById("name-input").value;
	var manifestInput = document.getElementById("manifest-input").value;
	
	var manifest = {
		text: manifestInput,
		name: name
	
	};
	console.log(manifest);

	createManifest(manifest);

	
};



fetchManifest();


