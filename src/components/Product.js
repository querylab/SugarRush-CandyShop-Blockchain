import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
// eslint-disable-next-line 
import React, { Component }  from 'react';

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)
  const [isBuying, setIsBuying] = useState(false)

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await dappazon.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    setIsBuying(true); // Activar el estado de "compra en progreso"

    const signer = await provider.getSigner()

    // Comprar el artículo...
    let transaction = await dappazon.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()

    setHasBought(true)
    setIsBuying(false); // Desactivar el estado de "compra en progreso"
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchDetails()
  }, [hasBought])

  return (
    <div className="product" >
      <div className="product__details" style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            padding: '50px',
            background: 'linear-gradient(to right, #E91E63, #fff)',
          }}>
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order" style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            padding: '50px',
            background: 'linear-gradient(to right, #E91E63, #ff7eae)',
          }}>

          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH </h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button
            className={`product__buy ${isBuying ? 'loading' : ''}`}
            onClick={buyHandler}
            style={{
              border: '7px solid #fff',
              borderRadius: '20px',
              color: '#fff',
              padding: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ff7eae, #E91E63)',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {isBuying ? (
              <div className="spinner"></div>
            ) : (
              'Buy Now'
            )}
          </button>

          <p><small>Ships from</small> Sugar Rush</p>
          <p><small>Sold by</small> Sugar Rush</p>

          {order !== null && (
            <div className='product__bought' >
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>

        <button onClick={togglePop} className="product__close" >
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
}

export default Product;