"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, Calendar, MapPin, Phone, CreditCard, User, CheckCircle, XCircle } from "lucide-react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS'
    }).format(price);
  };

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 bg-gray-2 min-h-screen">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-title-lg font-bold text-black">Orders</h1>
              <p className="text-body mt-1">Manage and track your customer orders</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            <div className="flex items-center gap-2">
              <XCircle size={20} />
              <p>{error}</p>
            </div>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-2 border-b border-stroke">
                  <th className="py-5 px-6 text-left font-medium text-black">Date</th>
                  <th className="py-5 px-6 text-left font-medium text-black">Order Details</th>
                  <th className="py-5 px-6 text-left font-medium text-black">Customer Details</th>
                  <th className="py-5 px-6 text-left font-medium text-black">Payment Info</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <motion.tr
                      key={order._id}
                      variants={itemVariants}
                      className="border-b border-stroke hover:bg-gray-2 transition-colors duration-200"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-3 rounded-lg flex items-center justify-center">
                            <Calendar className="text-primaryAdmin" />
                          </div>
                          <span className="font-medium text-black">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Total Amount:</span>
                            <span className="font-semibold text-primaryAdmin">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {order.cart_items.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Package size={16} className="text-primaryAdmin" />
                                <span className="flex-1">{item.title}</span>
                                <span className="text-gray-500">×{item.quantity}</span>
                                <span className="font-medium">{formatPrice(item.price)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">
                            Total Items: {order.totalQty}
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-500" />
                            <span className="font-medium">{order.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin size={16} />
                            <span>{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Phone size={16} />
                            <span>{order.phone}</span>
                          </div>
                          {order.gps && (
                            <div className="text-sm text-gray-500">
                              GPS: {order.gps}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {order.paid ? (
                              <>
                                <CheckCircle className="text-green-500" size={20} />
                                <span className="text-green-500 font-medium">Paid</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="text-red-500" size={20} />
                                <span className="text-red-500 font-medium">Unpaid</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard size={16} className="text-gray-500" />
                            <span className="font-medium">{order.paymentMethod || 'N/A'}</span>
                          </div>
                          {order.paymentReference && (
                            <div className="text-sm text-gray-500">
                              Ref: {order.paymentReference}
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DefaultLayout>
  );
}