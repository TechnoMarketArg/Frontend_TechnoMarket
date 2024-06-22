import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import PropTypes from 'prop-types';

const Payment = ({ total }) => {
  const [mp, setMp] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const mpInstance = initMercadoPago('APP_USR-e85e4e51-29a1-488e-867e-a95ea3fc472d', { locale: 'es-AR' });
    setMp(mpInstance);
  }, []);

  const createCheckoutButton = (preferenceId) => {
    if (!mp) {
      console.error('MercadoPago instance not initialized');
      return;
    }
    const bricksBuilder = mp.bricks();
    const renderComponent = async () => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    };
    renderComponent();
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        title: 'su compra en ecommerce',
        quantity: 1,
        price: total,
      };

      const response = await fetch('http://localhost:4000/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const oreference = await response.json();
      setPreferenceId(oreference.id);
      createCheckoutButton(oreference.id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <button id="checkout-btn" onClick={handleCheckout}>Go to checkout</button>
      <div id="wallet_container"></div>
    </div>
  );
};

Payment.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Payment;
