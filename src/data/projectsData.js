import { COLORS } from '../constants/colors';

export const projectCategories = [
  {
    title: "Ongoing Projects",
    projects: [
      ["Subham Manjushree", "Datalpara"],
      ["Subham Sapphire", "Nalapara"],
      ["Subham Garden", "Jorhat"],
      ["Subham Solitaire", "Agartala"],
    ],
  },
  {
    title: "Residential Projects",
    eyebrow: "Completed Projects",
    projects: [
      ["Subham Enclave", "Hatigaon"],
      ["Subham Park View", "Fatasil"],
      ["Subham Heights", "Kahilipara"],
      ["Subham Classic", "Ambikagiri Nagar"],
      ["Subham Residency", "Kharguli"],
      ["Subham Regency", "Hengrabari"],
      ["Subham Elite", "Gandhibasti"],
    ],
  },
  {
    title: "Residential Cum Commercial Projects",
    eyebrow: "Completed Projects",
    projects: [
      ["Subham Garden", "Kalapahar"],
      ["Subham Buildwell", "Zoo Road"],
      ["Subham Greens", "Lokhra"],
    ],
  },
  {
    title: "Commercial Projects",
    eyebrow: "Completed Projects",
    projects: [
      ["Subham Velocity", "G.S Road"],
      ["Subham Red Stone", "Downtown"],
      ["Subham Square", "Lokhra"],
      ["Bijay Crescent", "Pibco"],
    ],
  },
];

export const developerMetrics = [
  { target: 15,   suffix: "+", label: "Projects Done",   color: COLORS.pink },
  { target: 25,   suffix: "+", label: "Lac Sq.Ft Built",  color: COLORS.cyan },
  { target: 17500, suffix: "+", label: "Happy Residents",  color: COLORS.lime },
];
