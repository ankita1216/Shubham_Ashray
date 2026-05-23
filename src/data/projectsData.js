import { COLORS } from '../constants/colors';

const completedProjects = [
  { name: "Subham Enclave", location: "Hatigaon" },
  { name: "Subham Park View", location: "Fatasil" },
  { name: "Subham Heights", location: "Kahilipara" },
  { name: "Subham Classic", location: "Ambikagiri Nagar" },
  { name: "Subham Residency", location: "Kharguli" },
  { name: "Subham Regency", location: "Hengrabari" },
  { name: "Subham Elite", location: "Gandhibasti" },
  { name: "Subham Manjushree", location: "Datalpara" },
  { name: "Subham Sapphire", location: "Nalapara" },
  { name: "Subham Garden", location: "Kalapahar" },
  { name: "Subham Greens", location: "Lokhra" },
  { name: "Subham Buildwell", location: "Zoo Road" },
  { name: "Subham Velocity", location: "G.S Road" },
  { name: "Subham Redstone", location: "Downtown" },
  { name: "Subham Square", location: "Lokhra" },
  { name: "Bijay Crescent", location: "Pibco" }
];

const ongoingProjects = [
  { name: "Subham Garden", location: "Jorhat" },
  { name: "Subham Solitaire", location: "Agartala" },
  { name: "Subham Ashray", location: "Near Airport, Guwahati" },
  { name: "Subham Park", location: "Bongaigaon" },
  { name: "Subham Park", location: "Jorhat" }
];

export const projectCategories = [
  {
    title: "Completed Projects",
    eyebrow: "Delivered Portfolio",
    projects: completedProjects.map(project => [project.name, project.location])
  },
  {
    title: "Ongoing Projects",
    eyebrow: "Current Developments",
    projects: ongoingProjects.map(project => [project.name, project.location])
  }
];

export const developerMetrics = [
  { target: 16,   suffix: "+", label: "Projects Done",   color: COLORS.pink },
  { target: 25,   suffix: "+", label: "Lac Sq.Ft Built",  color: COLORS.cyan },
  { target: 17500, suffix: "+", label: "Happy Residents",  color: COLORS.lime },
];

