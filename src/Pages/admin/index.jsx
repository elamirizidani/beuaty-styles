import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  Star, 
  Eye, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  BarChart3,
  Settings
} from 'lucide-react';
import './adminStyles.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalProducts: 340,
    totalOrders: 890,
    revenue: 45680,
    avgRating: 4.3
  });

  const [products, setProducts] = useState([
    {
      _id: '1',
      name: 'Hydrating Face Serum',
      category: 'skincare',
      subcategory: 'serum',
      price: 29.99,
      attributes: { skinType: ['dry', 'normal'] },
      reviews: [{ rating: 5 }, { rating: 4 }],
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      name: 'Volumizing Shampoo',
      category: 'haircare',
      subcategory: 'shampoo',
      price: 19.99,
      attributes: { hairType: ['fine', 'oily'] },
      reviews: [{ rating: 4 }, { rating: 5 }, { rating: 3 }],
      createdAt: '2024-01-10'
    }
  ]);

  const [users, setUsers] = useState([
    {
      _id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      preferences: { skinType: 'dry', hairType: 'curly' },
      purchaseHistory: [{ productId: '1', date: '2024-01-20' }],
      createdAt: '2024-01-01'
    },
    {
      _id: '2',
      name: 'Emily Chen',
      email: 'emily@email.com',
      preferences: { skinType: 'oily', hairType: 'straight' },
      purchaseHistory: [{ productId: '2', date: '2024-01-18' }],
      createdAt: '2024-01-03'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const StatCard = ({ icon: Icon, title, value, change, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <Icon className={`w-8 h-8 text-${color}-500`} />
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      category: '',
      subcategory: '',
      description: '',
      price: '',
      attributes: { hairType: [], skinType: [], ingredients: [] }
    });

    const handleSubmit = () => {
      if (!formData.name) return;
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Category</option>
                  <option value="skincare">Skincare</option>
                  <option value="haircare">Haircare</option>
                  <option value="makeup">Makeup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {product ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={Users} title="Total Users" value={stats.totalUsers} change={12} />
        <StatCard icon={Package} title="Total Products" value={stats.totalProducts} change={8} />
        <StatCard icon={ShoppingCart} title="Total Orders" value={stats.totalOrders} change={15} />
        <StatCard icon={DollarSign} title="Revenue" value={`$${stats.revenue.toLocaleString()}`} change={23} />
        <StatCard icon={Star} title="Avg Rating" value={stats.avgRating} change={5} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <ShoppingCart className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">New order from Sarah Johnson</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">New 5-star review on Hydrating Serum</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">5 new user registrations</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            {products.slice(0, 3).map((product, index) => (
              <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${product.price}</p>
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <button
          onClick={() => setShowProductModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="all">All Categories</option>
          <option value="skincare">Skincare</option>
          <option value="haircare">Haircare</option>
          <option value="makeup">Makeup</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products
              .filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterCategory === 'all' || product.category === filterCategory)
              )
              .map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.subcategory}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product?.reviews?.length > 0 
                        ? (product.reviews.reduce((sum, r) => sum + r?.rating, 0) / product.reviews.length).toFixed(1)
                        : 'No reviews'
                      }
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowProductModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setProducts(products.filter(p => p._id !== product._id));
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">User Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferences</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.preferences.skinType && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded mr-1">
                      {user.preferences.skinType} skin
                    </span>
                  )}
                  {user.preferences.hairType && (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                      {user.preferences.hairType} hair
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.purchaseHistory.length} orders
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">User Interactions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span>Views</span>
              </div>
              <span className="font-semibold">2,340</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Likes</span>
              </div>
              <span className="font-semibold">890</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-green-500" />
                <span>Purchases</span>
              </div>
              <span className="font-semibold">456</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Skincare</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-sm">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Haircare</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
                <span className="text-sm">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Makeup</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '10%'}}></div>
                </div>
                <span className="text-sm">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Beauty Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
          onSave={(productData) => {
            if (selectedProduct) {
              setProducts(products.map(p => p._id === selectedProduct._id ? {...p, ...productData} : p));
            } else {
              setProducts([...products, {...productData, _id: Date.now().toString(), reviews: [], createdAt: new Date().toISOString()}]);
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;