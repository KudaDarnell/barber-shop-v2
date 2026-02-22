import { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function Cashup() {
  const [cashInHand, setCashInHand] = useState('');
  const [cardTotal, setCardTotal] = useState('');
  const [expenses, setExpenses] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Cash-Up completed! (Connect to API)');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">💵 Cash-Up</h1>

      <div className="max-w-2xl bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-400">Important</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              Cash-Up should be done at the end of each shift. This will reset values for the next shift.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <DollarSign size={16} className="inline" /> Cash In Hand
            </label>
            <input
              type="number"
              step="0.01"
              value={cashInHand}
              onChange={(e) => setCashInHand(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              💳 Card Payments Total
            </label>
            <input
              type="number"
              step="0.01"
              value={cardTotal}
              onChange={(e) => setCardTotal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              📉 Expenses
            </label>
            <input
              type="number"
              step="0.01"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              📝 Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              rows="3"
              placeholder="Any discrepancies or notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            ✅ Complete Cash-Up
          </button>
        </form>
      </div>
    </div>
  );
}