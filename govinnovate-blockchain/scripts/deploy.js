const hre = require("hardhat");

async function main() {
  console.log("=================================================");
  console.log("Deploying EvidenceRegistry Smart Contract...");
  console.log("=================================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer Address: ${deployer.address}`);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`Account Balance : ${hre.ethers.formatEther(balance)} ETH`);

  const EvidenceRegistry = await hre.ethers.getContractFactory("EvidenceRegistry");
  const registry = await EvidenceRegistry.deploy();
  await registry.waitForDeployment();

  const contractAddress = await registry.getAddress();
  console.log(`\nEvidenceRegistry deployed successfully!`);
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Owner Account   : ${await registry.owner()}`);
  console.log(`Network Name    : ${hre.network.name}`);
  console.log("=================================================\n");

  return contractAddress;
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
