"use client" 

import React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch("/api/orders").then((res) => res.json()).then(setOrders);
      fetch("/api/categories").then((res) => res.json()).then(setCategories);
      fetch("/api/products").then((res) => res.json()).then(setProducts);
    }, []);

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   console.log(typeof(orders.totalAmount))
//   console.log(categories)
//   console.log(products)

   // Revenue and quantity calculations
   const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order?.totalAmount), 0);
   const totalQuantity = orders.reduce((sum, order) => sum + parseInt(order?.totalQty), 0);

   console.log(totalRevenue)
   console.log(totalQuantity)

  // Calculate category distribution
  const categoryData = categories.map((category) => {
    const totalProducts = products.filter((product) => product.categoryId === category.id).length;
    return { name: category.name, value: totalProducts };
  });

  // Calculate payment method distribution
  const paymentMethods = orders.reduce((acc, order) => {
    acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
    return acc;
  }, {});
  const paymentMethodData = Object.entries(paymentMethods).map(([method, count]) => ({
    name: method,
    value: count,
  }));

  // Calculate top products by revenue
  const topProductsData = products
    .map((product) => {
      const productRevenue = orders
        .filter((order) => order.productId === product.id)
        .reduce((sum, order) => sum + order.amount * product.price, 0);
      return { name: product.name, revenue: productRevenue };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', margin: '2rem' }}>
           {/* Revenue and Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Quantity Sold</h2>
          <p className="text-3xl font-bold text-blue-500">{totalQuantity}</p>
        </div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2>Category Distribution</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            animationDuration={800}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2>Payment Method Distribution</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={paymentMethodData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#82ca9d"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            animationDuration={800}
          >
            {paymentMethodData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2>Top Products by Revenue</h2>
        <BarChart
          width={600}
          height={300}
          data={topProductsData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </motion.div>
    </div>
  );
};

export default Dashboard;
