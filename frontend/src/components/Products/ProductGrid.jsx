import React from 'react'
import { Link } from 'react-router'

const ProductGrid = ({products}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product, index) => (
            <Link key={index} to={`/products/${product._id}`} className='block p-4'>
                <div className='bg-white rounded-lg  w-full h-96 mb-4'>
                    <img src={product.images[0]?.url} alt={product.images[0]?.altText}  className='w-full h-full object-cover rounded-lg'/>
                </div>
                <h3 className='text-sm mb-2'>{product.name}</h3>
                <p className='text-gray-500 font-medium text-sm tracking-tighter'>{product.price.toLocaleString('en-us', {style:'currency', currency:'USD',})}</p>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid