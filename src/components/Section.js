import { ethers } from 'ethers'
// eslint-disable-next-line 
import React, { Component }  from 'react';


// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

         

            <div className='cards' >
                {items.map((item, index) => (
                    <div className='card' key={index} onClick={() => togglePop(item)}>
                        <div className='card__image' style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            padding: '50px',
            background: 'linear-gradient(to right, #E91E63, #fff)',
          }}>
                            <img src={item.image} alt="Item" />
                        </div>
                        <div className='card__info' >
                            <h4>{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;