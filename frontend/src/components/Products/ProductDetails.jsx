import React, { useEffect, useState } from 'react'
import {toast} from 'sonner'
import ProductGrid from './ProductGrid'

const ProductDetails = () => {
  const selectedProduct = {
    name: "stylish Jacket",
    price: 120,
    originalPrice: 150,
    description: "this is a stylish jacket for any occasion",
    brand: "Fashion",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [{
      url: 'https://picsum.photos/500/500?random=1',
      altText: "Stylish Jacket 1",
    },
    {
      url: 'https://picsum.photos/500/500?random=3',
      altText: "Stylish Jacket 1",
    },
    {
      url: 'https://picsum.photos/500/500?random=2',
      altText: "Stylish Jacket 1",
    },
  ]
  }

  const similarProducts = [
    {
      _id: 1,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=7',
            altText: "Stylish Top",}]
    },
    {
      _id: 2,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=6',
            altText: "Stylish Top",}]
    },
    {
      _id: 3,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=8',
            altText: "Stylish Top",}]
    },
  ]

  const [mainImage, setMainImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [ATCBtnDisabled, setATCBtnDisabled] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url)
    }
  }, [selectedProduct?.id])

  const handleQuantityClick = (operation) => {
    if (operation === 'minus') {
      if (quantity > 1)  
        setQuantity((prev) => prev-1)
      }
    else setQuantity((prev) => prev+1)
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Select Size and Color to add the product to cart", {duration:1000})
      return
    }

    setATCBtnDisabled(true)
    setTimeout(()=> {
      toast.success("Product added to the Cart", {duration: 1000})
      setATCBtnDisabled(false)
    }, 500)
  }

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col lg:flex-row'>
          {/*Left Thumbnails */}
          <div className='hidden lg:flex flex-col space-y-4 mr-6'>
            {selectedProduct.images.map((image, index) => 
              <img src={image.url} alt={image.altText || `Thumbnail ${index}`} key={index} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image.url ? "border-black" : "border-white"}`} onClick={() => {setMainImage(image.url)}}/>
            )}
          </div>

          {/*Main image */}
          <div className='lg:w-1/2'>
            <div className='mb-4'>
              <img src={mainImage} alt="Main Product" className='w-full h-auto object-cover rounded-lg' />
            </div>
          </div>

          {/*Mobile thumbnail */}
          <div className='lg:hidden flex overscroll-x-auto space-x-4 mb-4'>
              {selectedProduct.images.map((image, index) => 
              <img src={image.url} alt={image.altText || `Thumbnail ${index}`} key={index} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === image.url ? "border-black" : "border-white"}`} onClick={() => {setMainImage(image.url)}}/>
            )}
          </div>

          {/*Product details on right */}
            <div className='lg:w-1/2 lg:ml-10'>
              <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                {selectedProduct.name}
              </h1>
              <p className='text-md text-gray-600 mb-1 line-through'>
                {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
              </p>
              <p className='text-gray-600 mb-4 text-lg'>
                {selectedProduct.price.toLocaleString('en-US', {style:'currency', currency:'USD',})}
              </p>
              <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>

              <div className='mb-4'>
                <p className='text-gray-700'>Color:</p>
                <div className='flex gap-2 mt-2'>
                  {selectedProduct.colors.map((color) => (
                    <button key={color} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-200'}`} style={{backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.8)",}} onClick={() => setSelectedColor(color)}></button>
                  ))}
                </div>
              </div>

              <div className='mb-4'>
                  <p className='text-gray-700'>Size:</p>
                  <div className='flex gap-2 mt-2'>
                    {selectedProduct.sizes.map((size) => (
                      <button key={size} className={`px-4 py-2 rounded border ${selectedSize === size ? 'bg-black text-white': ''}`} onClick={() => setSelectedSize(size)}>
                        {size}
                      </button>
                    ))}
                  </div>
              </div>

              <div className='mb-6'>
                <p className='text-gray-700'>Quantity:</p>
                <div className='flex items-center space-x-4 mt-2'>
                  <button className='px-2 py-1 bg-gray-200 rounded text-lg' onClick={() => handleQuantityClick('minus')}>-</button>
                  <span className='text-lg w-4 text-center'>{quantity}</span>
                  <button className='px-2 py-1 bg-gray-200 rounded text-l'  onClick={() => handleQuantityClick('plus')}>+</button>
                </div>
              </div>

              <button className={`bg-black text-white py-2 px-6 rounded mb-4 w-full ${ATCBtnDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-800'}`} onClick={handleAddToCart} disabled={ATCBtnDisabled}>
                {ATCBtnDisabled ? 'Adding to Cart' : 'Add to Cart'}</button>
            </div>
        </div>

        <div className='mt-15'>
          <h2 className='text-2xl font-medium text-center mb-4'>
            You may also like
          </h2>
          <ProductGrid products={similarProducts} /> 
        </div>
      </div>
    </div>

      
  )
}

export default ProductDetails