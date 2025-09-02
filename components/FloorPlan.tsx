import React from 'react';
import { Seat } from './Seat';
import { SeatData, Floor } from '../types';

interface FloorPlanProps {
  seats: SeatData[];
  floor: Floor;
}

const Facility: React.FC<{ name: string; gridArea: string; letter: string, className?: string }> = ({ name, gridArea, letter, className = '' }) => (
  <div className={`bg-blue-500 p-1.5 rounded-lg flex flex-col items-center justify-center text-center shadow-lg border border-blue-600 ${className}`} style={{ gridArea, minHeight: '50px' }}>
    <span className="text-lg sm:text-xl font-bold text-white leading-tight mb-1">{letter}</span>
    <span className="text-xs text-blue-100 text-center leading-tight hidden sm:block">{name}</span>
  </div>
);

const SeatingArea: React.FC<{ seats: SeatData[]; gridArea: string; name: string, letter?: string, className?: string }> = ({ seats, gridArea, name, letter, className = '' }) => (
  <div className={`relative bg-white p-1.5 rounded-lg flex flex-col gap-1 items-center justify-center border-2 border-dashed border-gray-400 shadow-sm ${className}`} style={{ gridArea, minHeight: '50px' }}>
    {letter && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl font-bold text-gray-200 opacity-50 z-0 select-none pointer-events-none">{letter}</div>}
    <h3 className="relative text-gray-700 font-semibold text-xs text-center z-10 mb-0.5">{name}</h3>
    <div className="relative flex flex-wrap gap-0.5 justify-center items-center z-10 max-w-full">
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
    upperLeftWhite: seats.slice(0, 10),     // White area below D - increased to 10 seats
    upperRightWhite: seats.slice(10, 20),   // White area to the right of A - increased to 10 seats
    leftMergedWhite: seats.slice(20, 44),  // Merged white area below F (combining leftMiddle and bottomLeft)
    bottomRightWhite: seats.slice(44, 52), // White area below J
  };
  
  const StairsFacility: React.FC<{ gridArea: string }> = ({ gridArea }) => (
    <div className="bg-orange-100 py-1 px-2 rounded-lg flex flex-col items-center justify-center text-center shadow-md text-orange-600 h-full border border-orange-200" style={{ gridArea }}>
        <span className="font-semibold text-xs whitespace-nowrap">TO/FROM 2F</span>
        <svg className="w-4 h-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
        </svg>
    </div>
  );
  
  return (
    <div 
      className="grid gap-1 p-2 w-full h-full bg-gray-100 rounded-lg border-2 border-gray-800"
      style={{
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        height: '100%',
        aspectRatio: '3/2',
      }}
    >
      {/* Row 1: Top facilities and entrance */}
      <Facility name="SELF SERVICE COMMONS" letter="D" gridArea="1 / 1 / 2 / 2" />
      <InfoMarker text="ENTRANCE" gridArea="1 / 2 / 2 / 5" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>} />
      <Facility name="IT HELPDESK" letter="B" gridArea="1 / 5 / 2 / 6" />
      <Facility name="IT OFFICE" letter="A" gridArea="1 / 6 / 2 / 7" />
      
      {/* Row 2: Study areas and facilities */}
      <SeatingArea name="Study Area" gridArea="2 / 1 / 3 / 2" seats={seatingAreas.upperLeftWhite} />
      <Facility name="PHOTOCOPYING/PRINTING" letter="C" gridArea="2 / 5 / 3 / 6" />
      <SeatingArea name="Study Area" gridArea="2 / 6 / 3 / 7" seats={seatingAreas.upperRightWhite} />
      
      {/* Row 3: F, E, Circle, K */}
      <Facility name="MINI CINEMA" letter="F" gridArea="3 / 1 / 4 / 2" />
      <Facility name="WORK DISPLAY" letter="E" gridArea="3 / 2 / 5 / 3" />
      <div style={{gridArea: '3 / 3 / 5 / 5'}} className="flex items-center justify-center relative border-4 border-gray-800 rounded-full bg-white">
        <div className="w-2/3 h-2/3 border-2 border-gray-600 rounded-full bg-gray-50"></div>
        <div className="absolute bottom-2 flex items-center justify-center gap-1">
          <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
          <span className="text-xs font-semibold text-orange-600">TO/FROM 2F</span>
        </div>
      </div>
      <Facility name="INSTRUCTION ROOM" letter="K" gridArea="3 / 5 / 4 / 7" />
      
      {/* Row 4-6: Rearranged layout - J below K, study area below J */}
      <SeatingArea name="Study Area" gridArea="4 / 1 / 6 / 2" seats={seatingAreas.leftMergedWhite} />
      <Facility name="RESTROOM" letter="J" gridArea="4 / 5 / 5 / 7" />
      <SeatingArea name="Study Area" gridArea="5 / 5 / 6 / 7" seats={seatingAreas.bottomRightWhite} />
      
      {/* Row 5-6: H, I */}
      <Facility name="INTERNET ACCESS AREA" letter="H" gridArea="5 / 3 / 7 / 5" />
      <Facility name="MAKERSPACE" letter="I" gridArea="5 / 5 / 7 / 7" />
      
      {/* Row 6-7: G positioned directly below the study area, bottom-aligned with H and I */}
      <Facility name="TECHNOLOGY CREATION" letter="G" gridArea="6 / 1 / 7 / 2" />
    </div>
  );
};


const FloorPlan2F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  // Re-map seats to the two visible study areas (top left & top right) and lower study/discussion areas
  const s = {
    topStudyLeft: seats.slice(0, 10),
    topStudyRight: seats.slice(10, 20),
    lowerDiscussionLeft: seats.slice(20, 36),   // M left
    lowerDiscussionRight: seats.slice(36, 52),  // M right
    bottomCourseResL: seats.slice(52, 58),      // F left
    bottomCourseResR: seats.slice(58, 64),      // F right
  };

  return (
    <div
      className="grid gap-1 p-2 w-full h-full bg-gray-100 rounded-lg border-2 border-gray-800"
      style={{
        gridTemplateColumns: 'repeat(16, 1fr)', // 1: corridor left, 16: corridor right
        gridTemplateRows: 'repeat(18, 1fr)',
        aspectRatio: '5/4'
      }}
    >
      {/* Left / Right Corridors (H) */}
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 1 / 19 / 2" className="!flex-col justify-around p-1" />
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 16 / 19 / 17" className="!flex-col justify-around p-1" />

      {/* TOP BLOCKS */}
      <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 3 / 3 / 8" />
      <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 10 / 3 / 15" />
      <Facility name="PHONE ROOM" letter="O" gridArea="3 / 3 / 4 / 4" />
      <Facility name="SILENT STUDY ZONE" letter="K" gridArea="3 / 4 / 4 / 8" />
      <Facility name="SILENT STUDY ZONE" letter="K" gridArea="3 / 10 / 4 / 14" />
      <Facility name="PHONE ROOM" letter="O" gridArea="3 / 14 / 4 / 15" />

      {/* UPPER STUDY / COURSE RESERVES (Left & Right) */}
      <Facility name="STUDY ROOM" letter="L" gridArea="4 / 3 / 7 / 4" />
      <SeatingArea name="Study Area" seats={s.topStudyLeft} gridArea="4 / 4 / 8 / 6" />
      <Facility name="COURSE RESERVES" letter="B" gridArea="4 / 6 / 9 / 9" />

      <Facility name="COURSE RESERVES" letter="B" gridArea="4 / 9 / 9 / 12" />
      <SeatingArea name="Study Area" seats={s.topStudyRight} gridArea="4 / 12 / 8 / 14" />
      <Facility name="STUDY ROOM" letter="L" gridArea="4 / 14 / 7 / 15" />

      {/* LIFT / RESTROOM / MAGAZINES / STAIRS (Left & Right) */}
      <Facility name="LIFT TO G, 2F" letter="N" gridArea="7 / 3 / 10 / 5" />
      <Facility name="MAGAZINES" letter="J" gridArea="7 / 12 / 10 / 14" />

      {/* Diamonds C & D and Central Circle */}
      <Facility name="CURRENT BOOKS" letter="C" gridArea="8 / 8 / 10 / 9" className="rotate-45 !px-1" />
      <Facility name="CIRCULATION COUNTER" letter="D" gridArea="8 / 9 / 10 / 10" className="-rotate-45 !px-1" />
      <div style={{ gridArea: '10 / 7 / 15 / 11' }} className="relative flex items-center justify-center">
        <div className="w-full h-full border-4 border-gray-500 rounded-full flex items-center justify-center">
          <div className="w-2/3 h-2/3 border-2 border-gray-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-orange-600">
          <StairsIcon />
          <span className="text-[10px] font-semibold">TO/FROM 1F</span>
        </div>
      </div>

      {/* Lower mid left & right (Stairs markers to 3F) */}
      <InfoMarker text="TO/FROM 3F" gridArea="10 / 3 / 11 / 5" icon={<StairsIcon />} className="!text-orange-600" />
      <InfoMarker text="TO/FROM 3F" gridArea="10 / 12 / 11 / 14" icon={<StairsIcon />} className="!text-orange-600" />

      {/* Lower Left Blocks (E, M, A, G, O etc.) */}
      <Facility name="ART BOOKS" letter="E" gridArea="11 / 4 / 14 / 5" />
      <SeatingArea name="DISCUSSION" seats={s.lowerDiscussionLeft} gridArea="11 / 5 / 15 / 9" letter="M" />
      <Facility name="PHONE ROOM" letter="O" gridArea="15 / 3 / 16 / 4" />
      <Facility name="STUDY ROOM" letter="L" gridArea="14 / 3 / 16 / 4" className="hidden" />
      <Facility name="COURSE RESERVES" letter="F" gridArea="15 / 5 / 16 / 9" />
      <Facility name="WESTERN BOOKS" letter="A" gridArea="16 / 5 / 17 / 7" />
      <Facility name="CHINESE BOOKS" letter="G" gridArea="16 / 7 / 17 / 9" />

      {/* Lower Right Blocks (E, M, G, O etc.) */}
      <Facility name="ART BOOKS" letter="E" gridArea="11 / 11 / 14 / 12" />
      <SeatingArea name="DISCUSSION" seats={s.lowerDiscussionRight} gridArea="11 / 9 / 15 / 13" letter="M" />
      <Facility name="RESTROOM" letter="I" gridArea="11 / 13 / 13 / 15" />
      <Facility name="COURSE RESERVES" letter="F" gridArea="15 / 9 / 16 / 13" />
      <Facility name="CHINESE BOOKS" letter="G" gridArea="16 / 9 / 17 / 13" />
      <Facility name="PHONE ROOM" letter="O" gridArea="15 / 14 / 16 / 15" />
      <Facility name="STUDY ROOM" letter="L" gridArea="14 / 14 / 16 / 15" className="hidden" />

      {/* Bottom extra row spacing (acts as padding) */}
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