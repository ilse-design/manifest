const fetchManifest = () => {
console.log("fetch all manifest");
    axios.get('https://underminethroughdesign-device.dataplicity.io/manifest')
        .then(response => {
            console.log(response);
        })
        .catch(error => console.error(error));

console.log("fetch last manifest");

    axios.get('https://underminethroughdesign-device.dataplicity.io/manifestlast')
        .then(response => {
            console.log(response);
	    console.log("last manifest");
	    var lastManifest = response.data.text;
	    console.log(lastManifest);
            document.getElementById("displayManifest").innerText = lastManifest;

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

	console.log("log of the data send with on click from the script.js");
	console.log(manifest);

	createManifest(manifest);

	
};



fetchManifest();


// front end scripting
document.getElementById('vid').play();

