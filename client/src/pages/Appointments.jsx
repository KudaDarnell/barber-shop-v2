import { useState, useEffect } from 'react';
import { appointmentsAPI } from '../services/api';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { getLocalDate, toLocalTime } from '../utils/time';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = async () => {
    try {
      const response = await appointmentsAPI.getAll(1, selectedDate);
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📅 Appointments</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6">
        {appointments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">📭 No appointments for this date</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(apt => (
              <div key={apt.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{apt.customer_name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{apt.service_type} • {toLocalTime(apt.appointment_time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    apt.appointment_status === 'completed' ? 'bg-green-100 text-green-600' :
                    apt.appointment_status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {apt.appointment_status}
                  </span>
                  {apt.appointment_status === 'scheduled' && (
                    <>
                      <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                        <CheckCircle size={20} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}