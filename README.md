LibSpace — Smart Library Seat Finder
=================================

📝 Project Summary
LibSpace is a smart campus solution designed to eliminate the frustration of finding a study spot in crowded university libraries. Using a Raspberry Pi, a camera, and an on-device computer vision model, the system provides a real-time, interactive map of seat availability. It enhances the student experience by saving time and reducing stress, while offering the university a cost-effective, scalable tool for resource management.

Features
--------
- Floor plans for 1F, 2F, and 3F with labeled facilities.
- Seats show real-time status: green = available, red = occupied.
- Live statistics panel (total / available / occupied / occupancy rate).
- Simple simulated status updates (random toggles every 5 minutes) via `useSeatData`.

Quick start (Windows PowerShell)
-------------------------------
1. Install dependencies:

```powershell
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Open http://localhost:5173 (Vite default) in your browser.

Environment variables
---------------------
If your project uses external APIs (for example a Gemini API key), keep local secrets out of source control.

Create a file named `.env.local` in the project root and add any keys you need, for example:

```text
GEMINI_API_KEY=your_gemini_api_key_here
```

Make sure `.env.local` is listed in `.gitignore` (it is already in this repo) so you don't accidentally commit secrets.

For production, configure secrets through your hosting provider or CI (Vercel, Netlify, GitHub Actions secrets, etc.) instead of committing them.

Where to change layout & seat counts
-----------------------------------
- Floor layouts and seat slices are defined in `components/FloorPlan.tsx`.
   - `FloorPlan2F` contains the 2F grid and seating areas.
   - Each `SeatingArea` receives a slice of the floor's seats (from `useSeatData`).

- Seat generation and global counts live in `hooks/useSeatData.ts`.
   - `SEAT_COUNTS` controls how many seats the app creates per floor.
   - If you change slices in `FloorPlan.tsx`, update `SEAT_COUNTS['2F']` accordingly.

How statistics are computed
--------------------------
- `useSeatData` returns `seatsByFloor` and `statsByFloor`.
- `statsByFloor[floor]` includes total, available, occupied, and occupancy rate.
- Available = total - occupied; occupied = seats.filter(s => s.status === SeatStatus.OCCUPIED).length

Customizing behavior
--------------------
- To change the seat status update frequency, edit the interval inside `useEffect` in `hooks/useSeatData.ts`.
- To seed specific seat states, modify `generateInitialSeats` in `hooks/useSeatData.ts`.

Notes
-----
- The app uses a simple simulated data source; connect a real backend by replacing `useSeatData`.
- Keep slices in `FloorPlan.tsx` synchronized with `SEAT_COUNTS` in `useSeatData.ts` to avoid mismatched indices.

