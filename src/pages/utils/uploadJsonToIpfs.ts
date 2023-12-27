import { OutputData } from "@editorjs/editorjs";
import { pinataApiKey, pinataApiSecret, pinataTokenJWT } from "./constants";

var data = JSON.stringify({
  "pinataOptions": {
    "cidVersion": 1
  },
  "pinataMetadata": {
    "name": "flow",
    "keyvalues": {
      "customKey": "customValue",
      "customKey2": "customValue2"
    }
  },
  "pinataContent": {
    "somekey": "somevalue"
  }
});

var config = {
  method: 'post',
  headers: { 
    'Content-Type': 'application/json', 
    'pinata_api_key': pinataApiKey,
    'pinata_secret_api_key': pinataApiSecret
  }
};


export const handleUploadJsonToIpfs = async(jsonFile: OutputData) => {
    try {
        const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
            ...config,
            body: JSON.stringify(jsonFile)
        });

        const data = await res.json()
        console.log("Pinata ", data)
        return data.IpfsHash
    } catch(e) {
        console.error(e)
    }
}


