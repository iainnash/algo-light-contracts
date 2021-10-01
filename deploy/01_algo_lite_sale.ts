module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer, fractionalToken } = await getNamedAccounts();

  const deployedAddress = (await deployments.get("AlgoLite")).address;

  await deploy("AlgoLiteSale", {
    from: deployer,
    args: [
      deployedAddress,
      fractionalToken,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLiteSale"];
module.exports.dependencies = ["AlgoLite"];
