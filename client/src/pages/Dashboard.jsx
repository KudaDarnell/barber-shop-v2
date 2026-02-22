import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLocalDate } from '../utils/time';
import { TrendingUp, Users, Package, DollarSign, Calendar, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalAppointments: 0,
    totalProducts: 0,
    totalCustomers: 0,
    lowStock: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        totalSales: 15750.00,
        totalAppointments: 45,
        totalProducts: 38,
        totalCustomers: 127,
        lowStock: 5,
        pendingAppointments: 8,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    { icon: DollarSign, label: "Today's Sales", value: `$${stats.totalSales.toFixed(2)}`, color: 'bg-green-500' },
    { icon: Calendar, label: "Appointments", value: stats.totalAppointments, color: 'bg-blue-500' },
    { icon: Package, label: "Products", value: stats.totalProducts, color: 'bg-purple-500' },
    { icon: Users, label: "Customers", value: stats.totalCustomers, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📊 Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}! | {getLocalDate()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 border-l-4 border-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">⚠️ Low Stock Alerts</h2>
          <div className="space-y-3">
            {stats.lowStock > 0 ? (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-600 dark:text-red-400">
                  ⚠️ {stats.lowStock} products are low on stock and need reordering!
                </p>
              </div>
            ) : (
              <p className="text-green-600 dark:text-green-400">✅ All products are well stocked</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📅 Pending Appointments</h2>
          <div className="space-y-3">
            {stats.pendingAppointments > 0 ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-600 dark:text-blue-400">
                  📋 {stats.pendingAppointments} appointments pending confirmation
                </p>
              </div>
            ) : (
              <p className="text-green-600 dark:text-green-400">✅ No pending appointments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}