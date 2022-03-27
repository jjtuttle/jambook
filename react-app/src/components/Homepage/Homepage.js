import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Homepage.css';
import Post from '../Posts/Posts';
import ProfileButton from '../NavBar/ProfileButton';
import blueLogo from '../../images/jambook-logo-blue.png';


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

            <div className="hompage_logo_blue">
                <img className="homepage__logo-img" src={blueLogo} alt="jambook logo"
                    style={{
                        width: '150px', height: '60px', position: 'absolute',
                        top:'7vh', right:'45vw'
                    }}
                />
            </div>

            <div>
                <div className="create-post">
                    {/* <Post postId={postId} /> */}
                    <Post />
                </div>
            </div>
        </>
    );
};

export default Homepage;