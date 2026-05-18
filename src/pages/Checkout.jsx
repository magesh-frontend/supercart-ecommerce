function Checkout() {
  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={() => alert("Order placed successfully!")}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;