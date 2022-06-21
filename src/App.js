import React, { useEffect, useState } from 'react';
import './App.css';

const TEST_GIFS = [
	'https://media1.giphy.com/media/hPyvpMYDBXCbC/giphy.gif?cid=ecf05e47bgl604o47x7pbvf1s376ejh1q5s7p6n362vo3hzc&rid=giphy.gif&ct=g',
	'https://media1.giphy.com/media/DAmy5grHup1XW/giphy.gif?cid=ecf05e47zslwj899lwg40yvlptk3esnw5jt239kx0kzs2cie&rid=giphy.gif&ct=g',
	'https://media0.giphy.com/media/Qu7Q9rtenwGLrMm47H/giphy.gif?cid=ecf05e47m4v1444klzl0p2z6q84f2m5pdieq4iyjyetvhraa&rid=giphy.gif&ct=g',
	'https://media2.giphy.com/media/j4jfPFk6QhYCn9V83Q/giphy.gif?cid=ecf05e47n70qe0xcydwkw0g0y1vlu4xrensk80oy630qhn67&rid=giphy.gif&ct=g'
]

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
        }
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());

      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
       <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}
    >
      <input type="text" placeholder="Enter GIF link..." value={inputValue} onChange={onInputChange} />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
      <div className="gif-grid">
        {gifList.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">⭐ Benz Collection Wall</p>
          <p className="sub-text">
            View your collection ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
   
      </div>
    </div>
  );
};

export default App;
