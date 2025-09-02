import React, { useState } from 'react';
import { FloorPlan } from './components/FloorPlan';
import { StatsPanel } from './components/StatsPanel';
import { useSeatData } from './hooks/useSeatData';
import { QuickInfoPanel } from './components/QuickInfoPanel';
import { BestTimesPanel } from './components/BestTimesPanel';
import { Floor } from './types';

const floorInfo: Record<Floor, { name: string; description: string }> = {
  '1F': { name: 'Innovation Space', description: 'Xiamen University Library - 1st Floor' },
  '2F': { name: 'Learning Commons', description: 'Xiamen University Library - 2nd Floor' },
  '3F': { name: 'Learning Commons', description: 'Xiamen University Library - 3rd Floor' },
};

const App: React.FC = () => {
  const { seatsByFloor, statsByFloor } = useSeatData();
  const [currentFloor, setCurrentFloor] = useState<Floor>('1F');

  const handleFloorChange = (floor: Floor) => {
    setCurrentFloor(floor);
  };
  
  const currentSeats = seatsByFloor[currentFloor] ?? [];
  const currentStats = statsByFloor[currentFloor] ?? { total: 0, available: 0, occupied: 0, rate: 0 };

  const getFloorName = (floor: Floor) => {
    if (floor === '1F') return '1st Floor';
    if (floor === '2F') return '2nd Floor';
    return '3rd Floor';
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              📚LibSpace
              <span className="block text-base text-gray-600 font-normal tracking-normal mt-1 pl-9 sm:pl-12">Smart Library Seat Finder</span>
            </h1>
          </div>

          <div className="flex p-1 bg-white shadow-sm rounded-xl border border-gray-200">
            {(['1F', '2F', '3F'] as Floor[]).map((floor) => (
              <button
                key={floor}
                onClick={() => handleFloorChange(floor)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-colors duration-300 ${
                  currentFloor === floor ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-pressed={currentFloor === floor}
              >
                {getFloorName(floor)}
              </button>
            ))}
          </div>
        </header>
        
        <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{floorInfo[currentFloor].name} ({currentFloor})</h2>
            <p className="text-base text-gray-500 mt-1">{floorInfo[currentFloor].description}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content: Floor Plan */}
          <div className="xl:col-span-2 bg-white p-2 sm:p-4 rounded-2xl shadow-lg border border-gray-200">
             <FloorPlan seats={currentSeats} floor={currentFloor} />
          </div>

          {/* Sidebar: Stats Panels */}
          <div className="flex flex-col gap-8">
            <StatsPanel stats={currentStats} />
            <QuickInfoPanel stats={currentStats} floor={currentFloor} />
            <BestTimesPanel />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;