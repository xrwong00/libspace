import React, { useState, useEffect } from 'react';
import { Stats, Floor } from '../types';

interface QuickInfoPanelProps {
  stats: Stats;
  floor: Floor;
}

export const QuickInfoPanel: React.FC<QuickInfoPanelProps> = ({ stats, floor }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString());
  }, [stats]);

  const getFloorName = (floor: Floor) => {
    if (floor === '1F') return '1st Floor';
    if (floor === '2F') return '2nd Floor';
    return '3rd Floor';
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Quick Info</h2>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Peak Hours</span>
        <span className="font-semibold text-gray-800">3 PM - 7 PM</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Last Update</span>
        <span className="font-semibold text-gray-800">{lastUpdate}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">Floor</span>
        <span className="font-semibold text-gray-800">{getFloorName(floor)}</span>
      </div>
    </div>
  );
};