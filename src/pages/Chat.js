import { serverTimestamp } from "firebase/database";
import { BsEmojiSmile } from "react-icons/bs";
import React, { useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { auth, firebase, storage } from "../Service/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { MdAttachFile } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import attach from "../images/attach.png";
import send from "../images/send.png";
const Chat = (props) => {
  console.log(props, "propsUndefined")
  const [message, setMessage] = useState([]);
  const [selectedImages, setSelectedImages] = useState();
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [files, setFiles] = useState();
  const [openSmile, setOpenSmile] = useState();
  const [openFile, setOpenFile] = useState();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emoji, setEmoji] = useState([]);

  const handleImageUpload = (event) => {
    // setSelectedImages([...selectedImages, ...event.target.files]);
    setSelectedImages([...selectedImages, ...event.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      message.length === "" &&
      emoji.length === 0 &&
      selectedImages.length === 0
    ) {
      alert("Enter your message, select an emoji, or upload an image");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    const messageData = {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: new Date().getTime(),
      uid,
      emojis: emoji.map((e) => e.emoji),
      images: [],
    };

    if (selectedImages?.length > 0) {
      const imageUrls = [];

      for (const image of selectedImages) {
        try {
          const storageRef = ref(storage, image.name + Date.now());
          const snapshot = await uploadBytes(storageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          // console.log(url, "url");
          imageUrls.push(url);
        } catch (error) {
          console.log(error, "error");
        }
      }
      // console.log(imageUrls, "imageURLSCHECK");
      messageData.images = imageUrls;
      // console.log(messageData, imageUrls, "messagedataaa");
    }

    await addDoc(collection(firebase, "messages"), messageData);

    setMessage("");
    setEmoji([]);
    setSelectedImages([]);
    setOpenSmile(false);
    setOpenFile(false);
  };
  const handleSubmitHandle = (e) => {
    e.preventDefault();
  };
  const onEmojiClick = (event, emojiObject) => {
    const cursor = ref.current?.selectionStart;
    // console.log(cursor, "cursorEmoji");
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor, 0);
    setMessage(text);
  };
  // console.log(message, "messagecheckemojis");
  return (
    <div className="form-data">
      <form className="send-message" onSubmit={(e) => handleSubmitHandle(e)}>
        <div className="input-send">
          <button
            className="smile-button"
            onClick={() => setOpenSmile(!openSmile)}
          >
            <BsEmojiSmile />
          </button>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              // console.log(message);
            }}
          />

          <button onClick={() => setOpenFile(!openFile)} className="file-send">
            <img src={attach} />
          </button>
          <button
            className="submit-send"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <img src={send} />
          </button>
        </div>

        {openFile ? <input type="file" onChange={handleImageUpload} /> : null}
        {openSmile ? <Picker onEmojiClick={onEmojiClick} /> : null}
      </form>
    </div>
  );
};
export default Chat;
