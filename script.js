
// document.getElementById('save-as-png').addEventListener('click', function () {
//     const certificateContainer = document.getElementById('certificate-container');
    
//     html2canvas(certificateContainer).then(function(canvas) {
//         // Create an image element with the canvas data
//         const img = new Image();
//         img.src = canvas.toDataURL('image/png');
    
//         // Create a temporary link to download the PNG image
//         const a = document.createElement('a');
//         a.href = img.src;
//         a.download = 'certificate.png';
//         a.click();
//     });
// });

// document.getElementById('mint').addEventListener('click', function () {
//     ipfsUploader();
// });


function captureCanvasImage() {
    const certificateContainer = document.getElementById('certificate-container');

    return new Promise((resolve, reject) => {
        html2canvas(certificateContainer).then((canvas) => {
            const img = new Image();
            img.src = canvas.toDataURL('file');
            
            const a = document.createElement('a');
            a.href = img.src;
            resolve(a.href);
        });
    });
}

function ipfsUploader(userEmailValue,userIdValue,userNameValue,imgPath) {
    alert("Confirmation Page Is Sent To Your Mail");
    console.log("ipfs uploader is calling");

    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQwNjMyODNDMzhDQjZjYzljRjIzOTJmODE2NTMyZTQ0RTkyREZDOTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDk3NjUwMjE4MiwibmFtZSI6IlNBS1NIQU0tREVNTy1LRVktMSJ9.0rB6mr03uK0Q7Bjf21-YySJMHmcCcqFHQ1zyKIusWX0'; // Replace with your actual API key

    // Log the values to the console
    console.log("User ID:", userIdValue);
    console.log("User Email:", userEmailValue);
    console.log("User Name:", userNameValue);
    




    // Replace './cert/eom.jpg' with the actual image path you want to upload
    const imagePath=imgPath;

    console.log("Image path:", imagePath);

    // // Convert image to Blob
    // fetch(imagePath)
    //     .then(response => response.blob())
    //     .then(blob => {
    //         // Create a FormData object to send the file to NFT.Storage
    //         const formData = new FormData();
    //         formData.append('file', blob);

    //         // Perform the upload to NFT.Storage
    //         fetch('https://api.nft.storage/upload', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'Bearer ' + apiKey,
    //             },
    //             body: formData,
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 const ipfsHash = data.value.cid; // Extract CID from the response
    //                 console.log(ipfsHash);

    //                 // Construct IPFS URL
    //                 const ipfsAssetURL = `https://ipfs.io/ipfs/${ipfsHash}`;
    //                 console.log(ipfsAssetURL);

    //                 // Create a JavaScript object with the collected values and uploaded time
    //                 var formData = {
    //                     userId: userIdValue,
    //                     username: UserName,
    //                     userEmail: userEmailValue,
    //                     uploadedTime: new Date().toISOString(),
    //                     ipfshash: ipfsHash,
    //                     asseturl: ipfsAssetURL
    //                 };
    //                 console.log("formdata:-", formData);

    //                 // You can call your mintNFT function here with the formData
    //                 // const mintdata = mintNFT(formData);
    //                 // console.log(mintdata);
    //             })
    //             .catch(error => console.error('Error uploading to IPFS:', error));
    //     })
    //     .catch(error => console.error('Error fetching image:', error));
}



async function mintNFT(formData) {
    
    try {
        console.log("mint form data",formData)
        // Access form data using get method of FormData
        const tokenuri = formData.ipfshash;
        const ImageUrl = formData.asseturl;
        const Issuer = formData.issuer;
        const userid = formData.userId;
        const Username = formData.username;
        const UserEmail = formData.userEmail;
        const publickey = '0x083dA9DE13e5BB59823BF2fF0Ec53B410Cf9857a';
        const ipfslink= "ipfs://" + tokenuri;
        console.log("tokenuri",ipfslink)
        console.log("asset url",ImageUrl)
        console.log("userid:",userid)
        console.log("issuer",Issuer)
        console.log("username",Username)
        console.log("public key",publickey)
        console.log("user mail address",UserEmail);

        console.log("MINT NFT API is calling");
        const response = await fetch('http://13.50.171.152:3000/mintNFT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ipfslink,
                ImageUrl,
                Issuer,
                userid,
                Username,
                publickey,
                UserEmail
                // Add other required parameters
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to mint NFT: ${errorMessage}`);
        }

        const responseData = await response.json();
        console.log('API Response:', responseData);

        // Display the response in your UI, for example:
        alert('API call successful. Response: ' + JSON.stringify(responseData));
    } catch (error) {
        // Handle errors, such as displaying error messages to the user
        console.error('Error calling API:', error);
    }
}



