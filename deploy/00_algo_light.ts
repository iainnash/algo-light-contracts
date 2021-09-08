module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("AlgoLight", {
    from: deployer,
    args: [
      "Algo-LightTest",
      "ALIGHTTEST",
      "https://t4ot4q4obxpxg54zjzuzvjuw6vbcs7zgo2qpjhf5ui5xijjemmdq.arweave.net/nx0-Q44N33N3mU5pmqaW9UIpfyZ2oPScvaI7dCUkYwc/metadata/",
      10,
    ],
    log: true,
  });
};
module.exports.tags = ["AlgoLight"];
