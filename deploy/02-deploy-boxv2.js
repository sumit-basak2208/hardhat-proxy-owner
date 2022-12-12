const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    const boxV2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        waitConfirmations: network.config.blockConfirmation | 1,
    })

    if(!developmentChains.includes(network.name)) {
        verify(boxV2.address, [])
    }
}