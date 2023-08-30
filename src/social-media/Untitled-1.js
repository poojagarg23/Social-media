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
} from "firebase/firestore";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

// const context = createContext();

const Profile = () => {
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    location: "",
    age: "",
    profileImage: "",
    coverImage: "",
  });
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = auth.currentUser;
        const userDocRef = firebase.doc(`profiles/${user.uid}`);
        const userDoc = await userDocRef.get();

        if (userDoc.exists()) {
          setProfileData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const userDocRef = firebase.doc(`profiles/${user.uid}`);
      await userDocRef.set(profileData, { merge: true });
      console.log("Profile data updated successfully");
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

      <div className="person-bio-information">
        <div className="information">
          <h6 className="person-name">{profileData.displayName}</h6>
          <h6 className="person-bio">
            <b> Bio</b> {profileData.bio}
          </h6>
          <h6>
            <b>Locations</b> {profileData.location}
          </h6>
          <h6>
            <b>Age</b> {profileData.age}
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
                  value={profileData.displayName}
                  name="displayName"
                  onChange={handleChange}
                />
                {/* <label>Bio:</label> */}
                <input
                  placeholder="add Your BIO here.."
                  type="text"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                />

                <input
                  placeholder="Add your locations.."
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                />

                <input
                  placeholder="Add your Age.."
                  type="text"
                  name="age"
                  value={profileData.age}
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
