// // Import Push SDK & Ethers
// import { PushAPI } from "@pushprotocol/restapi";
// import { ethers } from "ethers";

// export const toast = async (title, body, address) => {
//   const signer = address ? address : ethers.Wallet.createRandom();
//   const userAlice = await PushAPI.initialize(signer, { env: "staging" });
//   userAlice.channel.send(["*"], {
//     notification: {
//       title,
//       body,
//     },
//   });
// };
