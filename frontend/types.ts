
export enum SeatStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
}

export interface SeatData {
  id: string;
  status: SeatStatus;
}

export interface Stats {
  total: number;
  available: number;
  occupied: number;
  rate: number;
}

export type Floor = '1F' | '2F' | '3F';
