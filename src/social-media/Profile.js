import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { auth, firebase, storage } from "../Service/firebase.config";
import profileCover from "../../src/images/profileCover.png";
import addphoto from "../../src/images/create.png";
import "../../src/css/profile.css";
import { AiFillCamera } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Newest from "./menu/homepage/Newest";
import { createContext } from "react";
import { InputRef } from "antd";
// import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  updateDoc,
  doc,
  collection,
  addDoc,
  Firestore,
  query,
  orderBy,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

// const context = createContext();
const Profile = () => {
  const { id } = useParams();
  console.log(id, "idparams");
  const location = useLocation();

  const { data } = location.state;
  console.log(data);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const File = useRef(null);
  const [postData, setPostData] = useState();
  const [editcoverImage, setEditcoverImage] = useState("");
  const [profileIamge, setProfileIamge] = useState("");
  const [show, setShow] = useState(false);
  const [stateUpdate, setStateupdate] = useState("");
  // const initialState = {
  //   name: data.displayName,
  // };
  const [update, setUpdate] = useState({});
  const [dataUpdate, setDataUpdate] = useState();
  const [dataValue, setDataValue] = useState({
    displayName: data?.displayName || "",
    bio: data?.bio || "",
    location: data?.location || "",
    age: data?.age || "",
  });

  console.log(update, "updateupdate");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = auth.currentUser;
  console.log(user, "current-user");
  const handleClickEditCover = () => {
    console.log(fileInputRef, "fileInputRef");
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("yes it is working");
    }
  };
  const HandleProfileImage = () => {
    if (File.current) {
      File.current.click();
    }
  };
  const handleFileChange = async (event) => {
    const coverImage = event.target.files[0];
    console.log(event.target.files[0], "editcover");
    if (coverImage) {
      const storageRef = ref(storage, "coverPhoto/" + coverImage.name);
      try {
        await uploadBytes(storageRef, coverImage);

        const imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl, "imageurlimage");
        const userDocRef = doc(firebase, "posts", data.id);
        await updateDoc(userDocRef, {
          editcoverImage: imageUrl,
        });
        setEditcoverImage(imageUrl);
        console.log("coverImage updated successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    console.log(editcoverImage, "editcoverImage");
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const storageRef = ref(storage, "profileImages/" + selectedFile.name);
      try {
        await uploadBytes(storageRef, selectedFile);

        const imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl, "imageurlimage");
        const userDocRef = doc(firebase, "posts", data.id);
        await updateDoc(userDocRef, {
          profileIamge: imageUrl,
          // setProfileImage: imageUrl,
        });
        setProfileIamge(imageUrl);
        console.log("Profile image updated successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const fetchData = async () => {
    try {
      const userDocRef = doc(firebase, "posts", data.id);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setDataValue({
          displayName: userData.displayName || "",
          bio: userData.bio || "",
          location: userData.location || "",
          age: userData.age || "",
        });
        setEditcoverImage(userData.editcoverImage || "");
        setProfileIamge(userData.profileIamge || "");
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setDataUpdate({ ...dataUpdate, dataValue })
    setPostData(update);
    if (dataValue) {
      const dataref = doc(firebase, "posts", data.id);
      const dataUpdateForm = {
        displayName: dataValue.displayName,
        age: dataValue.age,
        location: dataValue.location,
        bio: dataValue.bio,
      };
      updateDoc(dataref, dataUpdateForm);
      console.log(dataUpdateForm, "dataUpdateForm");
      setDataUpdate(dataUpdateForm);
    } else {
      setUpdate("");
      setDataValue("");
      setDataUpdate("");
    }
  };
  console.log(update, "updateuSER");
  const handleChange = (e) => {
    setDataValue({ ...dataValue, [e.target.name]: e.target.value });
  };
  console.log(data.id, dataUpdate, "from-page");

  return (
    <div className="profile-page">
      {editcoverImage ? (
        <img className="profilecoverImg" src={editcoverImage} />
      ) : (
        <img className="profilecoverImg" src={profileCover} />
      )}

      <div className="editcover">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="filetype"
          />
        </div>
      </div>

      <button onClick={handleClickEditCover} className="editCover">
        {" "}
        <AiFillCamera />
        Edit Cover Photo
      </button>
      {profileIamge ? (
        <img className="photoUrl" src={profileIamge} />
      ) : (
        <img className="photoUrl" src={data?.profileIamge} />
      )}

      <div className="profileImage">
        <div>
          <input
            type="file"
            onChange={handleFileUpload}
            ref={File}
            className="filetype"
          />
        </div>
      </div>
      <button onClick={HandleProfileImage} className="addProfileImage-button">
        <img className="addProfileImage" src={addphoto} />
      </button>

      <div className="person-bio-information">
        <div className="information">
          <h6 className="person-name"> {dataValue.displayName}</h6>
          {/* <h6>{}</h6> */}
          <h6 className="person-bio">
            <b> Bio</b>
            {dataValue.bio}
            {/* {dataUpdate ? dataUpdate.bio : data?.bio} */}
          </h6>
          <h6>
            {" "}
            <b>Locations</b>
            {dataValue.location}
          </h6>
          <h6>
            <b>Age</b>
            {dataValue.age}
          </h6>
          <h6>
            <b>Website Link</b>
          </h6>
        </div>

        <div className="edit-button">
          <ButtonGroup
            className="edit"
            style={{
              background: "rgba(46, 125, 50, 1)",
              color: "white",
            }}
            onClick={handleShow}
          >
            Edit Profile
          </ButtonGroup>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-profile" onSubmit={handleSubmit}>
                <input
                  placeholder="Add your username here..."
                  type="text"
                  value={dataValue.displayName}
                  name="displayName"
                  onChange={handleChange}
                />
                {/* <label>Bio:</label> */}
                <input
                  placeholder="add Your BIO here.."
                  type="text"
                  name="bio"
                  value={dataValue.bio}
                  onChange={handleChange}
                />

                <input
                  placeholder="Add your locations.."
                  type="text"
                  name="location"
                  value={dataValue.location}
                  onChange={handleChange}
                />

                <input
                  placeholder="Add your Age.."
                  type="text"
                  name="age"
                  value={dataValue.age}
                  onChange={handleChange}
                />
                <button type="submit">submit</button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
