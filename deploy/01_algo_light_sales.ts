module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy  } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("CollecionSales", {
    from: deployer,
    args: [
      deploy.getDeploymentAt("Collection")
    ],
    log: true,
  });
};
module.exports.tags = ["CollecionSales"];
