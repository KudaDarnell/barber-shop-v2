import { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export default function Reports() {
  const [reportType, setReportType] = useState('sales');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const reports = [
    { id: 'sales', label: '📊 Sales Report' },
    { id: 'profit', label: '💰 Profit Report' },
    { id: 'stock', label: '📦 Stock Movement' },
    { id: 'invoices', label: '🧾 Invoices' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📈 Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Report Type</h2>
          <div className="space-y-2">
            {reports.map(report => (
              <button
                key={report.id}
                onClick={() => setReportType(report.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  reportType === report.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200'
                }`}
              >
                {report.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
          <div className="flex gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
              <FileText size={20} /> Generate Report
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
              <Download size={20} /> Export
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
              <Printer size={20} /> Print
            </button>
          </div>

          <div className="mt-6 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Select date range and click Generate Report</p>
          </div>
        </div>
      </div>
    </div>
  );
}