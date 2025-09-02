import React from 'react';
import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

const StatCard: React.FC<{ label: string; value: number | string; colorClass: string }> = ({ label, value, colorClass }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-200">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-xl font-bold ${colorClass}`}>{value}</span>
  </div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Live Statistics</h2>

      <div className="space-y-4">
        <StatCard label="Total Seats" value={stats.total} colorClass="text-gray-900" />
        <StatCard label="Available" value={stats.available} colorClass="text-brand-green" />
        <StatCard label="Occupied" value={stats.occupied} colorClass="text-brand-red" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Occupancy Rate</h3>
        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stats.rate}%` }}
            ></div>
          </div>
          <span className="font-bold text-base text-gray-900 w-16 text-right">{stats.rate.toFixed(1)}%</span>
        </div>
      </div>

      <footer className="text-center text-gray-500 text-xs pt-4 border-t border-gray-200">
        <p>Data updates automatically every 5 minutes.</p>
      </footer>
    </div>
  );
};