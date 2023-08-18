import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const buttonStyle = {
    backgroundColor: "#9BCDD2",
    color: "#fff",
    border: "none",
    padding: "20px 30px",
    fontSize: "20px",
    cursor: "pointer",
    margin: "1rem",
    cursor: "pointer"
  };

  const buttonHoverStyle = {
    backgroundColor: "#ffff" // New background color for hover state
  }

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      alert("1 Ether is deposited in Your Account !");
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      alert("1 Ether is Withdraw from your Your Account !");
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount} style={buttonStyle}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

  
    
    const buttonTextStyle = {
      margin: 0, // Remove default margin from h5
      fontSize: "inherit", // Inherit font size from parent (button)
      // padding:"2rem"
    };
    

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit} style={buttonStyle} ><h5 style={buttonTextStyle}>Deposit 1 ETH</h5></button>
        <button onClick={withdraw} style={buttonStyle}><h5 style={buttonTextStyle} >Withdraw 1 ETH</h5></button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>
        {`
          *{
            background-color: grey;

          }
          .container {
            text-align: center;
            background-color: #272829;
            background-size: cover;
            color: #fff;
            font-family: "Algerian", serif;
          }

          header {
            padding: 34px;
          }

          h1 {
            font-family: "Arial", serif;
            font-size: 70px;
            margin-bottom: 20px;
            color:#9BCDD2;
          }

          p {
            font-size: 22px;
            margin-bottom: 20px;
          }

          .button {
            background-color: #4caf50;
            color: #fff;
            border: none;
            padding: 20px 30px;
            font-size: 20px;
            cursor: pointer;
          }

          button:hover {
              background-color: ${buttonHoverStyle.backgroundColor};
          }
        `}
      
      </style>
    </main>
  )
}
