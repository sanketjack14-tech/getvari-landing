import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, AlertCircle, ShieldCheck } from 'lucide-react';

interface TimelinePoint {
  time: string;
  hydrationRiskScore: number; // Hydration Risk Score (DL)
  cdiScore: number;           // Cognitive Drop Index (CDI)
  classification: string;
  rationale: string;
}

// Organic timeline data points with clear visual gap between CDI and Hydration Risk Score
const GRAPH_DATA: TimelinePoint[] = [
  { 
    time: '08:00', 
    hydrationRiskScore: 26, 
    cdiScore: 46, 
    classification: 'Cognitive Decline Risk — fluid intake recommended',
    rationale: 'Morning fluid deficit combined with sleep inertia creates early cognitive drop.'
  },
  { 
    time: '11:00', 
    hydrationRiskScore: 16, 
    cdiScore: 32, 
    classification: 'Cognitively Sharp',
    rationale: 'Optimal circadian alertness window with baseline hydration stability.'
  },
  { 
    time: '14:30', 
    hydrationRiskScore: 72, 
    cdiScore: 88, 
    classification: 'Cognitive Impairment Risk — priority alert',
    rationale: 'Dehydration load >70 combined with ambient heat & post-lunch circadian dip.'
  },
  { 
    time: '16:30', 
    hydrationRiskScore: 36, 
    cdiScore: 52, 
    classification: 'Moderate Deficit',
    rationale: 'Fluid absorption active; cognitive recovery underway.'
  },
  { 
    time: '19:00', 
    hydrationRiskScore: 18, 
    cdiScore: 34, 
    classification: 'Cognitively Sharp',
    rationale: 'Evening peak equilibrium window; stable mental clarity.'
  },
  { 
    time: '23:00', 
    hydrationRiskScore: 30, 
    cdiScore: 56, 
    classification: 'Pre-sleep Dip',
    rationale: 'Circadian wind-down combined with mild evening fluid reduction.'
  }
];

// Helper to build smooth cubic bezier curve SVG path
function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

export const WhoopGraphWidget: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default to peak risk point
  const activeData = GRAPH_DATA[activeIndex];

  // SVG Chart dimensions
  const svgWidth = 700;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const pointsCount = GRAPH_DATA.length;
  const stepX = (svgWidth - paddingX * 2) / (pointsCount - 1);

  const getX = (idx: number) => paddingX + idx * stepX;
  const getY = (val: number) => svgHeight - paddingY - (val / 100) * (svgHeight - paddingY * 2);

  const riskCoords = GRAPH_DATA.map((d, i) => ({ x: getX(i), y: getY(d.hydrationRiskScore) }));
  const cdiCoords = GRAPH_DATA.map((d, i) => ({ x: getX(i), y: getY(d.cdiScore) }));

  const riskPath = getSmoothPath(riskCoords);
  const cdiPath = getSmoothPath(cdiCoords);

  const cdiAreaPath = `${cdiPath} L ${getX(pointsCount - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;
  const riskAreaPath = `${riskPath} L ${getX(pointsCount - 1)} ${svgHeight - paddingY} L ${getX(0)} ${svgHeight - paddingY} Z`;

  return (
    <div className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden glass-card">
      {/* Header — Clean without formula tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Brain className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono-tech text-purple-300 uppercase tracking-wider font-bold">
              Cognitive Drop Index (CDI) Model
            </span>
          </div>
          <h4 className="text-lg font-bold text-white font-display">
            Hydration Risk Score vs. Cognitive Drop Index
          </h4>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-tech">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-gray-300">Hydration Risk Score</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
            <span className="text-rose-300 font-semibold">Cognitive Drop Index (CDI)</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Area — Hume Health / Apple Health Organic Style */}
      <div className="relative w-full overflow-x-auto select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[550px]"
        >
          <defs>
            <linearGradient id="cdiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>

            {/* Soft Glow Filters */}
            <filter id="softGlowRose" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="softGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[80, 60, 40, 20, 0].map((val) => (
            <g key={val}>
              <line
                x1={paddingX}
                y1={getY(val)}
                x2={svgWidth - paddingX}
                y2={getY(val)}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 8}
                y={getY(val) + 3}
                fill="rgba(156, 163, 175, 0.4)"
                fontSize="10"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Alert Threshold Area (≥60) */}
          <rect
            x={paddingX}
            y={getY(100)}
            width={svgWidth - paddingX * 2}
            height={getY(60) - getY(100)}
            fill="rgba(244, 63, 94, 0.05)"
            rx="6"
          />
          <text
            x={svgWidth - paddingX - 12}
            y={getY(78)}
            fill="rgba(244, 63, 94, 0.5)"
            fontSize="10"
            fontFamily="JetBrains Mono"
            textAnchor="end"
          >
            Impairment Alert Zone (CDI ≥ 60)
          </text>

          {/* Soft Gradient Area Fills */}
          <path d={cdiAreaPath} fill="url(#cdiGrad)" />
          <path d={riskAreaPath} fill="url(#riskGrad)" />

          {/* Hydration Risk Curve (Cyan Smooth Bezier) */}
          <path
            d={riskPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#softGlowCyan)"
            opacity="0.9"
          />

          {/* CDI Curve (Rose/Purple Smooth Bezier) */}
          <path
            d={cdiPath}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#softGlowRose)"
          />

          {/* Interactive Soft Nodes (Hume Health Aesthetics) */}
          {GRAPH_DATA.map((d, i) => {
            const x = getX(i);
            const ry = getY(d.hydrationRiskScore);
            const cy = getY(d.cdiScore);
            const isSelected = i === activeIndex;

            return (
              <g
                key={i}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveIndex(i)}
              >
                {isSelected && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={svgHeight - paddingY}
                    stroke="rgba(244, 63, 94, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Hydration Risk Soft Halo & Node */}
                <circle
                  cx={x}
                  cy={ry}
                  r={isSelected ? 10 : 7}
                  fill="#38bdf8"
                  fillOpacity={isSelected ? 0.25 : 0.1}
                />
                <circle
                  cx={x}
                  cy={ry}
                  r={isSelected ? 5 : 3.5}
                  fill="#38bdf8"
                  stroke="#070a11"
                  strokeWidth="1.5"
                />

                {/* CDI Soft Halo & Node */}
                <circle
                  cx={x}
                  cy={cy}
                  r={isSelected ? 12 : 8}
                  fill="#f43f5e"
                  fillOpacity={isSelected ? 0.3 : 0.12}
                />
                <circle
                  cx={x}
                  cy={cy}
                  r={isSelected ? 6 : 4}
                  fill="#f43f5e"
                  stroke="#070a11"
                  strokeWidth="2"
                />

                {/* X Axis Time Labels */}
                <text
                  x={x}
                  y={svgHeight - 8}
                  fill={isSelected ? '#f43f5e' : 'rgba(156, 163, 175, 0.6)'}
                  fontSize="11"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                >
                  {d.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Output Card */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-3">
            <span className={`p-1.5 rounded-lg ${
              activeData.cdiScore >= 60
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {activeData.cdiScore >= 60 ? <AlertCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </span>
            <div>
              <div className="font-bold text-white font-mono-tech flex items-center gap-2">
                <span>{activeData.time}</span>
                <span className="text-gray-500">•</span>
                <span className="text-cyan-300">Hydration Risk: {activeData.hydrationRiskScore}</span>
                <span className="text-rose-400 font-bold">CDI: {activeData.cdiScore}</span>
              </div>
              <p className="text-gray-300 text-[11px] mt-0.5">{activeData.rationale}</p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-md font-mono-tech text-[10px] font-bold ${
            activeData.cdiScore >= 60
              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {activeData.classification}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
