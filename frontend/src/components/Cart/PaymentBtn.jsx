import React, { act } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { data } from 'react-router';

const PaypalBtn = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ 'client-id': 'YOUR_SANDBOX_CLIENT_ID', currency: 'USD' }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD', // must match above
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalBtn;
