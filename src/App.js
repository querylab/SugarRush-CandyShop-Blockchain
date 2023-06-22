import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
// eslint-disable-next-line 
import React, { Component }  from 'react';

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Candyshop from './abis/Candyshop.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [candyshop, setCandyshop] = useState(null)

  const [account, setAccount] = useState(null)

  const [candys, setCandys] = useState(null)
  const [icecream, setIcecream] = useState(null)
  const [chocolates, setChocolates] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const candyshop = new ethers.Contract(config[network.chainId].candyshop.address, Candyshop, provider)
    setCandyshop(candyshop)

    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await candyshop.items(i + 1)
      items.push(item)
    }

    const candys = items.filter((item) => item.category === 'candys')
    const icecream = items.filter((item) => item.category === 'icecream')
    const chocolates = items.filter((item) => item.category === 'chocolates')

    setCandys(candys)
    setIcecream(icecream)
    setChocolates(chocolates)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />


      {candys && icecream && chocolates && (
        <>
          <Section title={<img src="https://i.imgur.com/LdYt2w5.png" alt="Ice Cream" />} items={icecream} togglePop={togglePop} />    
               
              <Section title={<img src="https://i.imgur.com/GyqaQ4v.png" alt="Candys" />} items={candys} togglePop={togglePop} />
             <Section title={<img src="https://i.imgur.com/ON8sXZe.png" alt="Chocolates" />} items={chocolates} togglePop={togglePop} />



        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={candyshop} togglePop={togglePop} />
      )}
 <footer style={{ textAlign: "center", marginTop: "20px" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">
      <img src="https://repository-images.githubusercontent.com/322583197/e7958f30-5dcf-4101-9f18-63aa08a338bb"  width={40} alt="GitHub" />
    </a>
    
    <p style={{ fontWeight: "bold", marginTop: "10px" }}>
  Made with <span role="img" aria-label="love">❤️</span> by querylab
</p>
  </div>

</footer>


    </div>
  );
}

export default App;
