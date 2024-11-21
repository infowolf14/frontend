import React, { useState, useEffect } from 'react';
import { useSolana } from '../contexts/SolanaContext';

const TweetCard = ({ tweetId }) => {
  const { getTweet, reactToTweet, fetchComments } = useSolana();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tweetData = await getTweet(tweetId); // Fetch tweet by ID
      const tweetComments = await fetchComments(tweetId); // Fetch comments for the tweet
      setTweet(tweetData);
      setComments(tweetComments);
    };

    fetchData();
  }, [tweetId]);

  const handleReaction = async (reactionType) => {
    await reactToTweet(tweetId, reactionType); // React to tweet
    setReaction(reactionType); // Update local state with the new reaction
  };

  return (
    tweet && (
      <div>
        <h3>{tweet.topic}</h3>
        <p>{tweet.content}</p>
        <button onClick={() => handleReaction('like')}>Like</button>
        <button onClick={() => handleReaction('dislike')}>Dislike</button>
        <p>Reactions: {reaction}</p>

        <div>
          <h4>Comments</h4>
          {comments.map((comment) => (
            <p key={comment.id}>{comment.text}</p>
          ))}
        </div>
      </div>
    )
  );
};

export default TweetCard;
