import Button from './Button';

function ShoppingCart({ cart, removeFromCart, onCheckout, isSummary = false }) {
    // Calculate total price
    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    const style = isSummary ? {
        border: '1px solid #ccc',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    } : {
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
    };

    return (
        <div style={style}>
            <h3>{isSummary ? 'Cart Summary' : 'Shopping Cart'}</h3>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul style={{ padding: 0, listStyle: 'none', maxHeight: isSummary ? '200px' : 'auto', overflowY: isSummary ? 'auto' : 'visible' }}>
                        {cart.map(item => (
                            <li key={item.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 0',
                                borderBottom: '1px solid #ddd'
                            }}>
                                <div style={{ marginRight: '10px' }}>
                                    <strong>{item.title}</strong> × {item.quantity}
                                    <div>${item.price * item.quantity}</div>
                                </div>
                                <Button
                                    onClick={() => removeFromCart(item.id)}
                                    variant="danger"
                                    style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                                >
                                    −
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <div style={{
                        marginTop: '15px',
                        padding: '10px 0',
                        borderTop: '2px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <strong>Total:</strong>
                        <strong>${totalPrice}</strong>
                    </div>

                    <Button
                        onClick={onCheckout}
                        variant="success"
                        style={{ width: '100%', marginTop: '10px' }}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </div>
    );
}

export default ShoppingCart;
