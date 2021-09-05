module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLight", {
    from: deployer,
    args: [
      "Algo-Light",
      "ALIGHT",
      "https://example.com/metadata-base/",
      10,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLight"];
