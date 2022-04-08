import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Timestamp from 'react-timestamp';
import EditPostsModal from '../EditPosts/EditPostsModal';
import AddCommentsModal from '../AddComments/AddCommentsModal';
import DeletePostButton from '../Posts/DeletePostButton';
import Comments from '../Comments/Comments'
import { stringAvatar } from '../../utils/avatarColorPicker';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './SearchResults.css'


const SearchResults = () => {
    const history = useHistory();

    const postsObj = useSelector(state => state?.searchReducer);
    const posts = postsObj && Object.values(postsObj);


    const comment = useSelector((state) => state?.commentReducer);
    const sessionUser = useSelector(state => state?.session?.user);
    const [ textCount, setTextCount ] = useState(0);
    const [ body, setBody ] = useState('');
    const [ rotateChevron, setRotateChevron ] = useState(false);

    if (posts.length < 1) {
        history.push('/pageNotFound')
    }

    const handleBack = () => {
        history.push('/')
    }

    

    const handleRotate = () => setRotateChevron(!rotateChevron);

    const rotate = rotateChevron ? "rotate(180deg)" : "rotate(0)"


    return (
        <div>
            <h2 style={{ top: '200px', color:'#719ece', textAlign:'center' }}>Search results</h2>
            <ArrowBackIosNewIcon 
                className="muiBackArrow"
                style={{ marginLeft: '300px', width: '60px', height: '60px', transform: rotate, transition: "all 0.2s linear"}} 
                onClick={handleBack}
            />
            <div className="post_containerSearch">
                <ul className="ul_postsSearch">
                    {posts?.map((post) => (

                        <li className={"posted-postsSearch"} key={post?.id}>

                            <div className="post__topSearch">
                                <div className="post__top-avatar">
                                    {/* <img src={avatar} alt='avatar' /> */}
                                    <Avatar className="post__avatar" {...stringAvatar(post?.first.concat(' ', post?.last))} style={{ opacity: '.6' }} />
                                </div>
                            </div>

                            <div className="post__top-infoSearch">
                                <div className="top__info-userSearch">
                                    <span >{post?.owner} </span>
                                </div>
                                <div className="top__info-timeSearch">
                                    <span style={{ marginLeft: '5px' }}>Posted: <Timestamp relative date={post?.created_at} /></span>
                                </div>
                            </div>

                            <div className="post_bodySearch">
                                {post?.body}
                            </div>

                            < div className="edit-delete-post-wrapperSearch">
                                <EditPostsModal post={post} posts_id={post?.id} />
                                <DeletePostButton post={post} />

                                <AddCommentsModal post_id={post?.id} commentId={comment} />
                            </div>

                            <div className="comments-containerSearch">
                                <Comments comment={comment} postId={post?.id} />

                            </div>
                        </li>
                    ))}

                    {/* <BackToTopButton /> */}
                </ul>


            </div>
        </div>
    );
}

export default SearchResults