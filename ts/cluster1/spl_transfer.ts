import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BsH1r5u9iMFdmAijeKby3nMpHF7pytNYykPNKDpY9pLs");

// Recipient address
const toWallet = new PublicKey("4gTWiPwC7AHdsu6BtySRd9KvEZVJmhQJRkB9rNH2P1Kj");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const sender_ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    // Get the token account of the toWallet address, and if it does not exist, create it
    const receiver_ata2 = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      toWallet
    );
    // Transfer the new token to the "toTokenAccount" we just created
    const tx = await transfer(
      connection,
      keypair,
      sender_ata.address,
      receiver_ata2.address,
      keypair,
      100000 * 1_000_000
    );
    console.log(`Transaction signature: ${tx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
