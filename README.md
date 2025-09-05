LibSpace — Smart Library Seat Finder
=================================
<img width="1904" height="1079" alt="image" src="https://github.com/user-attachments/assets/bc4fd34a-c067-4eba-87ef-3deea7069386" />

📝 Project Summary
--------
LibSpace is a smart campus solution designed to eliminate the frustration of finding a study spot in crowded university libraries. Using a Raspberry Pi, a camera, and an on-device computer vision model, the system provides a real-time, interactive map of seat availability. It enhances the student experience by saving time and reducing stress, while offering the university a cost-effective, scalable tool for resource management.

🤯 Problem Statement
--------
During peak hours and exam seasons, university libraries become incredibly crowded. Students waste valuable time and energy wandering through floors, searching for an available seat. This process is frustrating, inefficient, and adds unnecessary stress to the student experience. There is no central, reliable system to provide real-time information on seat occupancy.

💡 Our Solution
--------
LibSpace solves this problem using computer vision. A single camera module, powered by a Raspberry Pi, can oversee multiple desks at once. A lightweight YOLO model runs directly on the device to detect human presence, and this information is sent to a central dashboard, providing students with a live map of available seats.

✨ Key Features
--------
- **Real-Time Interactive Map** – A clean, responsive web dashboard that shows the live status of every seat in the library.
- **Live Occupancy Statistics** – Instantly see the total number of available seats and the overall occupancy rate.
- **Privacy-First by Design** – All video is processed locally on the Raspberry Pi, ensuring full student anonymity.
- **Cost-Effective & Scalable** – A single device can monitor multiple seats, making deployment affordable and simple to expand.
- **False-Positive Resistant** – Differentiates between people and inanimate objects like bags, coats, or books.

⚙️ System Architecture & Data Flow
--------
**System Overview**
- **Detection Unit (Edge):** A Raspberry Pi and camera capture a live video feed.
- **Local Processing:** A Python script using OpenCV and a YOLO model analyzes the feed on the device to determine which seats are occupied.
- **Data Transmission:** The Pi constructs a tiny, anonymous JSON payload with a binary string (e.g., {"state": "0110"}) and sends it to our backend endpoint.
- **Frontend Dashboard:** A web application receives real-time updates and visualizes the data for the end-user.

**Schematic / Block Diagram**
(Add a schematic/block diagram)

**Data Flow Diagram**
(Add a data flow diagram)

🛠️ Technology Stack  
--------
| **Component**     | **Technology**                  | 
|-------------------|---------------------------------|
| **Hardware**      | Raspberry Pi 4, Pi Camera Module | 
| **Firmware / AI** | Python, OpenCV, YOLO Ultralytics | 
| **Frontend**      | HTML5, CSS3, JavaScript (ES6+)  | 
| **Communication** | REST API / MQTT *(Planned)*     | 

🔐 Privacy & Security
--------
- All video processed locally on Raspberry Pi.
- No video/images leave the device.
- Only seat status metadata is transmitted.
- Transparent signage in libraries ensures student trust.

📈 Scalability & Future Work
--------
LibSpace is designed to be scalable across an entire campus. Our vision for the future includes:
- **Full Backend Implementation:** Develop a robust backend with a database to store historical data for analytics.
- **User Authentication & Notifications:** Allow students to get notified when a seat becomes free in their favorite section.
- **Energy Saving Integration:** Connect with smart campus systems to automatically turn off lights in empty library zones.

👥 Team
--------
- Ling Jing Jie – Computer Vision 
- Lee Kah Chun – IoT
- John Elisha Sandran – Backend & API
- Wong Xuan Rui – Dashboard Interface