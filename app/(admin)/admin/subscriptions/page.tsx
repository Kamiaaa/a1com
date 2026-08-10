'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiRefreshCw, 
  FiTrash2, 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiBox, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle 
} from 'react-icons/fi';

interface Subscription {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
  selectedPackage: {
    _id: string;
    name: string;
    speed: string;
    price: number;
  } | null;
}

export default function SubscribeListPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/subscriptions');
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setSubscriptions(result.data);
      }
    } catch (err) {
      console.error('Failed to load subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const result = await res.json();
      if (result.success) {
        setSubscriptions((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as any } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription request?')) return;

    try {
      const res = await fetch(`/api/subscriptions?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        setSubscriptions((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete subscription:', err);
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.selectedPackage?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FiCheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <FiPhone className="w-3.5 h-3.5" /> Contacted
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <FiXCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <FiClock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-700 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Subscription <span className="text-red-500">Requests</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage and track customer connection applications
            </p>
          </div>
          <button
            onClick={fetchSubscriptions}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all border border-slate-600 cursor-pointer disabled:opacity-50"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-4 px-6">Customer Details</th>
                  <th className="py-4 px-6">Requested Package</th>
                  <th className="py-4 px-6">Installation Address</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      <p className="mt-2 text-xs">Loading requests...</p>
                    </td>
                  </tr>
                ) : filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No subscription requests found.
                    </td>
                  </tr>
                ) : (
                  filteredSubscriptions.map((sub) => (
                    <motion.tr
                      key={sub._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      {/* Customer Info */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white mb-0.5">{sub.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <FiPhone className="w-3 h-3 text-red-400" /> {sub.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <FiMail className="w-3 h-3 text-red-400" /> {sub.email}
                        </div>
                      </td>

                      {/* Package Info */}
                      <td className="py-4 px-6">
                        {sub.selectedPackage ? (
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <FiBox className="text-red-400" /> {sub.selectedPackage.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {sub.selectedPackage.speed} — ৳{sub.selectedPackage.price}/mo
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Package removed</span>
                        )}
                      </td>

                      {/* Address */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-1.5 text-xs max-w-xs text-slate-300">
                          <FiMapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{sub.address}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FiCalendar />
                          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          {getStatusBadge(sub.status)}
                          <select
                            value={sub.status}
                            disabled={updatingId === sub._id}
                            onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg text-xs py-1 px-2 text-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Subscription Request"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}