import type { Project } from "@/types/project";

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Gas Leak Detector with SMS Alert",
    description:
      "MQ-2 sensor detects gas leakage and immediately triggers SMS via SIM800L GSM module.",
    tags: ["#IoT", "#Arduino", "#Safety"],
    tagStyle: "purple",
    cost: "₹ 850",
    semester: "Sem 3",
    student: "Rohan Mehta",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-1.jpg",
  },
  {
    id: "2",
    title: "Smart Irrigation System",
    description:
      "Soil moisture sensor auto-controls water pump via relay. Saves up to 40% water usage.",
    tags: ["#AgriTech", "#NodeMCU"],
    tagStyle: "green",
    cost: "₹ 1,200",
    semester: "Sem 4",
    student: "Priya Sharma",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-2.jpg",
  },
  {
    id: "3",
    title: "RFID Attendance System",
    description:
      "Contactless RFID-based attendance logger with LCD display and data stored on SD card.",
    tags: ["#RFID", "#Arduino"],
    tagStyle: "blue",
    cost: "₹ 650",
    semester: "Sem 2",
    student: "Aarav Patel",
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-3.jpg",
  },
  {
    id: "4",
    title: "Home Automation with Alexa",
    description:
      "Voice-controlled home appliances via ESP8266 and Alexa skill integration over Wi-Fi.",
    tags: ["#HomeAuto", "#ESP8266", "#Voice"],
    tagStyle: "orange",
    cost: "₹ 980",
    semester: "Sem 5",
    student: "Sneha Iyer",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-4.jpg",
  },
  {
    id: "5",
    title: "Autonomous Line Following Robot",
    description:
      "Two-wheeled robot uses IR sensors and PID control to follow black tape lines autonomously.",
    tags: ["#Robotics", "#PID", "#Arduino"],
    tagStyle: "purple",
    cost: "₹ 1,450",
    semester: "Sem 4",
    student: "Karan Singh",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-5.jpg",
  },
  {
    id: "6",
    title: "Solar Power Monitor Dashboard",
    description:
      "Real-time monitoring of solar panel voltage, current, and power via OLED + ThingSpeak.",
    tags: ["#Renewable", "#IoT", "#Solar"],
    tagStyle: "green",
    cost: "₹ 720",
    semester: "Sem 6",
    student: "Ananya Rao",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
    imageUrl: "/src/assets/project-6.jpg",
  },
];
