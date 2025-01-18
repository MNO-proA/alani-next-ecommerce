"use client" 


import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// More distinct color palette for payment methods
const COLORS = {
  primary: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
  payment: ['#22c55e', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'],
  neutral: ['#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'],
  warning: ['#d97706', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7']
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((res) => res.json()).then(setOrders);
    fetch("/api/categories").then((res) => res.json()).then(setCategories);
    fetch("/api/products").then((res) => res.json()).then(setProducts);
  }, []);

  // Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order?.totalAmount || 0), 0);
  const totalQuantity = orders.reduce((sum, order) => sum + parseInt(order?.totalQty || 0), 0);

  // Category distribution data
  const categoryData = categories.map((category) => ({
    name: category.name,
    value: products.filter((product) => product.categoryId === category.id).length
  }));

  // Payment method distribution with custom legend
  const paymentMethods = orders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const paymentMethodData = Object.entries(paymentMethods).map(([method, count], index) => ({
    name: method,
    value: count,
    color: COLORS.payment[index % COLORS.payment.length]
  }));

  // Top 3 products by revenue
  const topProductsData = products
    .map((product) => ({
      name: product.title,
      revenue: orders
        .filter((order) => order.cart_items?.some(item => item._id === product._id))
        .reduce((sum, order) => {
          const item = order.cart_items.find(item => item._id === product._id);
          return sum + (item?.price || 0) * (item?.quantity || 0);
        }, 0)
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  // Improved daily orders calculation
  const ordersByDay = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  // Fill in missing dates
  const timeSeriesData = (() => {
    const dates = Object.keys(ordersByDay).sort();
    if (dates.length < 2) return [];
    
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const data = [];
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      data.push({
        date: new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
        orders: ordersByDay[dateStr] || 0
      });
    }
    return data;
  })();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Revenue Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-gray-500 text-sm font-medium">Total Revenue</h2>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-semibold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <span className="ml-2 text-sm text-gray-500">USD</span>
          </div>
        </motion.div>

        {/* Quantity Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-gray-500 text-sm font-medium">Total Items Sold</h2>
          <p className="mt-2 text-4xl font-semibold text-gray-900">{totalQuantity.toLocaleString()}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     

        {/* Payment Methods */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentMethodData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Products */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Top 3 Products by Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill={COLORS.warning[1]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders Over Time */}
        <motion.div
          variants={chartVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke={COLORS.primary[0]}
                strokeWidth={2}
                dot={{ fill: COLORS.primary[0], r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
           {/* Category Distribution */}
           <motion.div
          variants={chartVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS.primary[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;