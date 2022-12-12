const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    const box = await deploy("Box", {
        from: deployer,
        log: true,
        waitConfirmations: network.config.blockConfirmation | 1,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxBoxyAdmin",
                artifact: "BoxBoxyAdmin"
            }
        }
    })

    if(!developmentChains.includes(network.name)) {
        verify(box.address, [])
    }
}