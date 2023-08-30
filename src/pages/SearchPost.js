import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import "../css/homepage.css";
import Trendingimg from "../images/trending.png";
import vectorimg from "../images/vector.png";
import likeimage from "../images/like.png";
import calender from "../images/calender.png";
import message from "../images/message.png";
import { Avatar, Box, Button } from "@mui/material";
import person1 from "../images/person-1.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import play from "../images/Play.png";
import voice from "../images/Voice.png";
import { app, auth, firebase } from "../Service/firebase.config";
import { increment } from "firebase/firestore";
import moment from "moment/moment";
import { AiFillDelete } from "react-icons/ai";
import Search from "../social-media/menu/Search";
import CommentPage from "../social-media/menu/homepage/CommentPage";

import Aboutus from "../social-media/menu/Aboutus";
import { Tabs } from "antd";

const firestore = getFirestore(app);

const SearchPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [displayPost, setDisplayPost] = useState(3);
  const [seemoreopen, setSeeMoreOpen] = useState(false);
  const [likePost, setlikePost] = useState();
  const user = auth.currentUser;
  useEffect(() => {
    const fetchPosts = () => {
      const postsRef = collection(firestore, "posts");

      const q = query(postsRef);
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        try {
          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(updatedPosts);
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

  const handleDelete = async (postId) => {
    {
      const postRef = doc(firestore, "posts", postId);
      await deleteDoc(postRef);
      console.log("Post deleted successfully");
    }
  };

  const handleMessage = () => {
    setMessage(!message);
    setOpen(!open);
  };
  /// comments
  const firestore = getFirestore(app);
  const [comments, setComments] = useState([]);
  // console.log(posts, "posts");
  const handleSeeMore = () => {
    setDisplayPost(displayPost + 100);
    setSeeMoreOpen(!seemoreopen);
  };
  const linkName = seemoreopen ? "See Less" : "See More";
  const handleFollow = (postId, e) => {
    e.preventDefault();

    const dataFollow = posts.find((f) => f.id == postId);
    const updateref = doc(firebase, "posts", dataFollow.id);

    const data = {
      follow: !dataFollow.follow,
    };
    updateDoc(updateref, data);
  };
  useEffect(() => {
    if (searchQuery) {
      // console.log(posts, "datalog");
      const filtered = posts?.filter((post) => {
        const name = post?.displayName?.toLowerCase();
        const searchTerm = searchQuery?.toLowerCase();
        return name?.includes(searchTerm);
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchQuery]);
  const handleSearch = (query) => {
    setSearchQuery(query);
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
    // console.log(postData, "postDataa");
    const likedByUser = postData.like.includes(user.uid);
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
  const { TabPane } = Tabs;
  return (
    <div>
      <div className="div-main">
        <Tabs>
          <TabPane tab="People" key="1">
            <Search handleSearch={handleSearch} />
            <div className="div-main">
              <div>
                {filteredPosts.slice(0, displayPost).map((trending) => {
                  return (
                    <div
                      className="main-div"
                      key={trending.id}
                    // style={{ padding: "30px" }}
                    >
                      <div className="trending-div">
                        <div>
                          <div>
                            <img
                              className="personPic"
                              src={trending.profileIamge}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="details">
                            <p className="headinh-details">
                              {trending.description}
                            </p>
                            <div>
                              <p className="hashtag">{trending.hashtag}</p>
                            </div>
                            <div className="span-class">
                              <span>{trending.displayName} </span>{" "}
                              <span>
                                <img src={vectorimg} alt="vectorimg" />
                              </span>
                              <span>Growth & User Acquisition</span>
                            </div>
                            <div className="span-class-1">
                              <span>
                                <img src={likeimage} alt="like" />
                              </span>
                              <span>
                                <img src={calender} alt="calender" />
                              </span>
                              <span>
                                {trending?.date.toDate().toLocaleString()}
                              </span>

                              <span> {comments.length} comment</span>
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
                            <button
                              className="icon-button"
                              onClick={() => handleLikeToggle(trending.id)}
                            >
                              <FavoriteIcon />
                            </button>
                            {<p>{trending?.like.length}</p>}
                            <button
                              className="icon-button"
                              onClick={() => handleMessage()}
                            >
                              <MessageIcon />
                            </button>

                            <p>{comments.length}</p>
                            <button className="icon-button">
                              <ShareIcon />
                            </button>
                            <p>378</p>
                            <button
                              className="delete"
                              onClick={() => handleDelete(trending.id)}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                      {open ? <CommentPage trending={trending} /> : null}
                    </div>
                  );
                })}
                {displayPost < posts.length && (
                  <button onClick={handleSeeMore} className="seeMore">
                    <p className="para-see-more">{linkName}</p>
                  </button>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Groups" key="2">
            <div>Groups</div>
          </TabPane>
          <TabPane tab="MarketPlace" key="3">
            <div>market</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchPost;
