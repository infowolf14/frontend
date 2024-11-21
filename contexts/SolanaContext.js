import React, { createContext, useContext, useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaContext = createContext();

export const SolanaProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [connection, setConnection] = useState(new Connection('https://api.devnet.solana.com'));

  // Initialize provider
  const initializeProvider = (wallet) => {
    const newProvider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
    setProvider(newProvider);
  };

  const createTweet = async (topic, content) => {
    const program = anchor.workspace.twitter_dapp;
    await program.methods.createTweet(topic, content).rpc();
  };

  const getTweet = async (tweetId) => {
    const program = anchor.workspace.twitter_dapp;
    const tweet = await program.account.tweet.fetch(new PublicKey(tweetId));
    return tweet;
  };

  const reactToTweet = async (tweetId, reactionType) => {
    const program = anchor.workspace.twitter_dapp;
    const reaction = reactionType === 'like' ? { like: {} } : { dislike: {} };
    await program.methods.reactToTweet(reaction).rpc();
  };

  const addComment = async (tweetId, commentText) => {
    const program = anchor.workspace.twitter_dapp;
    await program.methods.addComment(commentText).rpc();
  };

  return (
    <SolanaContext.Provider
      value={{
        initializeProvider,
        createTweet,
        getTweet,
        reactToTweet,
        addComment,
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
};

export const useSolana = () => useContext(SolanaContext);
