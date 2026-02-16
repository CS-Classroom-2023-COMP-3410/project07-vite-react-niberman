import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import ShoppingCart from './components/ShoppingCart';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  
  // Products state lifted to App level so it can be shared across pages
  const initialProducts = [
      {
          id: 1,
          title: 'Smartphone',
          description: 'Latest model with advanced features',
          price: 699,
          stock: 15,
          
      },
      {
          id: 2,
          title: 'Laptop',
          description: 'Powerful laptop for work and gaming',
          price: 1299,
          stock: 8,
      },
      {
          id: 3,
          title: 'Headphones',
          description: 'Noise-cancelling wireless headphones',
          price: 249,
          stock: 23,
      },
      {
          id: 4,
          title: 'Smartwatch',
          description: 'Fitness tracking and notifications',
          price: 199,
          stock: 12,
      }
  ];

  const [products, setProducts] = useState(initialProducts);

  // Simple navigation state management
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const addToCart = (product) => {
    // Check if product has stock
    const productInState = products.find(p => p.id === product.id);
    if (!productInState || productInState.stock <= 0) return;

    // Update stock
    setProducts(products.map(p =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));

    // Add to cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        setCart(cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    // Update product stock
    setProducts(products.map(p =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
    ));

    // Update cart
    if (item.quantity > 1) {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        ));
    } else {
        setCart(cart.filter(item => item.id !== productId));
    }
  };

  const confirmCheckout = () => {
    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );
    alert(`Checkout completed for $${totalPrice}!`);
    setCart([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage 
                  products={products}
                  cart={cart}
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart} 
                />;
      case 'profile':
        return <ProfilePage />;
      case 'cart':
          return <CartPage 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    onCheckout={confirmCheckout}
                />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <main>
        {renderPage()}
      </main>

      {/* Cart Summary on every page if items present */}
      {cart.length > 0 && currentPage !== 'cart' && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
             <ShoppingCart 
                cart={cart} 
                removeFromCart={removeFromCart} 
                onCheckout={confirmCheckout}
                isSummary={true} 
             />
        </div>
      )}

      <footer style={{
        marginTop: '50px',
        padding: '20px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;
