import React from 'react';

const SummaryCards = ({ total, active, inactive }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 no-print">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Employees</p>
        <p className="text-3xl font-bold text-gray-800">{total}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Status</p>
        <p className="text-3xl font-bold text-green-600">{active}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Inactive Status</p>
        <p className="text-3xl font-bold text-red-600">{inactive}</p>
      </div>
    </div>
  );
};

export default SummaryCards;