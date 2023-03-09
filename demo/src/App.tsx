import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'
import Button from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import { detect, sendTx } from './action';
import { formatEther } from 'ethers';

declare global {
  interface Window{
    ethereum?:any
  }
}

const AccountCard = ({ethAdress, balance}: {ethAdress: string; balance: string}) => {
  const [loading, setLoading] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const handleToAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value);
  }

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }

  return (
    <div className='account'>
      <h2>Account:</h2>
      <div>{ethAdress}</div>
      <h4>
        <span>Balance:</span>
        <span>{formatEther(balance)} AXON</span>
      </h4>

      <Divider />

      <div>
        <h2>Transfer:</h2>
        <Box sx={{
          width: "800px",
          maxWidth: '100%',
          marginTop: '20px'
        }}>
          <TextField fullWidth label="To AXON Address" variant="outlined"  onChange={handleToAddress}/>
        </Box>
        <Box sx={{
          width: "800px",
          maxWidth: '100%',
          marginTop: '20px',
        }}>
          <TextField fullWidth label="Amount(AXON)" variant="outlined" onChange={handleAmount}/>
        </Box>

        <Button className='button' variant="contained" loading={loading} onClick={async () => {
          setLoading(true)
          await sendTx(toAddress, amount)
          setLoading(false)
        }}>
          Transfer
        </Button>
      </div>
    </div>
  )
}

function App() {
  const [ethAdress, setEthAddress] = useState('')
  const [balance, setBalance] = useState("0")
  const [loading, setLoading] = useState(false)

  return (
      <div className="App">
      <img src={logo} className="logo" alt="Axon logo" />
      <h1>Axon + MetaMask</h1>
      <div className="card">
        {!ethAdress && (<Button className='button' variant="contained" loading={loading} onClick={async () => {
          setLoading(true)
          await detect(setEthAddress, setBalance)
          setLoading(false)
        }}>
          Connect MetaMask
        </Button>)}
        { ethAdress && <AccountCard ethAdress={ethAdress} balance={balance}/> }
      </div>
    </div>
    
  )
}

export default App
