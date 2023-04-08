import { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:8000/api/post/${postId}`);
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={liked}>
        {liked ? 'Liked' : 'Like'}
      </button>
      <span>{likeCount} likes</span>
    </div>
  );
};
export default LikeButton
