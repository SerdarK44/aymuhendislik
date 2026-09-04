export interface ServiceContentTranslation {
  title: string;
  shortDesc: string;
  description: string;
  features?: string[];
}

export interface ProjectContentTranslation {
  title: string;
  category: string;
  description: string;
}

export interface FaqContentTranslation {
  q: string;
  a: string;
  tag?: string;
}

export const servicesEnMap: Record<string, ServiceContentTranslation> = {
  "endustriyel-dogalgaz-tesisati": {
    title: "Industrial Natural Gas Piping & Conversion",
    shortDesc: "High-capacity gas distribution piping, RMS station deployment, and industrial burner conversions for factories and plants.",
    description: "Certified EPC engineering for manufacturing plants and industrial parks including high-pressure carbon steel pipelines, automatic shut-off safety valves, and turnkey RMS-B / RMS-C regulating stations.",
    features: [
      "RMS-B & RMS-C Pressure Regulating & Metering Stations",
      "High-Pressure Radiographically Tested Welded Steel Lines",
      "Furnace, Steam Boiler & Kiln Dual-Fuel Burner Conversions",
      "Optical & Catalytic Gas Leak Detection and Safety Interlocks",
      "Official Gas Distribution Authority Approval & Commissioning"
    ]
  },
  "dogalgaz-projelendirme-ve-gaz-acma": {
    title: "CAD Gas Engineering & Official Commissioning",
    shortDesc: "Approved 3D/CAD digital engineering design drafted by licensed engineers with accelerated gas commissioning.",
    description: "Full statutory compliance engineering: drafting precision digital CAD layouts for commercial, residential, and industrial complexes with direct approval from EPDK and regional gas authorities.",
    features: [
      "Certified Mechanical Engineering 3D CAD Blueprinting",
      "Statutory Authority Submission & Expedited Meter Commissioning",
      "Capacity Expansion & Retrofit Design Projects",
      "Central Boiler Room & Gas Riser Engineering",
      "Official Statutory Compliance & Gas Release Certification"
    ]
  },
  "merkezi-isitma-ve-kazan-dairesi": {
    title: "Central Heating & Commercial Cascade Boilers",
    shortDesc: "Energy-efficient condensing cascade boiler room construction and automation for estates, hotels, and business towers.",
    description: "Cutting heating energy expenses by up to 35% with fully modulating condensing cascade boilers, hydraulic separators, expansion vessels, and smart weather compensation controls.",
    features: [
      "Wall-Hung & Floor-Standing Commercial Condensing Cascades",
      "Certified Mechanical Room Ventilation & Stainless Flue Systems",
      "Automated Heat Exchangers & Hydraulic Balancing Headers",
      "Smart Energy Sub-Metering Integration",
      "Remote Monitoring & Automated Pump Sequencing"
    ]
  },
  "cad-proje-cizimi-ve-onay-takibi": {
    title: "CAD Blueprint Drafting & Authority Approvals",
    shortDesc: "Certified engineering project drafting and official liaison with gas distribution authorities.",
    description: "Detailed isometric and hydraulic gas calculations drawn in 3D CAD environments according to international safety and local gas authority codes.",
    features: [
      "Certified Engineering Project Drafting",
      "Gas Distribution Authority Digital Approval Tracking",
      "Hydraulic Line Loss Calculations",
      "Rapid Permitting and Official Acceptance"
    ]
  },
  "fabrika-ve-osb-dogalgaz-donusumu": {
    title: "Factory & Industrial Park Conversions",
    shortDesc: "Complete energy transition from heavy fuel oil, coal, or LPG to natural gas for large industrial facilities.",
    description: "End-to-end industrial infrastructure conversion including main transmission lines, high-pressure safety skids, burner replacements, and environmental acceptance.",
    features: [
      "Turnkey Energy Source Conversion",
      "Heavy Industrial Plant Infrastructure",
      "High-Efficiency Combustion Tuning",
      "Safety Interlock & SCADA Integration"
    ]
  },
  "radyant-ve-borulu-isitma-sistemleri": {
    title: "Radiant & Tube Space Heating Systems",
    shortDesc: "High-efficiency radiant heating solutions for high-ceiling warehouses, hangars, and logistics hubs.",
    description: "Direct infrared and ceramic gas radiant systems delivering targeted comfort with minimal thermal losses in expansive industrial spaces.",
    features: [
      "Overhead Ceramic and Tube Radiant Units",
      "Zone-Based Intelligent Thermostatic Management",
      "Fast Payback & Reduced Thermal Waste",
      "Ideal for Logistics Warehouses & Fabrication Halls"
    ]
  },
  "lng-cng-lpg-depolama-ve-buharlastirici": {
    title: "LNG / LPG Systems & Vaporization Infrastructure",
    shortDesc: "Off-grid bulk fuel storage, cryogenic LNG tanks, and vaporizers for facilities beyond the utility pipeline grid.",
    description: "Turnkey off-grid energy systems ensuring uninterrupted factory operations with cryogenic storage, ambient vaporizers, and automatic pressure controls.",
    features: [
      "Cryogenic LNG Storage Tanks & Vaporizers",
      "Bulk LPG Storage Yards & Fire Suppression Infrastructure",
      "High-Flow Pressure Regulating Skids",
      "ATEX Certified Explosion-Proof Safety Valves",
      "24/7 Technical Support & Filling Logistics Coordination"
    ]
  }
};

export const projectsEnMap: Record<string, ProjectContentTranslation> = {
  "organize-sanayi-bolgesi-metal-isleme-fabrikasi": {
    title: "Industrial Metal Foundry & Heat Treatment Gas Infrastructure",
    category: "Industrial",
    description: "Complete turnkey gas infrastructure with RMS-B station, 4-bar welded steel pipeline, and radiographic inspection for high-consumption annealing kilns."
  },
  "mega-center-lojistik-depo-ve-idari-bina-radyant-kaskad": {
    title: "18,000 m² Logistics Hub Overhead Radiant & Cascade Heating",
    category: "Commercial & Logistics",
    description: "Commissioning 24 overhead tube radiant heaters and an 800 kW commercial cascade boiler room, reducing energy consumption by 40%."
  },
  "vadi-panaroma-konutlari-240-daire-kolon-ve-kombi": {
    title: "Vadi Panorama Residential Complex 240-Unit Gas Retrofit",
    category: "Residential Complex",
    description: "Executed main gas risers, individual high-efficiency condensing boilers, and municipal gas commissioning for 6 residential towers in 15 days."
  },
  "gida-uretim-tesisi-buhar-kazani-brulor-donusumu": {
    title: "Food Processing Plant Industrial Steam Boiler Dual-Fuel Conversion",
    category: "Industrial",
    description: "Replaced heavy fuel-oil burners on 5 ton/hr steam boilers with high-efficiency modulating gas burners, passing rigorous authority inspections."
  },
  "avm-restoranlar-kosesi-toplu-gaz-altyapisi": {
    title: "Shopping Mall Commercial Kitchens Master Safety Gas Infrastructure",
    category: "Commercial",
    description: "Turnkey gas infrastructure serving 14 commercial restaurants with explosion-proof solenoid valves, gas alarm central consoles, and independent meter arrays."
  }
};

export const whyUsEn = {
  badge: "Why Ay Mühendislik",
  title: "Safe, Certified and Fast Execution",
  subtitle: "Natural gas permits zero tolerance for errors. With certified engineering assurance, we deliver every project in strict compliance with international ASME, EN, and national standards.",
  items: [
    {
      title: "EPDK & Authority Certified",
      desc: "All blueprints are engineered and stamped by certified mechanical engineers, guaranteeing official approval."
    },
    {
      title: "Accelerated Gas Commissioning",
      desc: "From initial design sign-off to official gas opening, we manage the entire lifecycle with expedited digital tracking."
    },
    {
      title: "16+ Years Field Experience",
      desc: "Distinguished references spanning heavy industrial manufacturers, logistics centers, and residential developments."
    },
    {
      title: "24/7 Rapid Emergency Response",
      desc: "Specialized technicians and engineers ready on the field 24/7 for critical incidents, inspections, and system maintenance."
    }
  ]
};

export const faqsEn: FaqContentTranslation[] = [
  {
    q: "How long does gas project drafting and official commissioning take?",
    a: "After our certified mechanical engineers conduct an on-site survey, your 3D CAD design is drafted within 24 hours and submitted digitally to the regional gas authority. Following design approval, our certified team completes installation, and official gas commissioning typically takes place within 3 to 5 business days.",
    tag: "Design & Approvals"
  },
  {
    q: "Is an RMS station mandatory for industrial plants and factories?",
    a: "Yes. High-pressure pipeline gas (4 to 19 bar) must be regulated down to 300 mbar or 21 mbar, filtered, and precisely metered before entering factory furnaces, steam boilers, or burners. We build turnkey RMS-B and RMS-C pressure regulating stations adhering to international norms.",
    tag: "Industrial Systems"
  },
  {
    q: "What is the operational cost difference between central cascade boilers and individual units?",
    a: "In residential complexes and commercial buildings, condensing cascade boiler rooms modulate burner outputs based on dynamic ambient weather sensors, consuming up to 35% less fuel than distributed individual units. Initial capital expenditure and maintenance costs are also substantially more economical.",
    tag: "Cascade & Efficiency"
  },
  {
    q: "Can natural gas installation be performed without a certified engineering license?",
    a: "Strictly no. By statutory regulations, modifying gas infrastructure without an authorized engineering license is illegal, resulting in immediate disconnection of gas supplies. Ay Mühendislik provides 100% statutory compliance and official warranty.",
    tag: "Legal Compliance"
  },
  {
    q: "Which regions do you serve? Do you undertake large projects outside Istanbul?",
    a: "Our central engineering headquarters is in Istanbul (Tekstilkent), and we execute turnkey industrial and commercial engineering projects nationwide across all 81 provinces in Turkey, including heavy industrial parks and power facilities.",
    tag: "Nationwide Service"
  },
  {
    q: "Do you provide emergency response and gas leak troubleshooting?",
    a: "Yes. We maintain a dedicated 24/7 technical emergency line for all facilities we commission. Solenoid valve trips, regulator fluctuations, and gas alarm console issues are attended to promptly by certified technicians.",
    tag: "24/7 Support"
  }
];
