import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturedSection from '../components/Products/FeaturedSection'

const Home = () => {
  const placeholderProducts = [
    {
      _id: 1,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=7',
            altText: "Stylish Top",}]
    },
    {
      _id: 3,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=8',
            altText: "Stylish Top",}]
    },
    {
      _id: 4,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=9',
            altText: "Stylish Top",}]
    },
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
      _id: 4,
      name: 'Stylish Top',
      price: 100,
      images: [{url: 'https://picsum.photos/500/500?random=9',
            altText: "Stylish Top",}]
    }
  ]

  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/*Best Seller*/}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails/>

        <div className='container mx-auto px-2'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
          <ProductGrid products={placeholderProducts}/>
        </div>

        <FeaturedCollection/>
        <FeaturedSection/>
    </div>
  )
}

export default Home