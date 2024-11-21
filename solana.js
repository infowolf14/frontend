import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { NETWORK_URL, PROGRAM_ID } from './config';

export const connection = new Connection(NETWORK_URL, 'confirmed');

// Set up wallet connection (using Phantom for example)
export const getProvider = (wallet) => {
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  return provider;
};

// Initialize your program
export const getProgram = (provider) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  return program;
};
