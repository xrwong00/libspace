import React from 'react';
import { SeatData, SeatStatus } from '../types';

interface SeatProps {
  seat: SeatData;
}

const SeatIcon: React.FC<{ status: SeatStatus }> = ({ status }) => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" />
  </svg>
);


export const Seat: React.FC<SeatProps> = ({ seat }) => {
  const isAvailable = seat.status === SeatStatus.AVAILABLE;

  const baseClasses = 'relative group w-5 h-5 sm:w-6 sm:h-6 p-0.5 rounded-md cursor-pointer transition-all duration-300';
  const statusClasses = isAvailable
    ? 'text-brand-green bg-green-100 hover:bg-green-200 animate-glow'
    : 'text-brand-red bg-red-100 hover:bg-red-200';

  return (
    <div className={`${baseClasses} ${statusClasses}`}>
      <SeatIcon status={seat.status} />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        Seat {seat.id}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  );
};