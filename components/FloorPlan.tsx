import React from 'react';
import { Seat } from './Seat';
import { SeatData, Floor } from '../types';

interface FloorPlanProps {
  seats: SeatData[];
  floor: Floor;
}

const Facility: React.FC<{ name: string; gridArea: string; letter: string, className?: string }> = ({ name, gridArea, letter, className = '' }) => (
  <div className={`bg-blue-50 p-1.5 rounded-lg flex flex-col items-center justify-center text-center shadow-lg border border-blue-100 ${className}`} style={{ gridArea, minHeight: '36px' }}>
  <span className="text-lg sm:text-xl font-bold text-blue-900 leading-tight mb-1">{letter}</span>
  <span className="text-[9px] sm:text-[10px] text-blue-800 text-center leading-tight">{name}</span>
  </div>
);

const SeatingArea: React.FC<{ seats: SeatData[]; gridArea: string; name: string, letter?: string, className?: string }> = ({ seats, gridArea, name, letter, className = '' }) => (
  <div className={`relative bg-white p-1.5 rounded-lg flex flex-col gap-0.5 items-center justify-center border-2 border-dashed border-gray-400 shadow-sm ${className}`} style={{ gridArea, minHeight: '60px' }}>
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
      className="grid gap-1 p-2 w-full h-full bg-white rounded-lg border-2 border-gray-800"
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
  <Facility name="MAKERSPACE" letter="I" gridArea="6 / 5 / 8 / 7" />
      
      {/* Row 6-7: G positioned directly below the study area, bottom-aligned with H and I */}
      <Facility name="TECHNOLOGY CREATION" letter="G" gridArea="6 / 1 / 7 / 2" />
    </div>
  );
};


const FloorPlan2F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  // Seat allocation (total 40 for 2F): added new study area
  const s = {
    topStudyLeft: seats.slice(0, 8),
    topStudyRight: seats.slice(8, 16),
    bottomCourseResL: seats.slice(16, 22),      // F left
    bottomCourseResR: seats.slice(22, 28),      // F right
    smallStudyLeft: seats.slice(28, 32),        // 4 seats below left L
    smallStudyRight: seats.slice(32, 36),       // 4 seats below right L
    newStudyArea: seats.slice(36, 40),          // 4 seats new study area
  };

  return (
    <div
      className="grid gap-1 p-2 w-full h-full bg-white rounded-lg border-2 border-gray-800"
      style={{
        gridTemplateColumns: 'repeat(16, 1fr)',
        gridTemplateRows: 'repeat(16, 1fr)',
        aspectRatio: '16/9'
      }}
    >
      {/* Left / Right Corridors (H) */}
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 1 / 19 / 2" className="!flex-col justify-around p-1" />
      <Facility name="GRAND READING CORRIDOR" letter="H" gridArea="1 / 16 / 19 / 17" className="!flex-col justify-around p-1" />

      {/* TOP BLOCKS */}
  <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 2 / 3 / 8" />
  <Facility name="WESTERN BOOKS" letter="A" gridArea="1 / 10 / 3 / 16" />
  <Facility name="PHONE ROOM" letter="O" gridArea="3 / 2 / 4 / 4" />
      <Facility name="SILENT STUDY ZONE" letter="K" gridArea="3 / 4 / 4 / 8" />
      <Facility name="SILENT STUDY ZONE" letter="K" gridArea="3 / 10 / 4 / 14" />
  <Facility name="PHONE ROOM" letter="O" gridArea="3 / 14 / 4 / 16" />

  {/* UPPER STUDY / COURSE RESERVES (Reduced height) */}
  <Facility name="STUDY ROOM" letter="L" gridArea="4 / 2 / 7 / 4" />
  <SeatingArea name="Study Area" seats={s.topStudyLeft} gridArea="4 / 4 / 7 / 6" />
  <Facility name="COURSE RESERVES" letter="B" gridArea="4 / 6 / 7 / 9" />

  <Facility name="COURSE RESERVES" letter="B" gridArea="4 / 9 / 7 / 12" />
  <SeatingArea name="Study Area" seats={s.topStudyRight} gridArea="4 / 12 / 7 / 14" />
  <Facility name="STUDY ROOM" letter="L" gridArea="4 / 14 / 7 / 16" />

  {/* New small 4-seat study areas below L blocks */}
  <SeatingArea name="Study Area" seats={s.smallStudyLeft} gridArea="7 / 2 / 9 / 4" />
  <SeatingArea name="Study Area" seats={s.smallStudyRight} gridArea="7 / 14 / 9 / 16" />
  
  {/* Additional study area moved up to align with others */}
  <SeatingArea name="Study Area" seats={s.newStudyArea} gridArea="7 / 12 / 9 / 14" />

      {/* LIFT / RESTROOM / MAGAZINES / STAIRS (Left & Right) */}
  <Facility name="LIFT TO G, 2F" letter="N" gridArea="9 / 2 / 11 / 5" />
  <Facility name="MAGAZINES" letter="J" gridArea="9 / 12 / 11 / 15" />

      {/* Diamonds C & D and Central Circle */}
  <Facility name="CURRENT BOOKS" letter="C" gridArea="8 / 8 / 9 / 9" />
  <Facility name="CIRCULATION COUNTER" letter="D" gridArea="8 / 9 / 9 / 10" />
  <div style={{ gridArea: '9 / 7 / 12 / 11' }} className="relative flex items-center justify-center">
        <div className="w-full h-full border-4 border-gray-500 rounded-full flex items-center justify-center">
          <div className="w-2/3 h-2/3 border-2 border-gray-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-orange-600">
          <StairsIcon />
          <span className="text-[10px] font-semibold">TO/FROM 1F</span>
        </div>
      </div>

      {/* Lower mid left & right (Stairs markers to 3F) */}
  <InfoMarker text="TO/FROM 3F" gridArea="11 / 2 / 12 / 4" icon={<StairsIcon />} className="!text-orange-600" />
  <InfoMarker text="TO/FROM 3F" gridArea="11 / 14 / 12 / 16" icon={<StairsIcon />} className="!text-orange-600" />

      {/* Left side middle blocks - L above O, with study area next to L */}
  <Facility name="STUDY ROOM" letter="L" gridArea="13 / 2 / 14 / 3" />
  <SeatingArea name="Study Area" seats={s.bottomCourseResL} gridArea="13 / 3 / 15 / 5" />
  <Facility name="ART BOOKS" letter="E" gridArea="13 / 5 / 14 / 7" />
  
  {/* Right side middle blocks */}
  <Facility name="RESTROOM" letter="I" gridArea="13 / 12 / 14 / 14" />
  <Facility name="STUDY ROOM" letter="L" gridArea="13 / 14 / 14 / 16" />

  {/* Course reserves below circle */}
  <Facility name="COURSE RESERVES" letter="F" gridArea="14 / 5 / 15 / 9" />
  <Facility name="COURSE RESERVES" letter="F" gridArea="14 / 9 / 15 / 13" />

      {/* Second row - O and M spanning */}
  <Facility name="PHONE ROOM" letter="O" gridArea="14 / 2 / 15 / 3" />
  <Facility name="DISCUSSION" letter="M" gridArea="15 / 3 / 16 / 13" />
  <Facility name="PHONE ROOM" letter="O" gridArea="14 / 14 / 15 / 16" />
  
  {/* Bottom row - A and G */}
  <Facility name="WESTERN BOOKS" letter="A" gridArea="16 / 2 / 17 / 7" />
  <Facility name="CHINESE BOOKS" letter="G" gridArea="16 / 7 / 17 / 13" />
  <Facility name="WESTERN BOOKS" letter="A" gridArea="16 / 14 / 17 / 16" />

      {/* Bottom extra row spacing (acts as padding) */}
    </div>
  );
};

const FloorPlan3F: React.FC<{ seats: SeatData[] }> = ({ seats }) => {
  const s = {
    // Total: 50 seats distributed across study areas
    studyArea1: seats.slice(0, 6),        // Below F
    studyArea2: seats.slice(6, 12),       // Below A  
    studyArea3: seats.slice(12, 18),      // Right of A
    studyArea4: seats.slice(18, 24),      // Right of E
    studyArea5: seats.slice(24, 30),      // Below G
    studyArea6: seats.slice(30, 36),      // Left of C
    studyArea7: seats.slice(36, 42),      // Bottom left
    studyArea8: seats.slice(42, 48),      // Bottom right
    studyArea9: seats.slice(48, 50),      // Small bottom area
  };

  return (
    <div 
      className="grid gap-1 p-2 w-full h-full bg-white rounded-lg border-2 border-gray-800"
      style={{
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        aspectRatio: '1',
      }}
    >
      {/* Top Row Facilities */}
  <Facility name="SCIENCE COLLECTION" letter="F" gridArea="3 / 8 / 5 / 10" />
  <Facility name="SOUTHEAST ASIA CORNER" letter="A" gridArea="3 / 10 / 5 / 12" />
      
      {/* Left Reading Corridor */}
  <Facility name="READING CORRIDOR" letter="B" gridArea="4 / 2 / 10 / 3" className="!flex-col justify-around p-1"/>
      
  {/* Study areas moved: now positioned above C */}
  <SeatingArea name="Study Area" seats={s.studyArea1} gridArea="2 / 3 / 3 / 5" />
  <SeatingArea name="Study Area" seats={s.studyArea2} gridArea="3 / 3 / 4 / 5" />
      
  <Facility name="STUDENT SUCCESS ROOM 1-3" letter="C" gridArea="4 / 3 / 8 / 5" />
      
  {/* Study areas overlapping E removed */}

  {/* Medical Collection moved below the two study areas to the right */}
  <Facility name="MEDICAL COLLECTION" letter="E" gridArea="7 / 10 / 8 / 12" />
  
  {/* Two study areas aligned to the right of E */}
  <SeatingArea name="Study Area" seats={s.studyArea3} gridArea="5 / 10 / 6 / 12" />
  <SeatingArea name="Study Area" seats={s.studyArea1} gridArea="6 / 10 / 7 / 12" />
      
      {/* Right Reading Corridor */}
  <Facility name="READING CORRIDOR" letter="B" gridArea="4 / 12 / 10 / 13" className="!flex-col justify-around p-1"/>
      
  {/* Restroom */}
  <Facility name="RESTROOM" letter="G" gridArea="8 / 10 / 9 / 12" />
      <SeatingArea name="Study Area" seats={s.studyArea9} gridArea="8 / 3 / 9 / 5" />
      <SeatingArea name="Study Area" seats={s.studyArea1.slice(0, 2)} gridArea="9 / 3 / 10 / 5" />
      
      {/* Technology Collection at bottom */}
  <Facility name="TECHNOLOGY COLLECTION" letter="D" gridArea="10 / 4 / 12 / 8" />
      
      {/* Bottom study areas */}
  <SeatingArea name="Study Area" seats={s.studyArea2.slice(0, 2)} gridArea="10 / 8 / 12 / 10" />
  <SeatingArea name="Study Area" seats={s.studyArea3.slice(0, 2)} gridArea="10 / 10 / 12 / 12" />
      
  {/* Central Circle (moved left 1 column) */}
  <div style={{gridArea: '6 / 6 / 9 / 9'}} className="flex items-center justify-center p-2">
        <div className="w-full h-full border-4 border-gray-800 rounded-full"></div>
      </div>
      
      {/* Stairs */}
  <InfoMarker text="FROM/TO 2F" gridArea="4 / 1 / 6 / 2" icon={<StairsIcon/>} className="flex-col-reverse !text-orange-500" />
  <InfoMarker text="FROM/TO 2F" gridArea="7 / 1 / 9 / 2" icon={<StairsIcon/>} className="!text-orange-500" />
  <InfoMarker text="FROM/TO 2F" gridArea="4 / 14 / 6 / 15" icon={<StairsIcon/>} className="flex-col-reverse !text-orange-500" />
  <InfoMarker text="FROM/TO 2F" gridArea="7 / 14 / 9 / 15" icon={<StairsIcon/>} className="!text-orange-500" />
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