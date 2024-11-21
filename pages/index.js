// index.js

import TweetForm from '../components/TweetForm';
import TweetCard from '../components/TweetCard';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import ReactionButton from '../components/ReactionButton';

export default function Home() {
  const testTweetId = 'sampleTweetId';  // Replace with a valid tweet ID for testing
  const testComments = [
    { id: 1, text: 'This is a great tweet!' },
    { id: 2, text: 'I agree with this post!' },
  ];  // Example comments data

  const handleReaction = (reactionType) => {
    console.log(`Reacting with: ${reactionType}`);
  };

  return (
    <div>
      <h1>Welcome to Next.js!</h1>

      {/* Test the TweetForm component */}
      <h2>Create a New Tweet</h2>
      <TweetForm />

      {/* Test the TweetCard component with a sample tweetId */}
      <h2>Tweet Details</h2>
      <TweetCard tweetId={testTweetId} />

      {/* Test the CommentForm and CommentList components */}
      <h2>Post a Comment</h2>
      <CommentForm tweetId={testTweetId} />
      
      <h2>Comments</h2>
      <CommentList comments={testComments} />

      {/* Test the ReactionButton component */}
      <h2>Reactions</h2>
      <ReactionButton tweetId={testTweetId} handleReaction={handleReaction} />
    </div>
  );
}
