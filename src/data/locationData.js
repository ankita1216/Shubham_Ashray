import { COLORS } from '../constants/colors';

export const locationData = [
  { title: "Connectivity",  color: COLORS.cyan,   items: [["NH 17","2 km","near"],["Dharapur Bus Stop","2 km","near"],["Airport","5.7 km","mid"],["Jalukbari Flyover","10 km","far"],["Kamakhya Railway Station","12 km","far"]] },
  { title: "Education",     color: "#4CAF50",items: [["Kidzee Dharapur","0.8 km","near"],["Girijananda Chowdhury University","2.9 km","near"],["Assam Don Bosco University","3.3 km","near"],["Gauhati University","5.4 km","mid"]] },
  { title: "Healthcare",    color: COLORS.pink,   items: [["I Care Diagnostic","2.1 km","near"],["City Health Centre","3.7 km","near"],["Apollo Excelcare Hospital","12 km","far"]] },
  { title: "Daily Needs and Leisure",     color: COLORS.yellow, items: [["Decathlon Azara","6.7 km","mid"],["NCS Square Mall","8.4 km","mid"],["Westside","9 km","far"]] },
];

export const distanceTierConfig = {
  colors: { near: "#4CAF50", mid: COLORS.yellow, far: COLORS.pink },
  backgrounds: { near: "rgba(76,175,80,0.1)", mid: "rgba(255,184,0,0.1)", far: "rgba(233,30,140,0.1)" }
};
