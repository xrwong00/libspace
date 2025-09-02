import React from 'react';
import { Seat } from './Seat';
import { SeatData, Floor } from '../types';

interface FloorPlanProps {
  seats: SeatData[];
  floor: Floor;
}

const Facility: React.FC<{ name: string; gridArea: string; letter: string, className?: string }> = ({ name, gridArea, letter, className = '' }) => (
  <div className={`bg-blue-100 p-1.5 rounded-lg flex items-center justify-center text-center shadow-md ${className}`} style={{ gridArea }}>
    <div className="flex flex-col justify-center items-center">
      <span className="text-lg sm:text-xl font-bold text-blue-800 leading-tight">{letter}</span>
      <span className="text-[10px] text-gray-500 hidden sm:block leading-tight">{name}</span>
    </div>
  </div>
);

const SeatingArea: React.FC<{ seats: SeatData[]; gridArea: string; name: string, letter?: string, className?: string }> = ({ seats, gridArea, name, letter, className = '' }) => (
  <div className={`relative bg-gray-50 p-2 rounded-lg flex flex-col gap-2 items-center border-2 border-dashed border-gray-300 ${className}`} style={{ gridArea }}>
    {letter && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl font-bold text-gray-300 opacity-80 z-0 select-none pointer-events-none">{letter}</div>}
    <h3 className="relative text-gray-600 font-semibold text-[10px] sm:text-xs text-center z-10">{name}</h3>
    <div className="relative flex flex-wrap gap-1 sm:gap-1.5 justify-center z-10">
        {seats.map(seat => <Seat key={seat.id} seat={seat} />)}
    </div>
  </div>
);

const InfoMarker: React.FC<{ text: string; gridArea: string; icon?: React.ReactNode; className?: string }> = ({ text, gridArea, icon, className = '' }) => (
    <div className={`flex flex-col items-center justify-center text-orange-500 ${className}`} style={{ gridArea }}>
        {icon}
        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{text}</span>
    </div>
);

const StairsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0zM5 3a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
    </svg>
);


const FloorPlan1F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  const seatingAreas = {
    quietZone: seats.slice(0, 12),
    mainArea: seats.slice(12, 36),
    collabPods: seats.slice(36, 48),
  };
  const StairsFacility: React.FC<{ gridArea: string }> = ({ gridArea }) => (
    <div className="bg-blue-100 py-2 px-1 rounded-lg flex flex-col items-center justify-around text-center shadow-md text-orange-500 h-full" style={{ gridArea }}>
        <span className="font-semibold text-xs sm:text-sm whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            TO/FROM 2F
        </span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{transform: 'rotate(90deg)'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
    </div>
  );
  return (
    <div 
      className="grid gap-2 sm:gap-4 p-2 w-full h-full"
      style={{
        gridTemplateAreas: `
          ". entrance entrance entrance entrance b a"
          "d .         .         .      .    b a"
          "d quiet     quiet     c       c    main main"
          "f stairs-left e         k       k    main main"
          "f stairs-c  stairs-c  j       j    pods pods"
          "g h         h         h       h    i i"
        `,
        gridTemplateColumns: '1fr 0.5fr 1fr 0.5fr 0.5fr 1fr 1fr',
        gridTemplateRows: 'auto auto 1fr 1fr auto 1fr',
        minHeight: '60vh',
      }}
    >
      <Facility name="IT OFFICE" letter="A" gridArea="a" />
      <Facility name="IT HELPDESK" letter="B" gridArea="b" />
      <Facility name="PHOTOCOPYING" letter="C" gridArea="c" />
      <Facility name="SELF SERVICE" letter="D" gridArea="d" />
      <Facility name="WORK DISPLAY" letter="E" gridArea="e" />
      <Facility name="MINI CINEMA" letter="F" gridArea="f" />
      <Facility name="TECH CREATION" letter="G" gridArea="g" />
      <Facility name="INTERNET ACCESS" letter="H" gridArea="h" />
      <Facility name="MAKERSPACE" letter="I" gridArea="i" />
      <Facility name="RESTROOM" letter="J" gridArea="j" />
      <Facility name="INSTRUCTION" letter="K" gridArea="k" />
      <StairsFacility gridArea="stairs-left" />
      <SeatingArea name="Quiet Zone" gridArea="quiet" seats={seatingAreas.quietZone} />
      <SeatingArea name="Main Study Area" gridArea="main" seats={seatingAreas.mainArea} />
      <SeatingArea name="Collaboration Pods" gridArea="pods" seats={seatingAreas.collabPods} />
      <InfoMarker text="ENTRANCE" gridArea="entrance" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>} />
      <InfoMarker text="TO/FROM 2F" gridArea="stairs-c" icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>} />
    </div>
  );
};


const FloorPlan2F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  const s = {
    courseReservesL: seats.slice(0, 12),
    courseReservesR: seats.slice(12, 24),
    silentZoneL: seats.slice(24, 34),
    silentZoneR: seats.slice(34, 44),
    studyRoomTL: seats.slice(44, 48),
    studyRoomTR: seats.slice(48, 52),
    studyRoomBL: seats.slice(52, 56),
    studyRoomBR: seats.slice(56, 60),
    discussionRoomL: seats.slice(60, 68),
    discussionRoomR: seats.slice(68, 76),
    artBooks: seats.slice(76, 84),
  };

  return (
    <div 
      className="grid gap-2 sm:gap-2.5 p-2 w-full h-full"
      style={{
        gridTemplateColumns: 'auto repeat(12, 1fr) auto',
        gridTemplateRows: 'repeat(12, 1fr)',
        minHeight: '65vh',
      }}
    >
      {/* Corridors */}
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 1 / 13 / 2" className="!flex-col justify-around p-1" />
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 14 / 13 / 15" className="!flex-col justify-around p-1" />
      
      {/* Top Left Block */}
      <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 3 / 3 / 5" />
      <SeatingArea name="SILENT STUDY" seats={s.silentZoneL} gridArea="1 / 5 / 3 / 7" />
      <Facility name="PHONE RM" letter="O" gridArea="3 / 3 / 5 / 4" />
      <SeatingArea name="STUDY RM" seats={s.studyRoomTL} gridArea="3 / 4 / 5 / 5" />
      <SeatingArea name="COURSE RESERVES" seats={s.courseReservesL} gridArea="3 / 5 / 5 / 7" />
      <Facility name="LIFT TO G, 2F" letter="N" gridArea="5 / 5 / 7 / 6" />

      {/* Top Right Block */}
      <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 11 / 3 / 13" />
      <SeatingArea name="SILENT STUDY" seats={s.silentZoneR} gridArea="1 / 9 / 3 / 11" />
      <Facility name="PHONE RM" letter="O" gridArea="3 / 12 / 5 / 13" />
      <SeatingArea name="STUDY RM" seats={s.studyRoomTR} gridArea="3 / 11 / 5 / 12" />
      <SeatingArea name="COURSE RESERVES" seats={s.courseReservesR} gridArea="3 / 9 / 5 / 11" />
      <Facility name="MAGAZINES" letter="J" gridArea="5 / 10 / 7 / 12" />

      {/* Bottom Left Block */}
      <SeatingArea name="ART BOOKS" seats={s.artBooks} gridArea="7 / 4 / 10 / 6" />
      <SeatingArea name="STUDY RM" seats={s.studyRoomBL} gridArea="10 / 3 / 12 / 4" />
      <Facility name="PHONE RM" letter="O" gridArea="12 / 3 / 13 / 4" />
      <SeatingArea name="DISCUSSION RM" seats={s.discussionRoomL} gridArea="10 / 4 / 13 / 6" />
      <Facility name="CHINESE BOOKS" letter="G" gridArea="10 / 6 / 13 / 7" />
      <Facility name="WESTERN BOOKS" letter="A" gridArea="12 / 6 / 13 / 7" />
      
      {/* Bottom Right Block */}
      <Facility name="RESTROOM" letter="I" gridArea="7 / 10 / 9 / 12" />
      <Facility name="TAN KAH KEE" letter="F" gridArea="9 / 9 / 11 / 11" />
      <SeatingArea name="STUDY RM" seats={s.studyRoomBR} gridArea="9 / 11 / 11 / 12" />
      <Facility name="PHONE RM" letter="O" gridArea="9 / 12 / 11 / 13" />
      <SeatingArea name="DISCUSSION RM" seats={s.discussionRoomR} gridArea="11 / 9 / 13 / 11" />
      <Facility name="CHINESE BOOKS" letter="G" gridArea="11 / 11 / 13 / 13" />

      {/* Center Area */}
      <Facility name="CURRENT BOOKS" letter="C" gridArea="5 / 7 / 6 / 8" className="transform -rotate-45 !px-3" />
      <Facility name="CIRCULATION" letter="D" gridArea="5 / 8 / 6 / 9" className="transform rotate-45 !px-3" />
      <div style={{gridArea: '6 / 7 / 9 / 9'}} className="flex items-center justify-center">
        <div className="w-full h-full border-4 border-gray-300 rounded-full"></div>
      </div>

      {/* Stairs and Markers */}
      <InfoMarker text="TO/FROM 1F" gridArea="8 / 7 / 9 / 9" icon={<StairsIcon/>} className="-translate-y-2"/>
      <InfoMarker text="TO/FROM 3F" gridArea="5 / 3 / 6 / 5" icon={<StairsIcon/>} className="flex-row" />
      <InfoMarker text="TO/FROM 3F" gridArea="5 / 11 / 6 / 13" icon={<StairsIcon/>} className="flex-row" />
      <InfoMarker text="TO/FROM 3F" gridArea="7 / 2 / 8 / 4" icon={<StairsIcon/>} className="flex-row"/>
      <InfoMarker text="TO/FROM 3F" gridArea="7 / 12 / 8 / 14" icon={<StairsIcon/>} className="flex-row"/>
    </div>
  );
};

const FloorPlan3F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  const s = {
    // Total: 50 seats
    science: seats.slice(0, 8),          // F
    seAsia: seats.slice(8, 16),          // A
    studentSuccess: seats.slice(16, 28), // C
    medical: seats.slice(28, 40),        // E
    technology: seats.slice(40, 50),     // D
  };

  return (
    <div 
      className="grid gap-2 sm:gap-2.5 p-2 w-full h-full"
      style={{
        gridTemplateColumns: 'auto repeat(10, 1fr) auto',
        gridTemplateRows: 'repeat(10, 1fr)',
        minHeight: '65vh',
      }}
    >
      {/* Facilities and Seating Areas */}
      <SeatingArea name="SCIENCE COLL." seats={s.science} gridArea="1 / 5 / 3 / 7" letter="F" />
      <SeatingArea name="SE ASIA CORNER" seats={s.seAsia} gridArea="1 / 8 / 3 / 10" letter="A"/>
      
      <Facility name="READING CORRIDOR" letter="B" gridArea="2 / 2 / 9 / 3" className="!flex-col justify-around p-1"/>
      <SeatingArea name="STUDENT SUCCESS" seats={s.studentSuccess} gridArea="3 / 3 / 8 / 6" letter="C"/>
      
      <SeatingArea name="MEDICAL COLL." seats={s.medical} gridArea="3 / 9 / 8 / 11" letter="E"/>
      <Facility name="RESTROOM" letter="G" gridArea="8 / 9 / 10 / 11" />
      <Facility name="READING CORRIDOR" letter="B" gridArea="2 / 12 / 9 / 13" className="!flex-col justify-around p-1"/>

      <SeatingArea name="TECH COLL." seats={s.technology} gridArea="9 / 4 / 11 / 9" letter="D"/>

      {/* Center Circle */}
      <div style={{gridArea: '4 / 6 / 8 / 9'}} className="flex items-center justify-center p-4">
        <div className="w-full h-full border-4 border-gray-300 rounded-full"></div>
      </div>
      
      {/* Stairs and Markers */}
      <InfoMarker text="FROM/TO 2F" gridArea="2 / 1 / 4 / 2" icon={<StairsIcon/>} className="flex-col-reverse" />
      <InfoMarker text="FROM/TO 2F" gridArea="7 / 1 / 9 / 2" icon={<StairsIcon/>} className="flex-col" />
      <InfoMarker text="FROM/TO 2F" gridArea="2 / 13 / 4 / 14" icon={<StairsIcon/>} className="flex-col-reverse" />
      <InfoMarker text="FROM/TO 2F" gridArea="7 / 13 / 9 / 14" icon={<StairsIcon/>} className="flex-col" />
    </div>
  );
};


export const FloorPlan: React.FC<FloorPlanProps> = ({ seats, floor }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {floor === '1F' && <FloorPlan1F seats={seats} />}
      {floor === '2F' && <FloorPlan2F seats={seats} />}
      {floor === '3F' && <FloorPlan3F seats={seats} />}
    </div>
  );
};