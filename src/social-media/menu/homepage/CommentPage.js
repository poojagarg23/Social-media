import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Avatar } from "@mui/material";
import { app } from "../../../Service/firebase.config";
import { BsFillSendFill } from "react-icons/bs";

const CommentPage = ({ trending, setCommentLength }) => {

  // console.log(setCommentLength, "setCommentLength");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "" });
  // props.func('My name is Dean Winchester & this is my brother Sammie');

  const fetchComments = () => {
    const database = getDatabase(app);
    const commentsRef = ref(database, `comments/${trending.id}`);

    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsData = Object.values(data);

        setComments(commentsData);
        console.log(commentsData, "commentsDataIfRequired");
        setCommentLength(commentsData)


        console.log(comments, "commment-trending");
      } else {
        setComments([]);
      }
    });
  };

  useEffect(() => {
    fetchComments();
  }, [trending.id]);

  const handleAddComment = async () => {
    if (newComment.comment) {
      const auth = getAuth(app);
      const user = auth.currentUser;
      // console.log(user, "userhereuser");
      if (!user) {
        console.log("User is not logged in");
        return;
      }

      const database = getDatabase(app);
      const commentsRef = ref(database, `comments/${trending.id}`);
      const commentData = {
        comment: newComment.comment,
        userId: user.uid,
        userName: user.displayName,
        length: comments.length
      };
      await push(commentsRef, commentData);
      setNewComment({ comment: "" });
    }
  };


  return (
    <div >
      <div className="comment-main-div">
        { }
        {console.log(comments.length, "everyLength")}
        <h3>Comments ({comments.length}):</h3>

        <div>
          <input
            type="text"
            placeholder="comment"
            className="comment-text"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
          />

          <button onClick={handleAddComment}>
            <BsFillSendFill />
          </button>
        </div>
        {/* {console.log(comments, "commentslengthsearch")} */}
        {comments?.map((comment, index) => {
          return (
            <div className="comment-div" key={index}>
              <p>
                {comment.userName}: {comment.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CommentPage;
