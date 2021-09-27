module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLite", {
    from: deployer,
    args: [
      "Algo Lite",
      "ALGLT",
      "https://buo7dhteahrnurg7h3oysx3ldezloaopronrtnyssqfbvqsamqfa.arweave.net/DR3xnmQB4tpE3z7diV9rGTK3Ac-Lmxm3EpQKGsJAZAo/",
      2400,
      '0x83CC26027b90cb66D9d23f94Ff17504767CD3696',
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLite"];
