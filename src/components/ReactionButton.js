import React from 'react';

const ReactionButton = ({ tweetId, handleReaction }) => {
  return (
    <div>
      <button onClick={() => handleReaction('like')}>Like</button>
      <button onClick={() => handleReaction('dislike')}>Dislike</button>
    </div>
  );
};

export default ReactionButton;
