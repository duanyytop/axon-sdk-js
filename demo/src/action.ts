import detectEthereumProvider from '@metamask/detect-provider'
import { Maybe } from '@metamask/providers/dist/utils';
import { ethers, parseEther } from 'ethers';

export const detect = async (setEthAddress: Function, setBalance: Function) => {
    const provider = await detectEthereumProvider()
    if (provider?.isMetaMask) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      } else {
        const accounts: Maybe<string[]> = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts?.length && accounts?.length > 0) {
          const ethAddress = accounts[0]
          if (!ethAddress) {
            throw new Error('Ethereum address error')
          }
          const balance = await window.ethereum.request({method: 'eth_getBalance', params: [ethAddress]})
          setEthAddress(ethAddress)
          setBalance(balance)
        }
      }
    } else {
      console.log('Please install MetaMask!')
    }
  }
  

  export const sendTx =async (to: string, amount: string) => {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed so are
        // only have read-only access
        console.log("MetaMask not installed; using read-only defaults")
    } else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)

        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        signer = await provider.getSigner();

        const tx = await signer.sendTransaction({
          to,
          value: parseEther(amount)
        });
        
        // Often you may wish to wait until the transaction is mined
        const receipt = await tx.wait();
        console.log(JSON.stringify(receipt))
    }
  }