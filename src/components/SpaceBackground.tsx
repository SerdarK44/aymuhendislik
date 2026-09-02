"use client";

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 
        Organic, scattered pale-grey space geometric lines, constellation clusters, 
        orbital arcs, and celestial coordinates across the viewport.
      */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle line glow filter */}
          <filter id="space-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── CLUSTER 1: Top Right (Services / Header area) ── */}
        <g opacity="0.55" className="transition-opacity duration-700">
          {/* Geometric Triangle & Hex Polygon Network */}
          <polygon
            points="75vw,8vh 88vw,14vh 82vw,26vh 68vw,22vh 62vw,12vh"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.85"
            strokeDasharray="4 4"
          />
          <line x1="75vw" y1="8vh" x2="82vw" y2="26vh" stroke="#cbd5e1" strokeWidth="0.75" />
          <line x1="62vw" y1="12vh" x2="88vw" y2="14vh" stroke="#94a3b8" strokeWidth="0.8" opacity="0.7" />
          <line x1="68vw" y1="22vh" x2="75vw" y2="8vh" stroke="#cbd5e1" strokeWidth="0.6" />
          <line x1="88vw" y1="14vh" x2="96vw" y2="20vh" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="82vw" y1="26vh" x2="92vw" y2="34vh" stroke="#e2e8f0" strokeWidth="0.6" />
          
          {/* Orbital Circle Arc */}
          <path
            d="M 60vw 18vh A 200 200 0 0 1 85vw 32vh"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.6"
            strokeDasharray="2 6"
          />

          {/* Coordinate Crosshairs & Nodes */}
          <circle cx="75vw" cy="8vh" r="2.5" fill="#94a3b8" />
          <circle cx="88vw" cy="14vh" r="3" fill="#b8924a" opacity="0.8" />
          <circle cx="82vw" cy="26vh" r="2" fill="#94a3b8" />
          <circle cx="68vw" cy="22vh" r="2.5" fill="#94a3b8" />
          <circle cx="62vw" cy="12vh" r="2" fill="#cbd5e1" />
          <circle cx="96vw" cy="20vh" r="2" fill="#b8924a" opacity="0.6" />

          {/* Space Coordinate Crosshair */}
          <path d="M 88vw,11vh v 6 M 88vw,14vh h -6 M 88vw,14vh h 6" stroke="#94a3b8" strokeWidth="0.8" />
        </g>

        {/* ── CLUSTER 2: Middle-Left (Projects area) ── */}
        <g opacity="0.5" className="transition-opacity duration-700">
          {/* Triangulated space polygon */}
          <polygon
            points="6vw,38vh 18vw,32vh 24vw,44vh 14vw,54vh 4vw,48vh"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />
          <line x1="6vw" y1="38vh" x2="24vw" y2="44vh" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />
          <line x1="18vw" y1="32vh" x2="14vw" y2="54vh" stroke="#cbd5e1" strokeWidth="0.75" />
          <line x1="24vw" y1="44vh" x2="35vw" y2="40vh" stroke="#e2e8f0" strokeWidth="0.75" />
          <line x1="35vw" y1="40vh" x2="30vw" y2="52vh" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="4 4" />
          <line x1="14vw" y1="54vh" x2="22vw" y2="64vh" stroke="#cbd5e1" strokeWidth="0.75" />

          {/* Nodes */}
          <circle cx="6vw" cy="38vh" r="2" fill="#94a3b8" />
          <circle cx="18vw" cy="32vh" r="3" fill="#b8924a" opacity="0.75" />
          <circle cx="24vw" cy="44vh" r="2.5" fill="#94a3b8" />
          <circle cx="14vw" cy="54vh" r="2" fill="#94a3b8" />
          <circle cx="35vw" cy="40vh" r="2.5" fill="#b8924a" opacity="0.6" />
          <circle cx="22vw" cy="64vh" r="2" fill="#cbd5e1" />

          {/* Coordinate Crosshairs */}
          <path d="M 18vw,29vh v 6 M 18vw,32vh h -6 M 18vw,32vh h 6" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M 35vw,37vh v 6 M 35vw,40vh h -6 M 35vw,40vh h 6" stroke="#94a3b8" strokeWidth="0.8" />
        </g>

        {/* ── CLUSTER 3: Center-Right (Reviews / Testimonials area) ── */}
        <g opacity="0.55" className="transition-opacity duration-700">
          <line x1="65vw" y1="52vh" x2="78vw" y2="48vh" stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1="78vw" y1="48vh" x2="90vw" y2="58vh" stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="90vw" y1="58vh" x2="82vw" y2="68vh" stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1="82vw" y1="68vh" x2="68vw" y2="62vh" stroke="#cbd5e1" strokeWidth="0.75" />
          <line x1="68vw" y1="62vh" x2="65vw" y2="52vh" stroke="#cbd5e1" strokeWidth="0.6" />
          <line x1="65vw" y1="52vh" x2="82vw" y2="68vh" stroke="#e2e8f0" strokeWidth="0.6" />
          <line x1="78vw" y1="48vh" x2="68vw" y2="62vh" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Orbital Circle */}
          <circle
            cx="78vw"
            cy="58vh"
            r="45"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />

          {/* Nodes */}
          <circle cx="65vw" cy="52vh" r="2.5" fill="#94a3b8" />
          <circle cx="78vw" cy="48vh" r="2" fill="#cbd5e1" />
          <circle cx="90vw" cy="58vh" r="3" fill="#b8924a" opacity="0.8" />
          <circle cx="82vw" cy="68vh" r="2.5" fill="#94a3b8" />
          <circle cx="68vw" cy="62vh" r="2" fill="#94a3b8" />
        </g>

        {/* ── CLUSTER 4: Bottom-Left (Blog area) ── */}
        <g opacity="0.5" className="transition-opacity duration-700">
          <polygon
            points="8vw,78vh 20vw,72vh 28vw,82vh 18vw,90vh"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          <line x1="8vw" y1="78vh" x2="28vw" y2="82vh" stroke="#94a3b8" strokeWidth="0.7" />
          <line x1="20vw" y1="72vh" x2="18vw" y2="90vh" stroke="#cbd5e1" strokeWidth="0.75" />
          <line x1="28vw" y1="82vh" x2="38vw" y2="78vh" stroke="#e2e8f0" strokeWidth="0.6" />
          <line x1="18vw" y1="90vh" x2="26vw" y2="96vh" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="4 4" />

          {/* Nodes */}
          <circle cx="8vw" cy="78vh" r="2" fill="#94a3b8" />
          <circle cx="20vw" cy="72vh" r="3" fill="#b8924a" opacity="0.75" />
          <circle cx="28vw" cy="82vh" r="2.5" fill="#94a3b8" />
          <circle cx="18vw" cy="90vh" r="2" fill="#94a3b8" />
          <circle cx="38vw" cy="78vh" r="2" fill="#cbd5e1" />

          <path d="M 20vw,69vh v 6 M 20vw,72vh h -6 M 20vw,72vh h 6" stroke="#94a3b8" strokeWidth="0.8" />
        </g>

        {/* ── SCATTERED ISOLATED CONSTELLATION LINES & CROSSES ── */}
        <g opacity="0.45">
          {/* Top Center vector */}
          <line x1="42vw" y1="6vh" x2="52vw" y2="12vh" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="3 3" />
          <circle cx="42vw" cy="6vh" r="1.5" fill="#94a3b8" />
          <circle cx="52vw" cy="12vh" r="2" fill="#b8924a" opacity="0.6" />
          <path d="M 42vw,4vh v 4 M 42vw,6vh h -4 M 42vw,6vh h 4" stroke="#94a3b8" strokeWidth="0.7" />

          {/* Mid Center vector */}
          <line x1="46vw" y1="46vh" x2="54vw" y2="52vh" stroke="#cbd5e1" strokeWidth="0.6" />
          <circle cx="46vw" cy="46vh" r="2" fill="#94a3b8" />
          <circle cx="54vw" cy="52vh" r="2" fill="#94a3b8" />

          {/* Bottom Right vector */}
          <line x1="72vw" y1="84vh" x2="84vw" y2="90vh" stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="84vw" y1="90vh" x2="94vw" y2="86vh" stroke="#cbd5e1" strokeWidth="0.6" />
          <circle cx="72vw" cy="84vh" r="2" fill="#94a3b8" />
          <circle cx="84vw" cy="90vh" r="3" fill="#b8924a" opacity="0.7" />
          <circle cx="94vw" cy="86vh" r="2" fill="#94a3b8" />
          <path d="M 84vw,87vh v 6 M 84vw,90vh h -6 M 84vw,90vh h 6" stroke="#94a3b8" strokeWidth="0.8" />
        </g>
      </svg>

      {/* Subtle ambient light gradient pools */}
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-brand-500/[0.03] rounded-full blur-[140px]" />
      <div className="absolute top-[50%] left-[5%] w-[600px] h-[600px] bg-ink-400/[0.025] rounded-full blur-[160px]" />
      <div className="absolute top-[80%] right-[15%] w-[550px] h-[550px] bg-brand-500/[0.03] rounded-full blur-[140px]" />
    </div>
  );
}
