import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import PaypalBtn from './PaypalBtn'

const cart = {
    products: [
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
  ]}

const Checkout = () => {
    const navigate = useNavigate()
    const [checkoutId, setCheckoutId] = useState(null)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const handleCreateCheckout = (e) => {
      e.preventDefault()
      setCheckoutId(123)
    }

    const handlePaymentSuccess = (details) => {
      console.log("Payment succesful", details);
      navigate('/order-confirmation')
      
    }
  return (
    <div className='p-8 grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto'>
        {/*Left section */}
        <div className='border-1 border-gray-200 p-4'>
            <h2 className='mb-4 text-2xl font-bold'>Checkout</h2>
            <form onSubmit={handleCreateCheckout}>
              <h3 className='text-lg mb-2 font-medium'>Contact Details</h3>
              <div className='mb-4'>
                  <label className='block mb-1'>Email</label>
                  <input type="email" disabled className='p-2 border border-gray-300 bg-gray-100 text-gray-500 w-full rounded' value={'user@example.com'}/>
              </div>
              <h3 className='text-lg mb-2 font-semibold'>Delivery Address</h3>
              <div className='grid grid-cols-2 gap-4 mb-3'>
                <div>
                  <label className='block mb-1'>First Name</label>
                  <input type="text" className='p-2 border rounded w-full'                    required value={shippingAddress.firstName} onChange={(e) => {setShippingAddress({...shippingAddress, firstName: e.target.value})}}/>
                </div>

                <div>
                  <label className='block mb-1'>Last Name</label>
                  <input type="text" className='p-2 border rounded w-full'
                  required value={shippingAddress.lastName} onChange={(e) => {setShippingAddress({...shippingAddress, lastName: e.target.value})}}/>
                </div>
              </div>

              <div className='mb-3'>
                <label className='block mb-1'>Address</label>
                <input type="text" className='p-2 border rounded w-full'
                required value={shippingAddress.address} onChange={(e) => {setShippingAddress({...shippingAddress, address: e.target.value})}}/>
              </div>
                
              <div className='grid grid-cols-2 gap-4 mb-3'>
                <div>
                  <label className='block mb-1'>City</label>
                  <input type="text" className='p-2 border rounded w-full'
                    required value={shippingAddress.city} onChange={(e) => {setShippingAddress({...shippingAddress, city: e.target.value})}}/>
                </div>

                <div>
                  <label className='block mb-1'>Postal Code</label>
                  <input type="text" className='p-2 border rounded w-full'
                  required value={shippingAddress.pincode} onChange={(e) => {setShippingAddress({...shippingAddress, pincode: e.target.value})}}/>
                </div>
              </div>

              <div className='mb-3'>
                <label className='block mb-1'>Country</label>
                <input type="text" className='p-2 border rounded w-full'
                required value={shippingAddress.country} onChange={(e) => {setShippingAddress({...shippingAddress, country: e.target.value})}}/>
              </div>

              <div className='mb-3'>
                <label className='block mb-1'>Phone</label>
                <input type="text" className='p-2 border rounded w-full'
                required value={shippingAddress.phone} onChange={(e) => {setShippingAddress({...shippingAddress, phone: e.target.value})}}/>
              </div>

              <div className='mt-5'>
                {!checkoutId ? (
                  <button className='bg-black w-full text-white py-3 px-1 rounded hover:bg-gray-800 mt-3'>Continue to Payment</button>
                ) :
                (
                  <div>
                    <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                    {/*Paypal component */}
                    <PaypalBtn onSuccess={handlePaymentSuccess} amount={100}  onError={(err) => alert("Payment failed. Try again")} />
                  </div>
                )}
              </div>
              
            </form>
        </div>

        <div>
          <h2>Order Summary</h2>
        </div>
    </div>
  )
}

export default Checkout