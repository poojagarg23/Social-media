import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, firebase } from '../Service/firebase.config';
import { AiOutlineHeart } from 'react-icons/ai';
import Like from "../images/like.png"

const PhotosUser = (props) => {
    const user = auth.currentUser;
    console.log(user, "PhotosUserPhotosUser")
    const [data, setData] = useState([]);
    const profileName = props
    console.log(profileName.userProfile.ProfileName, "____");
    useEffect(() => {
        const fetchPosts = () => {
            console.log(user, "userAuthenticate");
            if (user) {
                const postsRef = collection(firebase, "posts");
                const q = query(postsRef,
                    where("displayName", "==", `${profileName.userProfile.ProfileName}`
                    ),
                    orderBy("date", "desc")
                );

                const unsubscribe = onSnapshot(q, async (snapshot) => {
                    try {
                        const updatedPosts = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setData(updatedPosts);
                        console.log(updatedPosts, "updatedPostsupdatedPosts");
                    } catch (error) {
                        console.error("Error fetching data: ", error);
                    }
                });

                return unsubscribe;
            }
        };

        const unsubscribe = fetchPosts();

        return () => {
            unsubscribe();
        };
    }, [user]);

    return (
        <div className='main-div-Photos'>
            {console.log(data, "dataphotos")}
            {data?.map((post) => (
                <div className='image-profile' key={post.id}>
                    <img className="postImageUrl" src={post?.imageUrl} />

                    <span className='show-like-length'>  <img src={Like} /> <span className='length-post'>{post?.like?.length} </span></span>
                </div>
            ))}
        </div>
    )
}

export default PhotosUser;
