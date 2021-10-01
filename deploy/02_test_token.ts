module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { purchaser } = await getNamedAccounts();

  await deploy("TestToken", {
    from: purchaser,
    args: [],
    log: true,
  });
};
module.exports.tags = ["TestToken"];
