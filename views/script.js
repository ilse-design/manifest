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
            document.getElementById("displayCard").innerText = lastManifest;

        })
        .catch(error => console.error(error));

    axios.get('https://underminethroughdesign-device.dataplicity.io/manifestlast')
        .then(response => {
            console.log(response);
	    console.log("last manifest");
	    var lastManifest = response.data.id;
	    console.log(lastManifest);
            document.getElementById("amountCont").innerText = lastManifest;

        })
        .catch(error => console.error(error));


    axios.get('https://underminethroughdesign-device.dataplicity.io/signature')
        .then(response => {
            console.log(response);

            var lastSig = response.data[0].id;
	        console.log(lastSig);
            document.getElementById("amountSig").innerText = lastSig;

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

	var name = document.getElementById("nameCard").value;
	var manifestInput = document.getElementById("cardInput").value;

	var manifest = {
		text: manifestInput,
		name: name
	
	};

	console.log("log of the data send with on click from the script.js");
	console.log(manifest);

	createManifest(manifest);

	
};

const createSignature = (nameSig) => {
    axios.post('https://underminethroughdesign-device.dataplicity.io/signature', nameSig)
        .then(response => {
            console.log(response);
                 })
        .catch(error => console.error(error));
};

const onSign = () => {

	var nameSig = document.getElementById("nameSig").value;

	var nameSig = {
		nameSig: nameSig
	
	};

	console.log("log of the signature send with on click from the script.js");
	console.log(nameSig);

	createSignature(nameSig);

	
};





fetchManifest();





