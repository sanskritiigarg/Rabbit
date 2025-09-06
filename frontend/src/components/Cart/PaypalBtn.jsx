import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalBtn = () => {
  return (
    <PayPalScriptProvider options={{ clientId: "AYIxW6GflAq3HUmsEtrqE98TUE9Kf83kR9mWLxnYr9nulN0y80_HP_3l5VpYs1CkzbdsUOeb48At-yrC" }}>
        <PayPalButtons style={{ layout: "vertical" }} />
    </PayPalScriptProvider>
  )
}

export default PaypalBtn