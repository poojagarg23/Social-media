import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { firebase, storage } from "../Service/firebase.config";

const ImageDisplaying = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const handleImageUpload = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleUpload = async () => {
    const urls = [];

    for (const image of selectedImages) {
      try {
        const storageRef = ref(storage, image.name + Date.now());
        const snapshot = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);

        await addDoc(collection(firebase, "Chat-images"), {
          imageUrl: url,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setDownloadURLs(urls);
  };

  // console.log(downloadURLs, "downloadUrls");

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageDisplaying;
