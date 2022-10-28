async function main() {
    const refundFactory = await ethers.getContractFactory("refundByLocation");
 
    // Start deployment, returning a promise that resolves to a contract object
    const refundConract = await refundFactory.deploy();
    await refundConract.deployed();
    console.log("Contract deployed to address:", refundConract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });