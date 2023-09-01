import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  orderBy,
  updateDoc,
  FieldValue,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import "../../../css/homepage.css";
import Trendingimg from "../../../images/trending.png";
import vectorimg from "../../../images/vector.png";
import likeimage from "../../../images/like.png";
import calender from "../../../images/calender.png";
import { Avatar, Box, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import play from "../../../images/Play.png";
import voice from "../../../images/Voice.png";
import { app, auth, firebase } from "../../../Service/firebase.config";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CommentPage from "./CommentPage";
import { ToastContainer, toast } from "react-toastify";
import { increment } from "firebase/firestore";
const firestore = getFirestore(app);

const Newest = () => {
  const [posts, setPosts] = useState([]);
  const [seemoreopen, setSeeMoreOpen] = useState(false);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [displayedPostCount, setDisplayedPostCount] = useState(3);
  const [likePost, setlikePost] = useState([]);
  const [commentLength, setCommentLength] = useState([]);
  // console.log(posts, "url");
  useEffect(() => {
    const fetchPosts = () => {
      const postsRef = collection(firestore, "posts");

      const q = query(postsRef, orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        try {
          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(updatedPosts, "iiiiii");
          setPosts(updatedPosts);

          setlikePost(updatedPosts);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      });

      return unsubscribe;
    };

    const unsubscribe = fetchPosts();

    return () => {
      unsubscribe();
    };
  }, []);
  console.log(posts, "posts");

  const handleMessage = () => {
    setMessage(!message);
    // console.log(message);
    setOpen(!open);
  };

  /// comments
  const handleSeeMore = () => {
    setSeeMoreOpen(!seemoreopen);
    setDisplayedPostCount(displayedPostCount + 100);
  };

  const linkName = seemoreopen ? "See Less  " : "See More  ";
  const user = auth.currentUser;
  const handleFollow = (postId, e) => {
    e.preventDefault();

    const dataFollow = posts.find((f) => f.id == postId);
    const updateref = doc(firebase, "posts", dataFollow.id);
    const data = {
      follow: !dataFollow.follow,
    };
    updateDoc(updateref, data);
    if (dataFollow.follow) {
      toast.error("Unfollow user");
    } else {
      toast.success("Follow user");
    }
  };
  const handleLikeToggle = async (postID) => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not found");
      return;
    }
    const postRef = doc(firestore, "posts", postID);
    const postGetData = await getDoc(postRef);

    const postData = postGetData.data();

    // console.log(postGetData.data(), "postDataa");
    const likedByUser = postData.like.includes(user.uid);

    console.log(likedByUser, "likedByUser");

    if (likedByUser) {
      console.log(postData, "likedByuserCheck");
    }
    if (likedByUser) {
      await updateDoc(postRef, {
        like: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        like: arrayUnion(user.uid),
      });
    }
  };
  //commentlength

  return (
    <div>
      <h2 className="posts">Posts</h2>

      <div>
        {/* {console.log(posts, "postss")} */}

        {posts.slice(0, displayedPostCount).map((trending) => {
          const update = new Date(trending?.date?.seconds * 1000);
          return (
            <div key={trending.id}>
              <div className="trending-div">
                <div>
                  <div>
                    {" "}
                    <Link
                      className="link"
                      to={`/profile/${trending.id}`}
                      state={{ data: trending }}
                    >
                      <img className="personPic" src={trending?.profileIamge} />
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="details">
                    <p className="headinh-details">{trending.description}</p>
                    <div className="span-class">
                      <span>{trending?.displayName} </span>{" "}
                      <span>
                        <img src={vectorimg} alt="vectorimg" />
                      </span>
                      <span>Growth & User Acquisition</span>
                    </div>
                    <div className="span-class-1">
                      <span>
                        <img src={likeimage} alt="like" />
                        { }
                      </span>
                      <span>
                        <img src={calender} alt="calender" />
                      </span>

                      <span>{update.toLocaleString()}</span>

                      <span> comment</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    style={{ border: "2px solid rgba(46, 125, 50, 1)" }}
                    className="button-follow"
                    onClick={(e) => handleFollow(trending.id, e)}
                  >
                    {trending.follow ? "UnFollow" : "Follow"}
                  </Button>
                </div>
              </div>

              <div className="image-div">
                <div>
                  <img className="imgUrl" src={trending.imageUrl} />
                  <button className="button-play">
                    <img src={play} />
                  </button>
                  <button className="button-voice">
                    <img src={voice} />
                  </button>
                </div>

                <div className="persion-post-div">
                  <div className="person-post">
                    <div className="like-div">
                      <button
                        className="icon-button"
                        onClick={() => handleLikeToggle(trending.id)}
                      >
                        <FavoriteIcon />
                      </button>
                      {<p>{trending?.like?.length}</p>}
                    </div>
                    {/* <p>{count_heart(trending.id)}</p> */}
                    <button
                      className="icon-button"
                      onClick={() => handleMessage()}
                    >
                      <MessageIcon />
                    </button>
                    {/* {console.log(commentLength.length, "commentLength")}
                    <p>{commentLength?.length}</p> */}
                    <button className="icon-button">
                      <ShareIcon />
                    </button>
                  </div>
                </div>
              </div>

              {open ? (
                <CommentPage
                  trending={trending}
                  setCommentLength={setCommentLength}
                />
              ) : null}
            </div>
          );
        })}
        {displayedPostCount < posts?.length && (
          <button onClick={handleSeeMore} className="seeMore">
            <p className="para-see-more">{linkName}</p>
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Newest;
