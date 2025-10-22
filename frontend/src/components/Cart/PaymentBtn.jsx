import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentBtn = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'AZKEmjd3eG4XkTzZELvnlsx7dPdlT17FFIc0ApjpTeM4ORdiTx_O9dFvOTijyzA9wPsZep41fCN6eJd8',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
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
