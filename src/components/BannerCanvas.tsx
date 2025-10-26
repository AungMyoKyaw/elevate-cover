'use client';

import React, { useEffect, useRef } from 'react';

export type GraphicStyle =
  | 'dots'
  | 'funnel'
  | 'network'
  | 'waves'
  | 'geometric'
  | 'particles'
  | 'rays'
  | 'spiral'
  | 'hexagons'
  | 'flow'
  | 'prism'
  | 'constellation'
  | 'ripple'
  | 'mosaic'
  | 'aurora'
  | 'bricks'
  | 'lines'
  | 'blocks'
  | 'brutalist-grid'
  | 'striped'
  | 'industrial';

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
      case 'waves':
        return renderWaves();
      case 'geometric':
        return renderGeometric(scale);
      case 'particles':
        return renderParticles();
      case 'rays':
        return renderRays(scale);
      case 'spiral':
        return renderSpiral(scale);
      case 'hexagons':
        return renderHexagons(scale);
      case 'flow':
        return renderFlow(scale);
      case 'prism':
        return renderPrism(scale);
      case 'constellation':
        return renderConstellation();
      case 'ripple':
        return renderRipple();
      case 'mosaic':
        return renderMosaic(scale);
      case 'aurora':
        return renderAurora();
      case 'bricks':
        return renderBricks();
      case 'lines':
        return renderLines();
      case 'blocks':
        return renderBlocks();
      case 'brutalist-grid':
        return renderBrutalistGrid();
      case 'striped':
        return renderStriped();
      case 'industrial':
        return renderIndustrial();
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

  const renderWaves = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const waves = 4;

    for (let i = 0; i < waves; i++) {
      const amplitude = (20 + i * 10) * Math.min(scaleX, scaleY);
      const frequency = 0.01 + i * 0.002;
      const yOffset = height / 2 - waves * 15 * scaleY + i * 30 * scaleY;
      const points = [];

      for (let x = 0; x <= width; x += 10) {
        const y = yOffset + Math.sin(x * frequency) * amplitude;
        points.push(`${x},${y}`);
      }

      const pathD = `M ${points.join(' L ')} L ${width},${height} L 0,${height} Z`;
      const opacity = 0.15 + i * 0.1;
      const color = i < 2 ? quantityColor : qualityColor;

      elements.push(
        <path key={`wave-${i}`} d={pathD} fill={color} opacity={opacity} />
      );
    }

    return <g>{elements}</g>;
  };

  const renderGeometric = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;

    // Triangles on the left (Quantity)
    const triangles = [
      { x: 150, y: 100, size: 50 },
      { x: 250, y: 180, size: 40 },
      { x: 180, y: 250, size: 45 },
      { x: 300, y: 120, size: 35 }
    ];

    triangles.forEach((tri, idx) => {
      const x = tri.x * scaleX;
      const y = tri.y * scaleY;
      const size = tri.size * Math.min(scaleX, scaleY);
      const path = `M ${x},${y - size} L ${x + size * 0.866},${y + size * 0.5} L ${x - size * 0.866},${y + size * 0.5} Z`;

      elements.push(
        <path
          key={`tri-${idx}`}
          d={path}
          fill={quantityColor}
          opacity={0.3 + idx * 0.1}
          transform={`rotate(${idx * 30} ${x} ${y})`}
        />
      );
    });

    // Squares in the middle (Transition)
    const squares = [
      { x: 450, y: 150, size: 40 },
      { x: 550, y: 200, size: 35 }
    ];

    squares.forEach((sq, idx) => {
      const x = sq.x * scaleX;
      const y = sq.y * scaleY;
      const size = sq.size * Math.min(scaleX, scaleY);

      elements.push(
        <rect
          key={`sq-${idx}`}
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          fill="url(#gradient)"
          opacity={0.5}
          transform={`rotate(${45 + idx * 15} ${x} ${y})`}
        />
      );
    });

    // Circles on the right (Quality)
    const circles = [
      { x: 750, y: 140, r: 45 },
      { x: 850, y: 200, r: 50 },
      { x: 950, y: 160, r: 55 }
    ];

    circles.forEach((cir, idx) => {
      const x = cir.x * scaleX;
      const y = cir.y * scaleY;
      const r = cir.r * Math.min(scaleX, scaleY);

      elements.push(
        <circle
          key={`cir-${idx}`}
          cx={x}
          cy={y}
          r={r}
          fill={qualityColor}
          opacity={0.4 + idx * 0.15}
        />
      );
    });

    return <g transform={`scale(${scale + 0.3})`}>{elements}</g>;
  };

  const renderParticles = () => {
    const elements: React.JSX.Element[] = [];
    const particleCount = 60;
    const quantitySeed = createSeed(primaryText + quantityColor, 'particles');

    for (let i = 0; i < particleCount; i++) {
      const progress = i / particleCount;
      const seed = quantitySeed + i;

      // Position particles along a transformation path
      const x = width * (0.1 + progress * 0.8);
      const y = height * (0.3 + seededRandom(seed) * 0.4);

      // Size increases from left to right (quality)
      const size = (2 + progress * 8) * (width / 1584);

      // Color transitions from quantity to quality
      const color = progress < 0.5 ? quantityColor : qualityColor;
      const opacity = 0.3 + seededRandom(seed + 1000) * 0.5;

      elements.push(
        <circle
          key={`particle-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill={color}
          opacity={opacity}
        />
      );
    }

    return <g>{elements}</g>;
  };

  const renderRays = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const centerX = width * 0.3;
    const centerY = height / 2;
    const rayCount = 12;

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const length = (100 + i * 30) * Math.min(scaleX, scaleY);
      const thickness = 3 * Math.min(scaleX, scaleY);

      const x1 = centerX;
      const y1 = centerY;
      const x2 = centerX + Math.cos(angle) * length;
      const y2 = centerY + Math.sin(angle) * length;

      const color = i < rayCount / 2 ? quantityColor : qualityColor;
      const opacity = 0.2 + (i / rayCount) * 0.4;

      elements.push(
        <line
          key={`ray-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={thickness}
          opacity={opacity}
          strokeLinecap="round"
        />
      );
    }

    // Central circle
    elements.push(
      <circle
        key="ray-center"
        cx={centerX}
        cy={centerY}
        r={15 * Math.min(scaleX, scaleY)}
        fill="url(#gradient)"
        opacity={0.8}
      />
    );

    return <g transform={`scale(${scale + 0.4})`}>{elements}</g>;
  };

  const renderSpiral = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const centerX = width / 2;
    const centerY = height / 2;
    const spirals = 2;

    for (let s = 0; s < spirals; s++) {
      const points: string[] = [];
      const rotationOffset = s * Math.PI;
      const color = s === 0 ? quantityColor : qualityColor;

      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const angle = t * Math.PI * 4 + rotationOffset;
        const radius = t * 300 * Math.min(scaleX, scaleY);

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        points.push(`${x},${y}`);
      }

      elements.push(
        <polyline
          key={`spiral-${s}`}
          points={points.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={4 * Math.min(scaleX, scaleY)}
          opacity={0.5}
          strokeLinecap="round"
        />
      );

      // Add circles along the spiral
      for (let i = 0; i <= 100; i += 20) {
        const t = i / 100;
        const angle = t * Math.PI * 4 + rotationOffset;
        const radius = t * 300 * Math.min(scaleX, scaleY);

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const circleR = (3 + t * 6) * Math.min(scaleX, scaleY);

        elements.push(
          <circle
            key={`spiral-dot-${s}-${i}`}
            cx={x}
            cy={y}
            r={circleR}
            fill={color}
            opacity={0.7}
          />
        );
      }
    }

    return <g transform={`scale(${scale + 0.2})`}>{elements}</g>;
  };

  const renderHexagons = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const hexSize = 35 * Math.min(scaleX, scaleY);
    const cols = 12;
    const rows = 4;

    const createHexPath = (cx: number, cy: number, size: number) => {
      const points: string[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return `M ${points.join(' L ')} Z`;
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOffset = col * hexSize * 1.73 + (row % 2) * hexSize * 0.865;
        const yOffset = row * hexSize * 1.5;

        const cx = 150 * scaleX + xOffset;
        const cy = 100 * scaleY + yOffset;

        if (cx > width * 0.95) continue;

        const progress = col / cols;
        const color = progress < 0.5 ? quantityColor : qualityColor;
        const opacity = 0.2 + progress * 0.4;
        const size = hexSize * (0.7 + progress * 0.3);

        elements.push(
          <path
            key={`hex-${row}-${col}`}
            d={createHexPath(cx, cy, size)}
            fill={color}
            opacity={opacity}
            stroke={color}
            strokeWidth={1}
          />
        );
      }
    }

    return <g transform={`scale(${scale + 0.4})`}>{elements}</g>;
  };

  const renderFlow = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const paths = 5;

    for (let i = 0; i < paths; i++) {
      const yBase = height * (0.2 + i * 0.15);
      const points: string[] = [];

      for (let x = 0; x <= width; x += 20) {
        const wave1 = Math.sin((x / width) * Math.PI * 2 + i) * 20 * scaleY;
        const wave2 =
          Math.sin((x / width) * Math.PI * 3 + i * 0.5) * 15 * scaleY;
        const y = yBase + wave1 + wave2;
        points.push(`${x},${y}`);
      }

      const progress = i / paths;
      const color = progress < 0.5 ? quantityColor : qualityColor;
      const pathD = `M ${points.join(' L ')}`;

      elements.push(
        <path
          key={`flow-${i}`}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={3 * Math.min(scaleX, scaleY)}
          opacity={0.4 + progress * 0.3}
          strokeLinecap="round"
        />
      );
    }

    return <g transform={`scale(${scale + 0.3})`}>{elements}</g>;
  };

  const renderPrism = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const centerX = width * 0.35;
    const centerY = height / 2;

    // Create prism effect with triangular light rays
    const rays = 8;
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI - Math.PI / 2;
      const spread = 0.3;
      const length = 250 * Math.min(scaleX, scaleY);

      const x1 = centerX;
      const y1 = centerY;
      const x2 = centerX + Math.cos(angle - spread) * length;
      const y2 = centerY + Math.sin(angle - spread) * length;
      const x3 = centerX + Math.cos(angle + spread) * length;
      const y3 = centerY + Math.sin(angle + spread) * length;

      const progress = i / rays;
      const color = progress < 0.5 ? quantityColor : qualityColor;
      const pathD = `M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} Z`;

      elements.push(
        <path
          key={`prism-${i}`}
          d={pathD}
          fill={color}
          opacity={0.2 + progress * 0.3}
        />
      );
    }

    // Central prism
    const prismSize = 30 * Math.min(scaleX, scaleY);
    const prismPath = `M ${centerX},${centerY - prismSize} L ${centerX + prismSize * 0.866},${centerY + prismSize * 0.5} L ${centerX - prismSize * 0.866},${centerY + prismSize * 0.5} Z`;

    elements.push(
      <path
        key="prism-center"
        d={prismPath}
        fill="url(#gradient)"
        opacity={0.9}
      />
    );

    return <g transform={`scale(${scale + 0.4})`}>{elements}</g>;
  };

  const renderConstellation = () => {
    const elements: React.JSX.Element[] = [];
    const starCount = 30;
    const seed = createSeed(primaryText + quantityColor, 'constellation');

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      progress: number;
    }> = [];

    for (let i = 0; i < starCount; i++) {
      const progress = i / starCount;
      const x = width * (0.1 + seededRandom(seed + i) * 0.8);
      const y = height * (0.2 + seededRandom(seed + i + 1000) * 0.6);
      const size = (2 + progress * 5) * (width / 1584);

      stars.push({ x, y, size, progress });
    }

    // Draw connections between nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[j].x - stars[i].x;
        const dy = stars[j].y - stars[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < width * 0.15) {
          const avgProgress = (stars[i].progress + stars[j].progress) / 2;
          const color = avgProgress < 0.5 ? quantityColor : qualityColor;

          elements.push(
            <line
              key={`constellation-line-${i}-${j}`}
              x1={stars[i].x}
              y1={stars[i].y}
              x2={stars[j].x}
              y2={stars[j].y}
              stroke={color}
              strokeWidth={1 * (width / 1584)}
              opacity={0.3}
            />
          );
        }
      }
    }

    // Draw stars
    stars.forEach((star, idx) => {
      const color = star.progress < 0.5 ? quantityColor : qualityColor;

      elements.push(
        <circle
          key={`constellation-star-${idx}`}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill={color}
          opacity={0.8}
        />
      );

      // Add star glow
      elements.push(
        <circle
          key={`constellation-glow-${idx}`}
          cx={star.x}
          cy={star.y}
          r={star.size * 2}
          fill={color}
          opacity={0.2}
        />
      );
    });

    return <g>{elements}</g>;
  };

  const renderRipple = () => {
    const elements: React.JSX.Element[] = [];
    const centerX = width * 0.3;
    const centerY = height / 2;
    const ripples = 8;

    for (let i = 0; i < ripples; i++) {
      const progress = i / ripples;
      const radius = (50 + i * 40) * (width / 1584);
      const color = progress < 0.5 ? quantityColor : qualityColor;

      elements.push(
        <circle
          key={`ripple-${i}`}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={2 * (width / 1584)}
          opacity={0.6 - progress * 0.4}
        />
      );
    }

    // Center point
    elements.push(
      <circle
        key="ripple-center"
        cx={centerX}
        cy={centerY}
        r={10 * (width / 1584)}
        fill="url(#gradient)"
        opacity={0.9}
      />
    );

    return <g>{elements}</g>;
  };

  const renderMosaic = (scale: number) => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const tileSize = 40 * Math.min(scaleX, scaleY);
    const cols = Math.floor(width / tileSize);
    const rows = Math.floor(height / tileSize);
    const seed = createSeed(primaryText + quantityColor, 'mosaic');

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * tileSize;
        const y = row * tileSize;
        const progress = col / cols;
        const randomness = seededRandom(seed + row * cols + col);

        // Skip some tiles randomly for interesting pattern
        if (randomness > 0.7) continue;

        const color = progress < 0.5 ? quantityColor : qualityColor;
        const opacity = 0.2 + randomness * 0.4;
        const size = tileSize * (0.6 + randomness * 0.4);

        // Create diamond shape
        const centerX = x + tileSize / 2;
        const centerY = y + tileSize / 2;
        const half = size / 2;
        const pathD = `M ${centerX},${centerY - half} L ${centerX + half},${centerY} L ${centerX},${centerY + half} L ${centerX - half},${centerY} Z`;

        elements.push(
          <path
            key={`mosaic-${row}-${col}`}
            d={pathD}
            fill={color}
            opacity={opacity}
          />
        );
      }
    }

    return <g transform={`scale(${scale + 0.3})`}>{elements}</g>;
  };

  const renderAurora = () => {
    const elements: React.JSX.Element[] = [];
    const layers = 5;

    for (let i = 0; i < layers; i++) {
      const points: string[] = [];
      const yBase = height * (0.3 + i * 0.1);
      const amplitude = 80 * (height / 396);
      const frequency = 0.008 + i * 0.002;

      for (let x = 0; x <= width; x += 10) {
        const y1 = yBase + Math.sin(x * frequency) * amplitude;
        const y2 = Math.sin(x * frequency * 1.5 + i) * amplitude * 0.5;
        points.push(`${x},${y1 + y2}`);
      }

      const progress = i / layers;
      const color = progress < 0.5 ? quantityColor : qualityColor;

      // Create flowing curtain effect
      const pathD = `M ${points[0]} L ${points.join(' L ')} L ${width},${height} L 0,${height} Z`;

      elements.push(
        <path
          key={`aurora-${i}`}
          d={pathD}
          fill={color}
          opacity={0.15 + progress * 0.1}
        />
      );

      // Add shimmer line on top
      elements.push(
        <polyline
          key={`aurora-line-${i}`}
          points={points.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={2 * (width / 1584)}
          opacity={0.5}
        />
      );
    }

    return <g>{elements}</g>;
  };

  const renderBricks = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const brickWidth = 40 * scaleX;
    const brickHeight = 30 * scaleY;
    const seed = createSeed(primaryText + quantityColor, 'bricks');

    let index = 0;
    for (let y = 0; y < height; y += brickHeight + 2) {
      for (let x = 0; x < width; x += brickWidth + 2) {
        const offsetX =
          (Math.floor(y / (brickHeight + 2)) % 2) * (brickWidth / 2);
        const finalX = x + offsetX;
        if (finalX + brickWidth > width) continue;

        const progress = (finalX + y) / (width + height);
        const color = progress < 0.5 ? quantityColor : qualityColor;
        const opacity = 0.4 + seededRandom(seed + index) * 0.3;

        elements.push(
          <rect
            key={`brick-${index}`}
            x={finalX}
            y={y}
            width={brickWidth}
            height={brickHeight}
            fill={color}
            opacity={opacity}
            stroke="white"
            strokeWidth={1}
          />
        );
        index++;
      }
    }

    return <g>{elements}</g>;
  };

  const renderLines = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const spacing = 25 * scaleX;

    for (let i = 0; i < width / spacing; i++) {
      const x = i * spacing;
      const progress = i / (width / spacing);
      const color = progress < 0.5 ? quantityColor : qualityColor;
      const thickness = 2 + progress * 4;

      elements.push(
        <line
          key={`line-v-${i}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={color}
          strokeWidth={thickness}
          opacity={0.6}
        />
      );
    }

    for (let i = 0; i < height / (spacing * 1.5); i++) {
      const y = i * spacing * 1.5;
      const progress = i / (height / (spacing * 1.5));
      const color = progress < 0.5 ? quantityColor : qualityColor;
      const thickness = 1 + progress * 2;

      elements.push(
        <line
          key={`line-h-${i}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={color}
          strokeWidth={thickness}
          opacity={0.4}
        />
      );
    }

    return <g>{elements}</g>;
  };

  const renderBlocks = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const scaleY = height / 396;
    const blockSize = 60 * Math.min(scaleX, scaleY);
    const seed = createSeed(primaryText + quantityColor, 'blocks');

    let index = 0;
    for (let y = -blockSize; y < height + blockSize; y += blockSize + 4) {
      for (let x = -blockSize; x < width + blockSize; x += blockSize + 4) {
        const progress = (x + y) / (width + height);
        const color = progress < 0.5 ? quantityColor : qualityColor;
        const rotation = seededRandom(seed + index) * 360;

        elements.push(
          <rect
            key={`block-${index}`}
            x={x}
            y={y}
            width={blockSize}
            height={blockSize}
            fill={color}
            opacity={0.5 + seededRandom(seed + index + 1) * 0.3}
            transform={`rotate(${rotation} ${x + blockSize / 2} ${y + blockSize / 2})`}
          />
        );
        index++;
      }
    }

    return <g>{elements}</g>;
  };

  const renderBrutalistGrid = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const cellSize = 50 * scaleX;
    const lineWidth = 3;

    // Vertical lines
    for (let x = 0; x < width; x += cellSize) {
      elements.push(
        <line
          key={`grid-v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={quantityColor}
          strokeWidth={lineWidth}
          opacity={0.8}
        />
      );
    }

    // Horizontal lines
    for (let y = 0; y < height; y += cellSize * 0.75) {
      elements.push(
        <line
          key={`grid-h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={qualityColor}
          strokeWidth={lineWidth}
          opacity={0.8}
        />
      );
    }

    return <g>{elements}</g>;
  };

  const renderStriped = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;
    const stripeWidth = 30 * scaleX;

    for (let x = 0; x < width; x += stripeWidth * 2) {
      elements.push(
        <rect
          key={`stripe-${x}`}
          x={x}
          y={0}
          width={stripeWidth}
          height={height}
          fill={quantityColor}
          opacity={0.5}
        />
      );
    }

    const angle = 45;
    for (let i = 0; i < 30; i++) {
      const x = i * stripeWidth - height * Math.tan((angle * Math.PI) / 180);
      elements.push(
        <line
          key={`diagonal-${i}`}
          x1={x}
          y1={0}
          x2={x + height * Math.tan((angle * Math.PI) / 180)}
          y2={height}
          stroke={qualityColor}
          strokeWidth={2}
          opacity={0.6}
        />
      );
    }

    return <g>{elements}</g>;
  };

  const renderIndustrial = () => {
    const elements: React.JSX.Element[] = [];
    const scaleX = width / 1584;

    // Metal plating effect with rectangles
    const plateSize = 80 * scaleX;
    let index = 0;

    for (let y = 0; y < height; y += plateSize + 8) {
      for (let x = 0; x < width; x += plateSize + 8) {
        const isQuantity = (x + y) / (width + height) < 0.5;
        const color = isQuantity ? quantityColor : qualityColor;

        // Main plate
        elements.push(
          <rect
            key={`plate-${index}`}
            x={x}
            y={y}
            width={plateSize}
            height={plateSize}
            fill={color}
            opacity={0.4}
            stroke={color}
            strokeWidth={2}
          />
        );

        // Rivets
        const rivetSpacing = plateSize / 3;
        for (let rx = rivetSpacing; rx < plateSize; rx += rivetSpacing) {
          for (let ry = rivetSpacing; ry < plateSize; ry += rivetSpacing) {
            elements.push(
              <circle
                key={`rivet-${index}-${rx}-${ry}`}
                cx={x + rx}
                cy={y + ry}
                r={4 * scaleX}
                fill={color}
                opacity={0.8}
              />
            );
          }
        }

        index++;
      }
    }

    return <g>{elements}</g>;
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
