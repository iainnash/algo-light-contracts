module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLightSale", {
    from: deployer,
    args: [
      (await deployments.get("AlgoLight")).address,
      (await deployments.get("TestToken")).address,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLightSale"];
module.exports.dependencies = ["TestToken", "AlgoLight"];
