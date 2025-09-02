import React from 'react';

export const BestTimesPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Times to Visit</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-600">Morning (8-10 AM)</span>
          <span className="font-semibold text-brand-green">Usually Available</span>
        </div>
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-600">Afternoon (2-6 PM)</span>
          <span className="font-semibold text-brand-red">Peak Hours</span>
        </div>
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-600">Evening (7-9 PM)</span>
          <span className="font-semibold text-brand-green">Good Availability</span>
        </div>
      </div>
    </div>
  );
};