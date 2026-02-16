import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cart, removeFromCart, onCheckout }) {
    return (
        <div>
            <h1>Your Shopping Cart</h1>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <ShoppingCart 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    onCheckout={onCheckout} 
                />
            </div>
        </div>
    );
}

export default CartPage;
