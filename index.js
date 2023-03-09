const ethers = require('ethers')

const run = async () => {
    const provider = new ethers.JsonRpcProvider("axon-rpc-url")

    const blockNumber = await provider.getBlockNumber()
    console.log('block number', blockNumber)

    const balance = await provider.getBalance("0xCb9112D826471E7DEB7Bc895b1771e5d676a14AF")
    console.log(`balance: ${ethers.formatEther(balance)} AXON`)
}

run()