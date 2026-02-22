import { useState, useEffect } from 'react';
import { productsAPI, invoicesAPI } from '../services/api';
import { Search, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export default function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll(1);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (index, change) => {
    const newCart = [...cart];
    newCart[index].qty += change;
    if (newCart[index].qty <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price * item.qty), 0);
  const tax = subtotal * 0; // No tax for now
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('⚠️ Cart is empty!');
      return;
    }

    if (!confirm(`Complete sale for $${total.toFixed(2)}?`)) return;

    try {
      await invoicesAPI.create({
        items: cart,
        total,
        payment_method: paymentMethod,
        amount_paid: total
      });
      alert('✅ Sale completed!');
      setCart([]);
    } catch (error) {
      alert('❌ Error: ' + (error.response?.data?.error || 'Failed to complete sale'));
    }
  };

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === 'all' || p.category === selectedCategory)
  );

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">🛒 Point of Sale</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition border-2 border-transparent hover:border-accent"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2">{product.product_name}</h3>
                  <p className="text-accent font-bold">${product.selling_price?.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Stock: {product.stock_quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ShoppingCart size={20} /> Cart
          </h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">🛒 Cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{item.product_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">${item.selling_price?.toFixed(2)} x {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(index, -1)} className="p-1 bg-gray-200 dark:bg-gray-600 rounded">
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-gray-800 dark:text-white">{item.qty}</span>
                    <button onClick={() => updateQty(index, 1)} className="p-1 bg-gray-200 dark:bg-gray-600 rounded">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => removeFromCart(index)} className="p-1 text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-2">
            <div className="flex justify-between text-gray-800 dark:text-white">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {['cash', 'card', 'mobile'].map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 rounded-lg font-semibold transition ${
                    paymentMethod === method
                      ? 'bg-accent text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                  }`}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full mt-4 bg-gradient-to-r from-accent to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            ✅ Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
}