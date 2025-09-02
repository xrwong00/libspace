import React from 'react';
import { Seat } from './Seat';
import { SeatData, Floor } from '../types';

interface FloorPlanProps {
  seats: SeatData[];
  floor: Floor;
}

const Facility: React.FC<{ name: string; gridArea: string; letter: string, className?: string }> = ({ name, gridArea, letter, className = '' }) => (
  <div className={`bg-blue-500 p-1.5 rounded-lg flex items-center justify-center text-center shadow-lg border border-blue-600 ${className}`} style={{ gridArea, minHeight: '50px' }}>
    <div className="flex flex-col justify-center items-center">
      <span className="text-sm sm:text-lg font-bold text-white leading-tight">{letter}</span>
      <span className="text-xs text-blue-100 text-center leading-tight mt-0.5 hidden sm:block">{name}</span>
    </div>
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
    upperLeftWhite: seats.slice(0, 8),     // White area below D
    upperRightWhite: seats.slice(8, 16),   // White area to the right of A
    leftMiddleWhite: seats.slice(16, 24),  // White area between stairs and circle
    bottomRightWhite: seats.slice(24, 32), // White area below J
    bottomLeftWhite: seats.slice(32, 40),  // White area above G
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
      <InfoMarker text="YOU ARE HERE" gridArea="2 / 2 / 3 / 5" icon={<svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>} className="text-red-500" />
      <Facility name="PHOTOCOPYING/PRINTING" letter="C" gridArea="2 / 5 / 3 / 6" />
      <SeatingArea name="Study Area" gridArea="2 / 6 / 3 / 7" seats={seatingAreas.upperRightWhite} />
      
      {/* Row 3: F, E, Circle, K */}
      <Facility name="MINI CINEMA" letter="F" gridArea="3 / 1 / 4 / 2" />
      <Facility name="WORK DISPLAY" letter="E" gridArea="3 / 2 / 5 / 3" />
      <div style={{gridArea: '3 / 3 / 5 / 5'}} className="flex items-center justify-center relative border-4 border-gray-800 rounded-full bg-white">
        <div className="w-4/5 h-4/5 border-2 border-gray-600 rounded-full bg-gray-50"></div>
        <div className="absolute bottom-2 flex items-center justify-center">
          <span className="text-xs font-semibold text-orange-600">TO/FROM 2F</span>
        </div>
      </div>
      <Facility name="INSTRUCTION ROOM" letter="K" gridArea="3 / 5 / 4 / 7" />
      
      {/* Row 4: Study area and J */}
      <SeatingArea name="Study Area" gridArea="4 / 1 / 5 / 2" seats={seatingAreas.leftMiddleWhite} />
      <Facility name="RESTROOM" letter="J" gridArea="4 / 5 / 5 / 6" />
      <SeatingArea name="Study Area" gridArea="4 / 6 / 5 / 7" seats={seatingAreas.bottomRightWhite} />
      
      {/* Row 5: Study area moved to G's position, H, I */}
      <SeatingArea name="Study Area" gridArea="5 / 1 / 6 / 2" seats={seatingAreas.bottomLeftWhite} />
      <Facility name="INTERNET ACCESS AREA" letter="H" gridArea="5 / 3 / 7 / 5" />
      <Facility name="MAKERSPACE" letter="I" gridArea="5 / 5 / 7 / 7" />
      
      {/* Row 6: G moved to bottom, aligned with H and I */}
      <Facility name="TECHNOLOGY CREATION" letter="G" gridArea="6 / 1 / 7 / 2" />
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