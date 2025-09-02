
import { useState, useEffect, useMemo } from 'react';
import { SeatData, SeatStatus, Stats, Floor } from '../types';

const SEAT_COUNTS: Record<Floor, number> = {
  '1F': 52,
  '2F': 64, // Reduced from 84 since silent study zones (K) now have no seats
  '3F': 50, // Estimated from floor plan
};

// Generate initial seat data for a given number of seats
const generateInitialSeats = (count: number, prefix: string): SeatData[] => {
  const seats: SeatData[] = [];
  for (let i = 1; i <= count; i++) {
    seats.push({
      id: `${prefix}-${i}`,
      status: Math.random() > 0.6 ? SeatStatus.OCCUPIED : SeatStatus.AVAILABLE,
    });
  }
  return seats;
};

const initialSeats = {
  '1F': generateInitialSeats(SEAT_COUNTS['1F'], '1F'),
  '2F': generateInitialSeats(SEAT_COUNTS['2F'], '2F'),
  '3F': generateInitialSeats(SEAT_COUNTS['3F'], '3F'),
}

export const useSeatData = () => {
  const [seatsByFloor, setSeatsByFloor] = useState<Record<Floor, SeatData[]>>(initialSeats);

  useEffect(() => {
    const simulationInterval = setInterval(() => {
      setSeatsByFloor(prevSeatsByFloor => {
        const newSeatsByFloor = { ...prevSeatsByFloor };

        (Object.keys(SEAT_COUNTS) as Floor[]).forEach(floor => {
          const newSeats = [...newSeatsByFloor[floor]];
          const totalSeats = SEAT_COUNTS[floor];
          
          // Randomly select 2-3 seats to toggle
          const seatsToToggleCount = Math.floor(Math.random() * 2) + 2;
          
          for (let i = 0; i < seatsToToggleCount; i++) {
            const randomIndex = Math.floor(Math.random() * totalSeats);
            if (newSeats[randomIndex]) {
              const currentStatus = newSeats[randomIndex].status;
              newSeats[randomIndex] = {
                ...newSeats[randomIndex],
                status: currentStatus === SeatStatus.AVAILABLE ? SeatStatus.OCCUPIED : SeatStatus.AVAILABLE,
              };
            }
          }
          newSeatsByFloor[floor] = newSeats;
        });
        
        return newSeatsByFloor;
      });
    }, 300000); // Update every 5 minutes (300,000 milliseconds)

    return () => clearInterval(simulationInterval);
  }, []);

  const statsByFloor: Record<Floor, Stats> = useMemo(() => {
    const stats: Partial<Record<Floor, Stats>> = {};
    (Object.keys(SEAT_COUNTS) as Floor[]).forEach(floor => {
      const seats = seatsByFloor[floor];
      const total = SEAT_COUNTS[floor];
      const occupied = seats.filter(seat => seat.status === SeatStatus.OCCUPIED).length;
      const available = total - occupied;
      const rate = total > 0 ? (occupied / total) * 100 : 0;
      
      stats[floor] = {
        total,
        available,
        occupied,
        rate,
      };
    });
    return stats as Record<Floor, Stats>;
  }, [seatsByFloor]);

  return { seatsByFloor, statsByFloor };
};
