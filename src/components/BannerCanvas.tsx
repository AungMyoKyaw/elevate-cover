'use client';

import { useEffect, useRef } from 'react';

export type GraphicStyle = 'dots' | 'funnel' | 'network';

interface BannerCanvasProps {
  primaryText: string;
  secondaryText: string;
  quantityColor: string;
  qualityColor: string;
  fontSize: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  graphicStyle: GraphicStyle;
}

// Seeded random number generator for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Create a consistent seed based on inputs
const createSeed = (text: string, color: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash = hash & hash;
  }
  for (let i = 0; i < color.length; i++) {
    hash = (hash << 5) - hash + color.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export default function BannerCanvas({
  primaryText,
  secondaryText,
  quantityColor,
  qualityColor,
  fontSize,
  lineHeight,
  textAlign,
  graphicStyle
}: BannerCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const renderGraphic = () => {
    const textLength = (primaryText + secondaryText).length;
    const scale = Math.max(0.5, 1 - textLength / 200);

    switch (graphicStyle) {
      case 'dots':
        return renderDots(scale);
      case 'funnel':
        return renderFunnel(scale);
      case 'network':
        return renderNetwork(scale);
      default:
        return null;
    }
  };

  const renderDots = (scale: number) => {
    const dots = [];
    const leftDots = 12;
    const rightDots = 8;
    const spacing = 45 * scale;
    const startY = 100;

    // Create seeds for consistent randomization
    const quantitySeed = createSeed(primaryText + quantityColor, 'quantity');
    const qualitySeed = createSeed(secondaryText + qualityColor, 'quality');

    // Left side - more dots (Quantity)
    for (let i = 0; i < leftDots; i++) {
      const x = 150 + (i % 4) * spacing;
      const y = startY + Math.floor(i / 4) * spacing;
      const radius = 8 + seededRandom(quantitySeed + i) * 4;
      dots.push(
        <circle
          key={`left-${i}`}
          cx={x}
          cy={y}
          r={radius}
          fill={quantityColor}
          opacity={0.7 + seededRandom(quantitySeed + i + 100) * 0.3}
        />
      );
    }

    // Right side - fewer dots (Quality)
    for (let i = 0; i < rightDots; i++) {
      const x = 1200 + (i % 3) * spacing * 1.2;
      const y = startY + Math.floor(i / 3) * spacing * 1.2;
      const radius = 12 + seededRandom(qualitySeed + i) * 6;
      dots.push(
        <circle
          key={`right-${i}`}
          cx={x}
          cy={y}
          r={radius}
          fill={qualityColor}
          opacity={0.8 + seededRandom(qualitySeed + i + 100) * 0.2}
        />
      );
    }

    return <g>{dots}</g>;
  };

  const renderFunnel = (scale: number) => {
    const elements = [];

    // Left wide opening (Quantity)
    const leftPath = `M 100,80 L 100,316 L 350,280 L 350,116 Z`;
    elements.push(
      <path key="left-funnel" d={leftPath} fill={quantityColor} opacity={0.7} />
    );

    // Middle transition
    const middlePath = `M 350,116 L 350,280 L 650,240 L 650,156 Z`;
    elements.push(
      <path
        key="middle-funnel"
        d={middlePath}
        fill={`url(#gradient)`}
        opacity={0.6}
      />
    );

    // Right narrow opening (Quality)
    const rightPath = `M 650,156 L 650,240 L 800,220 L 800,176 Z`;
    elements.push(
      <path
        key="right-funnel"
        d={rightPath}
        fill={qualityColor}
        opacity={0.8}
      />
    );

    return <g transform={`scale(${scale + 0.3})`}>{elements}</g>;
  };

  const renderNetwork = (scale: number) => {
    const elements = [];
    const nodes = [
      { x: 150, y: 120, r: 6, color: quantityColor },
      { x: 200, y: 180, r: 7, color: quantityColor },
      { x: 250, y: 100, r: 5, color: quantityColor },
      { x: 280, y: 200, r: 8, color: quantityColor },
      { x: 350, y: 150, r: 6, color: quantityColor },
      { x: 450, y: 180, r: 10, color: `url(#gradient)` },
      { x: 600, y: 160, r: 12, color: qualityColor },
      { x: 750, y: 190, r: 14, color: qualityColor },
      { x: 900, y: 170, r: 16, color: qualityColor }
    ];

    // Draw connections
    for (let i = 0; i < nodes.length - 1; i++) {
      const from = nodes[i];
      const to = nodes[i + 1];
      elements.push(
        <line
          key={`line-${i}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={i < 4 ? quantityColor : qualityColor}
          strokeWidth={2}
          opacity={0.4}
        />
      );
    }

    // Draw nodes
    nodes.forEach((node, idx) => {
      elements.push(
        <circle
          key={`node-${idx}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.color}
          opacity={0.9}
        />
      );
    });

    return <g transform={`scale(${scale + 0.5})`}>{elements}</g>;
  };

  const getTextAnchor = () => {
    switch (textAlign) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      case 'center':
      default:
        return 'middle';
    }
  };

  const getTextX = () => {
    switch (textAlign) {
      case 'left':
        return 120;
      case 'right':
        return 1464;
      case 'center':
      default:
        return 792;
    }
  };

  useEffect(() => {
    // This effect can be used for any animations or dynamic updates
  }, [
    primaryText,
    secondaryText,
    quantityColor,
    qualityColor,
    fontSize,
    lineHeight,
    textAlign,
    graphicStyle
  ]);

  return (
    <svg
      ref={svgRef}
      width="1584"
      height="396"
      viewBox="0 0 1584 396"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto border border-gray-300 rounded-lg shadow-lg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={quantityColor} />
          <stop offset="100%" stopColor={qualityColor} />
        </linearGradient>
      </defs>

      {/* Background gradient */}
      <rect width="1584" height="396" fill="url(#gradient)" />

      {/* Graphic elements */}
      {renderGraphic()}

      {/* Text content */}
      <text
        x={getTextX()}
        y={150}
        fontSize={fontSize}
        fontWeight="700"
        fill="#ffffff"
        textAnchor={getTextAnchor()}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {primaryText}
      </text>
      <text
        x={getTextX()}
        y={150 + lineHeight}
        fontSize={fontSize * 0.7}
        fontWeight="500"
        fill="#ffffff"
        opacity="0.95"
        textAnchor={getTextAnchor()}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {secondaryText}
      </text>
    </svg>
  );
}
