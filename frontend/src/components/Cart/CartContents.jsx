import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 1,
      name: "Jeans",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 25,
      image: "https://picsum.photos/200?random=2",
    }
  ]
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div key={index} className='flex items-start justify-between py-4 border-b'>
          <div className='flex items-start'>
            <img src={product.image} alt={product.name} className='h-24 w-20 object-cover mr-3 rounded'/>
          <div>
            <h3>{product.name}</h3>
            <p className='text-sm text-gray-600'>{product.size} | {product.color}</p>
            <div className='flex items-center mt-2'>
              <button className='border rounded px-1.5 py-0.5 text-xl font-medium'>-</button>
              <span className='mx-3'>{product.quantity}</span>
              <button className='border rounded px-1.5 py-0.5 text-xl font-medium'>+</button>
            </div>
          </div>
          </div>
          <div >
            <p>{product.price.toLocaleString('en-US', {style:'currency', currency:'USD', /* currencyDisplay:'code' */})}</p>
            <button className=''>
              <RiDeleteBin3Line className='h-5 w-5 mt-1 text-red-600'/>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents