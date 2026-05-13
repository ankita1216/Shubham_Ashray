// Plan Images
import masterPlan from '../assets/images/Master Plan .webp';

// Unit Plans
import unitPlan1 from '../assets/images/UNIT PLAN .webp';
import unitPlan2 from '../assets/images/UNIT PLAN (PHASE II).webp';
import unitPlan3 from '../assets/images/UNIT PLAN 3BHK PREMIUM.webp';
import unitPlan4 from '../assets/images/UNIT TYPE 2BHK (SMART).webp';
import unitPlan5 from '../assets/images/Unit Plan-3BHK.webp';

// Block Plans
import blockA from '../assets/images/Block A phase 1.webp';
import blockBC from '../assets/images/BLOCK B & C.webp';
import blockD from '../assets/images/BLOCK D .webp';
import blockE from '../assets/images/BLOCK E.webp';
import blockF from '../assets/images/BLOCK F.webp';
import blockH from '../assets/images/BLOCK H.webp';

export const floorPlansData = {
  master: {
    title: "Master Plan",
    image: masterPlan
  },
  units: [
    { title: "Standard Unit Plan", image: unitPlan1 },
    { title: "Phase II Unit Plan", image: unitPlan2 },
    { title: "3BHK Premium Plan", image: unitPlan3 },
    { title: "2BHK Smart Type", image: unitPlan4 },
    { title: "3BHK Standard Type", image: unitPlan5 },
  ],
  blocks: [
    { name: "Block A", image: blockA },
    { name: "Block B & C", image: blockBC },
    { name: "Block D", image: blockD },
    { name: "Block E", image: blockE },
    { name: "Block F", image: blockF },
    { name: "Block H", image: blockH },
  ]
};
