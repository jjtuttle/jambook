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

import './SearchResults.css'


const SearchResults = () => {
    const history = useHistory();

    const postsObj = useSelector(state => state?.searchReducer);
    const posts = postsObj && Object.values(postsObj);


    const comment = useSelector((state) => state?.commentReducer);
    const sessionUser = useSelector(state => state?.session?.user);
    const [ textCount, setTextCount ] = useState(0);
    const [ body, setBody ] = useState('');

    if (posts.length < 1) {
        history.push('/pageNotFound')
    }



    return (
        <div>
            <h2 style={{ top: '180px', color:'#719ece', textAlign:'center' }}>Search results</h2>

            <div className="posts_container">
                <ul className="ul_posts">
                    {posts?.map((post) => (

                        <li className={"posted-posts"} key={post?.id}>

                            <div className="post__top">
                                <div className="post__top-avatar">
                                    {/* <img src={avatar} alt='avatar' /> */}
                                    <Avatar className="post__avatar" {...stringAvatar(post?.first.concat(' ', post?.last))} style={{ opacity: '.6' }} />
                                </div>
                            </div>

                            <div className="post__top-info">
                                <div className="top__info-user">
                                    <span >{post?.owner} </span>
                                </div>
                                <div className="top__info-time">
                                    <span style={{ marginLeft: '5px' }}>Posted: <Timestamp relative date={post?.created_at} /></span>
                                </div>
                            </div>

                            <div className="post_body">
                                {post?.body}
                            </div>

                            < div className="edit-delete-post-wrapper">
                                <EditPostsModal post={post} posts_id={post?.id} />
                                <DeletePostButton post={post} />

                                <AddCommentsModal post_id={post?.id} commentId={comment} />
                            </div>

                            <div className="comments-container">
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