import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { Search, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = products.filter(p => p.stock_quantity <= p.reorder_level);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📦 Products & Inventory</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
          <Plus size={20} /> Add Product
        </button>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={24} />
          <p className="text-red-600 dark:text-red-400">
            ⚠️ {lowStock.length} products are low on stock!
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Product Name</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Barcode</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Category</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Cost</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Price</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Stock</th>
                <th className="px-4 py-3 text-left text-gray-800 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-t border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-3 text-gray-800 dark:text-white">{product.product_name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{product.barcode || 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{product.category}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">${product.cost_price?.toFixed(2)}</td>
                  <td className="px-4 py-3 text-accent font-semibold">${product.selling_price?.toFixed(2)}</td>
                  <td className={`px-4 py-3 ${product.stock_quantity <= product.reorder_level ? 'text-red-500 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {product.stock_quantity}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}