import React, { useState } from 'react';
import { useSolana } from '../contexts/SolanaContext';

const CommentForm = ({ tweetId }) => {
  const [comment, setComment] = useState('');
  const { AddComment } = useSolana() || {};
  //const { AddComment } = useSolana();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await AddComment(tweetId, comment); // Add the comment to the tweet
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Add a comment"
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
