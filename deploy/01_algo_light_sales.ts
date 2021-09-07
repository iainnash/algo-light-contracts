module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLightSale", {
    from: deployer,
    args: [
      deployments.get("AlgoLight").address,
      deployments.get("TestToken").address,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLightSale"];
module.exports.dependencies = ["TestToken", "AlgoLight"];
