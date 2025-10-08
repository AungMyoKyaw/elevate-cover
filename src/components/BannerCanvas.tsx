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
  width: number;
  height: number;
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
  graphicStyle,
  width,
  height
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
    const leftDots = Math.max(6, Math.floor(12 * (width / 1584)));
    const rightDots = Math.max(4, Math.floor(8 * (width / 1584)));
    const spacing = Math.max(20, 45 * scale * (width / 1584));
    const startY = height * 0.25;

    // Create seeds for consistent randomization
    const quantitySeed = createSeed(primaryText + quantityColor, 'quantity');
    const qualitySeed = createSeed(secondaryText + qualityColor, 'quality');

    // Left side - more dots (Quantity)
    for (let i = 0; i < leftDots; i++) {
      const x = width * 0.1 + (i % 4) * spacing;
      const y = startY + Math.floor(i / 4) * spacing;
      const radius =
        Math.max(4, 8 * (width / 1584)) +
        seededRandom(quantitySeed + i) * 4 * (width / 1584);
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
      const x = width * 0.75 + (i % 3) * spacing * 1.2;
      const y = startY + Math.floor(i / 3) * spacing * 1.2;
      const radius =
        Math.max(6, 12 * (width / 1584)) +
        seededRandom(qualitySeed + i) * 6 * (width / 1584);
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
    const scaleX = width / 1584;
    const scaleY = height / 396;

    // Left wide opening (Quantity)
    const leftPath = `M ${100 * scaleX},${80 * scaleY} L ${100 * scaleX},${316 * scaleY} L ${350 * scaleX},${280 * scaleY} L ${350 * scaleX},${116 * scaleY} Z`;
    elements.push(
      <path key="left-funnel" d={leftPath} fill={quantityColor} opacity={0.7} />
    );

    // Middle transition
    const middlePath = `M ${350 * scaleX},${116 * scaleY} L ${350 * scaleX},${280 * scaleY} L ${650 * scaleX},${240 * scaleY} L ${650 * scaleX},${156 * scaleY} Z`;
    elements.push(
      <path
        key="middle-funnel"
        d={middlePath}
        fill={`url(#gradient)`}
        opacity={0.6}
      />
    );

    // Right narrow opening (Quality)
    const rightPath = `M ${650 * scaleX},${156 * scaleY} L ${650 * scaleX},${240 * scaleY} L ${800 * scaleX},${220 * scaleY} L ${800 * scaleX},${176 * scaleY} Z`;
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
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const nodes = [
      {
        x: 150 * scaleX,
        y: 120 * scaleY,
        r: 6 * Math.min(scaleX, scaleY),
        color: quantityColor
      },
      {
        x: 200 * scaleX,
        y: 180 * scaleY,
        r: 7 * Math.min(scaleX, scaleY),
        color: quantityColor
      },
      {
        x: 250 * scaleX,
        y: 100 * scaleY,
        r: 5 * Math.min(scaleX, scaleY),
        color: quantityColor
      },
      {
        x: 280 * scaleX,
        y: 200 * scaleY,
        r: 8 * Math.min(scaleX, scaleY),
        color: quantityColor
      },
      {
        x: 350 * scaleX,
        y: 150 * scaleY,
        r: 6 * Math.min(scaleX, scaleY),
        color: quantityColor
      },
      {
        x: 450 * scaleX,
        y: 180 * scaleY,
        r: 10 * Math.min(scaleX, scaleY),
        color: `url(#gradient)`
      },
      {
        x: 600 * scaleX,
        y: 160 * scaleY,
        r: 12 * Math.min(scaleX, scaleY),
        color: qualityColor
      },
      {
        x: 750 * scaleX,
        y: 190 * scaleY,
        r: 14 * Math.min(scaleX, scaleY),
        color: qualityColor
      },
      {
        x: 900 * scaleX,
        y: 170 * scaleY,
        r: 16 * Math.min(scaleX, scaleY),
        color: qualityColor
      }
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
          strokeWidth={2 * Math.min(scaleX, scaleY)}
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
    const padding = width * 0.076; // Dynamic padding based on width
    switch (textAlign) {
      case 'left':
        return padding;
      case 'right':
        return width - padding;
      case 'center':
      default:
        return width / 2;
    }
  };

  // Calculate perfect vertical centering for both text lines as a group
  const getVerticalPositions = () => {
    const centerPoint = height / 2;
    const halfLineSpacing = lineHeight / 2;

    return {
      primary: centerPoint - halfLineSpacing, // Above center
      secondary: centerPoint + halfLineSpacing // Below center
    };
  };

  const verticalPositions = getVerticalPositions();

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
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
      <rect width={width} height={height} fill="url(#gradient)" />

      {/* Graphic elements */}
      {renderGraphic()}

      {/* Text content - dynamically centered vertically */}
      <text
        x={getTextX()}
        y={verticalPositions.primary}
        fontSize={fontSize}
        fontWeight="700"
        fill="#ffffff"
        textAnchor={getTextAnchor()}
        dominantBaseline="middle"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {primaryText}
      </text>
      <text
        x={getTextX()}
        y={verticalPositions.secondary}
        fontSize={fontSize * 0.7}
        fontWeight="500"
        fill="#ffffff"
        opacity="0.95"
        textAnchor={getTextAnchor()}
        dominantBaseline="middle"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {secondaryText}
      </text>
    </svg>
  );
}
