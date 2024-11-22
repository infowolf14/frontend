import React, { useState } from 'react';
import { useSolana } from '../contexts/SolanaContext';

const TweetForm = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const { CreateTweet } = useSolana() || {};  // Fallback if someObject is undefined
  //const { CreateTweet } = useSolana();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateTweet(topic, content); // Call the Solana function to create a tweet
    setTopic('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Topic" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <button type="submit">Create Tweet</button>
    </form>
  );
};

export default TweetForm;
