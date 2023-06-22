import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// eslint-disable-next-line 
import React, { Component }  from 'react';


const Navigation = ({ account, setAccount }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://i.imgur.com/SjhjAq7.png',
    'https://i.imgur.com/ic9t1qy.png',
    'https://i.imgur.com/FquSh0o.png',
    'https://i.imgur.com/E2FZdFS.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, );

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav >
      <div className='imagenes' >
        <img
          src={images[currentImage]}
          alt='Sugar Rush CandyShop'
          style={{ width: '70px', height: 'auto' }}
        />
      </div>

      <div className='brand__image' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
    <img src='https://i.imgur.com/ouYjIf4.png' alt='Sugar Rush CandyShop' style={{ maxWidth: '700px', height: 'auto' }} />
</div>

      {account ? (
        <button type='button' className='nav__connect'    style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            padding: '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff7eae, #E91E63)',
            marginBottom: '20px'
          }}>
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type='button' className='nav__connect' onClick={connectHandler}    style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            padding: '20px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ff7eae, #E91E63)',
            marginBottom: '20px'
          }}>
          Connect Wallet
        </button>
      )}


      

    
    </nav>
  );
};

export default Navigation;




