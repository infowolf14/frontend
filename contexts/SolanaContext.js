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

  const CreateTweet = async (topic, content) => {
    const programId = new anchor.web3.PublicKey('7NUYbszYn5pharRs2bogkkXAGNabhaUcvenjyemrHCvG');
    const program = new anchor.Program(idl, programId, provider);
    await program.methods.CreateTweet(topic, content).rpc();
  };

  const GetTweet = async (tweetId) => {
    const programId = new anchor.web3.PublicKey('7NUYbszYn5pharRs2bogkkXAGNabhaUcvenjyemrHCvG');
    const program = new anchor.Program(idl, programId, provider);
    const tweet = await program.account.tweet.fetch(new PublicKey(tweetId));
    return tweet;
  };

  const ReactToTweet = async (tweetId, reactionType) => {
    const programId = new anchor.web3.PublicKey('7NUYbszYn5pharRs2bogkkXAGNabhaUcvenjyemrHCvG');
    const program = new anchor.Program(idl, programId, provider);
    const reaction = reactionType === 'like' ? { like: {} } : { dislike: {} };
    await program.methods.ReactToTweet(reaction).rpc();
  };

  const AddComment = async (tweetId, commentText) => {
    const programId = new anchor.web3.PublicKey('7NUYbszYn5pharRs2bogkkXAGNabhaUcvenjyemrHCvG');
    const program = new anchor.Program(idl, programId, provider);
    await program.methods.AddComment(commentText).rpc();
  };

  return (
    <SolanaContext.Provider
      value={{
        initializeProvider,
        CreateTweet,
        GetTweet,
        ReactToTweet,
        AddComment,
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
};

export const useSolana = () => useContext(SolanaContext);
