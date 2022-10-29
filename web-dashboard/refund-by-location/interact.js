import * as createAlchemyWeb3  from "@alch/alchemy-web3";
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
//const web3 = createAlchemyWeb3(API_KEY); 
const contract = require("../../artifacts/contracts/refundByLocation.sol/refundByLocation.json")
export const RefundContract = new web3.eth.Contract(
  contract,
  CONTRACT_ADDRESS
);

// export async function getEmployee() {
//   const contract = require("../../artifacts/contracts/refundByLocation.sol/refundByLocation.json")

//   const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

//   // Signer
//   const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//   // Contract
//   const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
//     // await helloWorldContract.addEmployee(
//     //     "0x1Ad3C5B50edEac55991E31FbCEC20166fa1D1912",
//     //     9,
//     //     38,
//     //     10,
//     //     10
//     // );
//     // await helloWorldContract.addEmployee(
//     //     "0x5363301c5d991cdEa02a0d542EaC9B9d3DcdCa5F",
//     //     9,
//     //     39,
//     //     10,
//     //     10
//     // );
//     let val = await helloWorldContract.getEmployee()
//     //let val = await helloWorldContract.sqrt(4)
//     console.log(val)
//   }
  
// async function main() {
//     const message = await helloWorldContract.sqrt(4);
//     console.log("The message is: " + message);
//   }
//   main();


  


