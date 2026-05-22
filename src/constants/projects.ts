import type { Project } from "@/types/project";
import proj1 from "@/assets/project-1.jpg";
import proj2 from "@/assets/project-2.jpg";
import proj3 from "@/assets/project-3.jpg";
import proj4 from "@/assets/project-4.jpg";
import proj5 from "@/assets/project-5.jpg";
import proj6 from "@/assets/project-6.jpg";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Gas Leak Detector with SMS Alert",
    description:
      "MQ-2 sensor detects gas leakage and immediately triggers SMS via SIM800L GSM module. The system continuously monitors gas concentration and sends automated alerts to a predefined phone number when dangerous levels are detected.",
    tags: ["#IoT", "#Arduino", "#Safety"],
    tagStyle: "purple",
    cost: "₹ 850",
    semester: "Sem 3",
    student: "Rohan Mehta",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj1,
    type: "physical",
    category: "IoT",
    components: [
      { name: "MQ-2 Gas Sensor", price: 120 },
      { name: "SIM800L GSM Module", price: 450 },
      { name: "Arduino Uno", price: 280 },
    ],
    storeType: "online",
    storeName: "Robu.in",
    uploadedDaysAgo: 3,
  },
  {
    id: "2",
    title: "Smart Irrigation System",
    description:
      "Soil moisture sensor auto-controls water pump via relay. Saves up to 40% water usage. The system can be monitored remotely via a web dashboard built on ThingSpeak.",
    tags: ["#AgriTech", "#NodeMCU"],
    tagStyle: "green",
    cost: "₹ 1,200",
    semester: "Sem 4",
    student: "Priya Sharma",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj2,
    type: "physical",
    category: "Agriculture Tech",
    components: [
      { name: "Soil Moisture Sensor", price: 150 },
      { name: "NodeMCU ESP8266", price: 280 },
      { name: "5V Relay Module", price: 80 },
      { name: "Submersible Water Pump", price: 350 },
      { name: "12V Power Supply", price: 340 },
    ],
    storeType: "both",
    storeName: "Amazon / SP Road Bangalore",
    uploadedDaysAgo: 7,
  },
  {
    id: "3",
    title: "RFID Attendance System",
    description:
      "Contactless RFID-based attendance logger with LCD display and data stored on SD card. Supports multiple users with unique RFID cards and generates daily attendance reports.",
    tags: ["#RFID", "#Arduino"],
    tagStyle: "blue",
    cost: "₹ 650",
    semester: "Sem 2",
    student: "Aarav Patel",
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj3,
    type: "physical",
    category: "Security Systems",
    components: [
      { name: "MFRC522 RFID Reader", price: 150 },
      { name: "Arduino Uno", price: 280 },
      { name: "16x2 LCD Display", price: 120 },
      { name: "SD Card Module", price: 100 },
    ],
    storeType: "online",
    storeName: "Robu.in",
    uploadedDaysAgo: 12,
  },
  {
    id: "4",
    title: "Home Automation with Alexa",
    description:
      "Voice-controlled home appliances via ESP8266 and Alexa skill integration over Wi-Fi. Control up to 4 appliances with custom voice commands and an Android companion app.",
    tags: ["#HomeAuto", "#ESP8266", "#Voice"],
    tagStyle: "orange",
    cost: "₹ 980",
    semester: "Sem 5",
    student: "Sneha Iyer",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj4,
    type: "physical",
    category: "Home Automation",
    components: [
      { name: "NodeMCU ESP8266", price: 280 },
      { name: "4-Channel Relay Board", price: 180 },
      { name: "5V Power Supply", price: 220 },
      { name: "Breadboard & Jumper Wires", price: 150 },
      { name: "3D Printed Enclosure", price: 150 },
    ],
    storeType: "online",
    storeName: "Amazon",
    uploadedDaysAgo: 5,
  },
  {
    id: "5",
    title: "Autonomous Line Following Robot",
    description:
      "Two-wheeled robot uses IR sensors and PID control to follow black tape lines autonomously. Capable of navigating sharp turns and intersections at variable speeds.",
    tags: ["#Robotics", "#PID", "#Arduino"],
    tagStyle: "purple",
    cost: "₹ 1,450",
    semester: "Sem 4",
    student: "Karan Singh",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj5,
    type: "physical",
    category: "Robotics",
    components: [
      { name: "Arduino Nano", price: 250 },
      { name: "L298N Motor Driver", price: 180 },
      { name: "IR Sensor Array (5 channel)", price: 220 },
      { name: "DC Gear Motors (2x)", price: 400 },
      { name: "Chassis & Wheels", price: 300 },
      { name: "Li-Po Battery 7.4V", price: 100 },
    ],
    storeType: "both",
    storeName: "Robu.in / Local Electronics Store",
    uploadedDaysAgo: 2,
  },
  {
    id: "6",
    title: "Solar Power Monitor Dashboard",
    description:
      "Real-time monitoring of solar panel voltage, current, and power via OLED + ThingSpeak. Features a web dashboard with historical graphs and SMS alerts for low battery.",
    tags: ["#Renewable", "#IoT", "#Solar"],
    tagStyle: "green",
    cost: "₹ 720",
    semester: "Sem 6",
    student: "Ananya Rao",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
    imageUrl: proj6,
    type: "physical",
    category: "Renewable Energy",
    components: [
      { name: "NodeMCU ESP8266", price: 280 },
      { name: "INA219 Current Sensor", price: 120 },
      { name: "0.96\" OLED Display", price: 180 },
      { name: "Solar Panel (5W)", price: 140 },
    ],
    storeType: "online",
    storeName: "Amazon",
    uploadedDaysAgo: 9,
  },
];
