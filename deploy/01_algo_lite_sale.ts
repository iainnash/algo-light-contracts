module.exports = async ({ getNamedAccounts, deployments, network }: any) => {
  const { deploy } = deployments;
  const { deployer, fractionalToken } = await getNamedAccounts();

  const deployedAddress = (await deployments.get("AlgoLite")).address;

  await deploy("AlgoLiteSale", {
    from: deployer,
    args: [
      deployedAddress,
      network.name === "hardhat" || network.name === "rinkeby"
        ? (
            await deployments.get("TestToken")
          ).address
        : fractionalToken,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLiteSale"];
module.exports.dependencies = ["AlgoLite", "TestToken"];
