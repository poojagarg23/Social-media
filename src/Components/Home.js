import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  orderBy,
  onSnapshot,
  query,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, firebase, storage } from "../Service/firebase.config";
import smile from "../images/smile.png";
import imagePhoto from "../images/imagePhoto.png";
import Picker from "emoji-picker-react";
import profilePhoto from "../images/userProfile.webp";

import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const filteredOptions = [
  { option: "trending" },
  { option: "Chrome" },
  { option: "Firefox" },
  { option: "comment " },
  { option: "newday" },
];

export default function CreatePost() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [growth, setGrowth] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [openSmile, setOpenSmile] = useState(false);
  const [addPic, setAddPic] = useState(false);
  const [addName, setAddName] = useState(null)
  const [data, setdata] = useState();
  const [open, setOpen] = useState(false);
  const firestore = getFirestore(app);
  const storageRef = getStorage(app);
  const hashtagFilter = [];
  const inputRef = useRef();
  // console.log(hashtag, "hashtag");

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(firebase, "NewUser");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        console.log(doc.data(), "newUserDocs");
        setText(doc.data())
      })
    }
    fetchData();

  }, [])

  const handlesubmit = async (e) => {
    e.preventDefault();
    const imageUrls = [];

    try {
      const user = auth.currentUser;
      console.log(user, "userinformation");
      for (const image of selectedImages) {
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(imageUrl);
      }

      const postsWithImages = imageUrls.map((imageUrl) => ({
        description: description,
        hashtag: hashtag,
        imageUrl: imageUrl,
        date: serverTimestamp(),
        displayName: user.displayName || text.ProfileName,
        profileIamge: profilePhoto || user.photoURL,
        email: user.email,
        follow: false,
        like: [],
        bio: "",
        age: 18,
        location: "",
      }));

      for (const post of postsWithImages) {
        try {
          await addDoc(collection(firestore, "posts"), post);
          console.log("added sucessfully");
        } catch (error) {
          console.error("Error adding post to Firestore:", error);
        }
      }

      console.log("All Posts added to Firestore successfully");
      setDescription("");
      setSelectedImages([]);
      setHashtag("");
      inputRef.current.value = null;
    } catch (error) {
      console.log(error);
    }


  };
  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (text) {
          const updateRef = doc(firebase, "NewUser")
          const data = {
            ProfileName: addName.displayName
          }
          await updateDoc(updateRef, data)

        }

      }
      catch (error) {
        console.log(error, "error")
      }

    }
    dataFetch()

  })

  const handleImageUpload = (event) => {
    setSelectedImages([...event.target.files]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(firebase, "posts");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach(doc => {
        console.log(doc.data(), "dataNewUser");
        setAddName(doc.data())
      })
    }
    fetchData()

  }, [])
  console.log(addName, "addname")
  const handleSelect = (e) => {
    setHashtag(e.target.value);
    let text = e.target.value;
    let res = text.charAt(text.length - 1);
    setOpen(res == "#");
    if (res == "#") {
      console.log("textStartWith#");
      // const filteredOptions = data?.filter((fbb) => {
      //   fbb.option.toLowerCase().includes(text.toLowerCase().substring(1));
      // });
      console.log(filteredOptions, "filteredOptions");
    }
  };

  const handleChangeSelect = (e) => {
    console.log("checkHashBeforevalue", hashtag);

    setHashtag((prev) => prev + e.target.value);
  };
  useEffect(() => {
    if (open) {
      console.log("open effect");
      setdata(filteredOptions);
    } else {
      setdata([]);
      console.log("no effect");
    }
  }, [open]);
  const handleAddPic = (e) => {
    e.preventDefault();
    setAddPic(!addPic);
  };
  const onEmojiClick = (event, emojiObject) => {
    const cursor = ref.current?.selectionStart;
    // console.log(cursor, "cursorEmoji");
    const text =
      description.slice(0, cursor) +
      emojiObject.emoji +
      description.slice(cursor, 0);
    setDescription(text);
  };
  const handleSmile = (e) => {
    e.preventDefault();
    setOpenSmile(!openSmile);
  };
  const user = auth.currentUser;
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <div></div> */}
        <div>
          <div className="post-userProfile">
            <img className="userPhotoUrl" src={user.photoURL || profilePhoto} />
            {console.log(text.displayName, "text.displayname")}
            <span>{user.displayName || text.ProfileName
            }</span>
          </div>
          <textarea
            id="outlined-multiline-flexible"
            label="description"
            className="text-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            placeholder="enter Your Description here...."
          />
        </div>
        <br />

        <div>
          <Input
            type="text"
            name="example"
            id="example"
            list="exampleList"
            onChange={handleSelect}
            value={hashtag}
            placeholder="enter Hashtags to your posts.."
          />
          {/* {selectedValue ? true : false} */}
          {open ? (
            <select id="example" onChange={handleChangeSelect}>
              {data?.map((fbb) => (
                <option key={fbb.key} value={fbb.value}>
                  {console.log(fbb.option, "options")}

                  {fbb.option}
                </option>
              ))}
              ;
            </select>
          ) : null}
        </div>
        <p className="addPost">Add To Your Post</p>

        <div className="addPost-flex">
          <div>
            <button className="emoji-Add" onClick={(e) => handleSmile(e)}>
              <img src={smile} />
              Insert Emoji
            </button>
          </div>
          <div>
            <button className="addImage" onClick={(e) => handleAddPic(e)}>
              <img src={imagePhoto} />
              Photos
            </button>
          </div>
        </div>
        <div>
          <button className="postSubmit" onClick={handlesubmit}>
            post
          </button>
        </div>
        {openSmile ? <Picker onEmojiClick={onEmojiClick} /> : null}
        {addPic ? (
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handleImageUpload}
          />
        ) : null}
      </Box>
    </>
  );
}
