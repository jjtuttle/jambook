import React from 'react';
import {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './Homepage.css';
import Post from '../Posts/Posts';
import ProfileButton from '../NavBar/ProfileButton';
import { getPost } from '../../store/posts';

// =============================================================
// import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import SmileIcon from "@material-ui/icons/Mood";
{/* <Button variant="contained" >
    Logout
</Button> */}
// =============================================================

// todo ————————————————————————————————————————————————————————————————————————
const Homepage = () => {
    // const dispatch = useDispatch();
    // const { postId } = useParams();
    // const sessionUser = useSelector((state) => state?.session?.user);
    // console.log("User form homepage =======>>>>", sessionUser.id);

    // const post = useSelector((state) => state?.post[ postId ]);
    // console.log("post from homepage ------->>>>>", post);

    // useEffect(() => { dispatch(getPost(postId)) }, [ dispatch, postId ])


    return (
        <>  
        {/* // {sessionUser?.id === post?.owner.id && (<> 
        //     <button>Edit</button>
        // </>)} */}

            <NavBar>
                <ProfileButton />
            </NavBar>

 

            <div>
                <h1>** NEW HOMEPAGE **</h1>
                <div className="create-post">
                    {/* <Post postId={postId} /> */}
                    <Post />
                </div>
            </div>
        </>
    );
};

export default Homepage;