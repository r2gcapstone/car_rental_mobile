import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

const uploadImage = async (uri, pathName) => {
  let blob;

  try {
    blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const metaData = {
      type: "image/jpeg",
    };

    const fileRef = ref(getStorage(), `${pathName}/${uuid.v4()}.jpeg`);
    await uploadBytes(fileRef, blob, metaData);

    // We're done with the blob, close and release it
    blob.close();

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export default uploadImage;
