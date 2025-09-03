import React from 'react'
import {HiOutlineCreditCard, HiShoppingBag} from 'react-icons/hi'
import {HiArrowPathRoundedSquare} from 'react-icons/hi2'

const FeaturedSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3 text-center'>
            
            {/*Feature 1 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag className='text-xl' />
                </div>
                <h4 className='tracking-tighter'>
                    FREE INTERNATIONAL SHIPPING
                </h4>
                <p className='tracking-tighter text-sm text-gray-600'>
                    On all orders above $100.00
                </p>
            </div>

            {/*Feature 2 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare className='text-xl' />
                </div>
                <h4 className='tracking-tighter'>
                    45 DAYS RETURN
                </h4>
                <p className='tracking-tighter text-sm text-gray-600'>
                    Moneyback guarantee
                </p>
            </div>

            {/*Feature 3 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard className='text-xl' />
                </div>
                <h4 className='tracking-tighter'>
                    SECURE CHECKOUT
                </h4>
                <p className='tracking-tighter text-sm text-gray-600'>
                    100% Secure Checkout
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturedSection