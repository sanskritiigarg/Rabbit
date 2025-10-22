import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const PaymentBtn = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then((details) => onSuccess(details));
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentBtn;
