module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLiteSale", {
    from: deployer,
    args: [
      (await deployments.get("AlgoLite")).address,
      (await deployments.get("TestToken")).address,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLiteSale"];
module.exports.dependencies = ["TestToken", "AlgoLite"];
