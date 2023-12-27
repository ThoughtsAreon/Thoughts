import axios from "axios";
import FormData from "form-data";
import { pinataApiKey, pinataApiSecret } from "./constants";

export const handleUploadFileToIPFS = async (file: File, postID: string) : Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  const metadata = JSON.stringify({
    name: postID,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: -1,
        headers: {
          "Content-Type": `multipart/form-data`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
        },
      }
    );
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
  return null
};
