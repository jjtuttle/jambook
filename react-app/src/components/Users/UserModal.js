import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import User from './index';



function UserProfile({ post }) {
  const [ showModal, setShowModel ] = useState(false);


  const sessionId = useSelector(state => state?.session?.user?.id);
  const writerId = post?.owner_id;
  // const matchingSessionToUser = match(sessionId, +writerId);

  // console.log("EDIT Post Modal Vcomp,,,,,,,,,,,,,,,,,,,,", post);
  // typeof(post.owner_id) - number

  return (
    // matchingSessionToUser && (
    <div className="profile">
      <button className="btn" onClick={(e) => setShowModel(true)} style={{ marginRight: '10px' }}>Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModel(false)} >
          <User closeModal={() => setShowModel(false)} user={sessionId.id} />
        </Modal>
      )}
    </div>
  )
  // );
}

export default UserProfile;