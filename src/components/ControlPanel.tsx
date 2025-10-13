'use client';

import { GraphicStyle } from './BannerCanvas';

interface ControlPanelProps {
  primaryText: string;
  setPrimaryText: (value: string) => void;
  secondaryText: string;
  setSecondaryText: (value: string) => void;
  quantityColor: string;
  setQuantityColor: (value: string) => void;
  qualityColor: string;
  setQualityColor: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  textAlign: 'left' | 'center' | 'right';
  setTextAlign: (value: 'left' | 'center' | 'right') => void;
  graphicStyle: GraphicStyle;
  setGraphicStyle: (value: GraphicStyle) => void;
  onDownload: (quality: 'normal' | 'high') => void;
  onApplyPreset: (preset: string) => void;
  onDimensionChange: (platform: string, width: number, height: number) => void;
  currentPlatform: string;
  currentPreset: string;
  currentWidth: number;
  currentHeight: number;
}

const presets = [
  {
    id: 'transformation',
    name: 'Transformation',
    quantityColor: '#EF4444',
    qualityColor: '#10B981'
  },
  {
    id: 'professional',
    name: 'Professional',
    quantityColor: '#3B82F6',
    qualityColor: '#8B5CF6'
  },
  {
    id: 'warm',
    name: 'Warm',
    quantityColor: '#F59E0B',
    qualityColor: '#EC4899'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    quantityColor: '#06B6D4',
    qualityColor: '#3B82F6'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    quantityColor: '#FF6B6B',
    qualityColor: '#FFD93D'
  },
  {
    id: 'forest',
    name: 'Forest',
    quantityColor: '#2D6A4F',
    qualityColor: '#95D5B2'
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    quantityColor: '#5B21B6',
    qualityColor: '#C084FC'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    quantityColor: '#1E293B',
    qualityColor: '#60A5FA'
  },
  {
    id: 'coral',
    name: 'Coral Reef',
    quantityColor: '#FF6B9D',
    qualityColor: '#FEC89A'
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    quantityColor: '#FF00FF',
    qualityColor: '#00FFFF'
  },
  {
    id: 'autumn',
    name: 'Autumn',
    quantityColor: '#D97706',
    qualityColor: '#DC2626'
  },
  {
    id: 'mint',
    name: 'Mint Fresh',
    quantityColor: '#10B981',
    qualityColor: '#06B6D4'
  }
];

const dimensionPresets = [
  {
    id: 'linkedin',
    name: 'LinkedIn Cover',
    width: 1584,
    height: 396,
    description: 'LinkedIn banner cover'
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover',
    width: 851,
    height: 315,
    description: 'Facebook profile cover photo'
  },
  {
    id: 'facebook-link',
    name: 'Facebook Link Post',
    width: 1200,
    height: 628,
    description: 'Facebook shared link preview'
  },
  {
    id: 'facebook-story',
    name: 'Facebook Story',
    width: 1080,
    height: 1920,
    description: 'Facebook story format'
  },
  {
    id: 'facebook-square',
    name: 'Facebook Square Ad',
    width: 1080,
    height: 1080,
    description: 'Facebook square advertisement'
  }
];

export default function ControlPanel({
  primaryText,
  setPrimaryText,
  secondaryText,
  setSecondaryText,
  quantityColor,
  setQuantityColor,
  qualityColor,
  setQualityColor,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  textAlign,
  setTextAlign,
  graphicStyle,
  setGraphicStyle,
  onDownload,
  onApplyPreset,
  onDimensionChange,
  currentPlatform,
  currentPreset,
  currentWidth,
  currentHeight
}: ControlPanelProps) {
  return (
    <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Color Presets */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Color Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              className={`group relative px-3 py-2 rounded-md border transition-all overflow-hidden ${
                currentPreset === preset.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              title={preset.name}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{
                    background: `linear-gradient(to right, ${preset.quantityColor}, ${preset.qualityColor})`
                  }}
                />
                <span
                  className={`text-sm font-medium ${
                    currentPreset === preset.id
                      ? 'text-blue-900'
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {preset.name}
                </span>
              </div>
              {currentPreset === preset.id && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Presets */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Platform Dimensions
        </h3>
        <div className="space-y-2">
          {dimensionPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() =>
                onDimensionChange(preset.id, preset.width, preset.height)
              }
              className={`w-full group relative px-3 py-2 rounded-md border transition-all overflow-hidden text-left ${
                currentPlatform === preset.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              title={preset.description}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {preset.width} × {preset.height} pixels
                  </div>
                </div>
                {currentPlatform === preset.id && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 text-center bg-gray-50 rounded p-2">
          Current: {currentWidth} × {currentHeight}px
        </div>
      </div>

      {/* Text Inputs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Text Content</h3>

        <div>
          <label
            htmlFor="primaryText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Primary Slogan
          </label>
          <input
            id="primaryText"
            type="text"
            value={primaryText}
            onChange={(e) => setPrimaryText(e.target.value)}
            placeholder="From Quantity to Quality"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">
            {primaryText.length}/50 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="secondaryText"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Secondary Slogan
          </label>
          <input
            id="secondaryText"
            type="text"
            value={secondaryText}
            onChange={(e) => setSecondaryText(e.target.value)}
            placeholder="Excellence in Every Detail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">
            {secondaryText.length}/50 characters
          </p>
        </div>
      </div>

      {/* Color Inputs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Custom Colors</h3>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label
              htmlFor="quantityColor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Color
            </label>
            <div className="flex gap-2">
              <input
                id="quantityColor"
                type="color"
                value={quantityColor}
                onChange={(e) => setQuantityColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={quantityColor}
                onChange={(e) => setQuantityColor(e.target.value)}
                placeholder="#3B82F6"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label
              htmlFor="qualityColor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Color
            </label>
            <div className="flex gap-2">
              <input
                id="qualityColor"
                type="color"
                value={qualityColor}
                onChange={(e) => setQualityColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={qualityColor}
                onChange={(e) => setQualityColor(e.target.value)}
                placeholder="#8B5CF6"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Typography</h3>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="fontSize"
              className="text-sm font-medium text-gray-700"
            >
              Font Size
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {fontSize}px
            </span>
          </div>
          <input
            id="fontSize"
            type="range"
            min="24"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="lineHeight"
              className="text-sm font-medium text-gray-700"
            >
              Line Spacing
            </label>
            <span className="text-sm text-gray-600 font-mono">
              {lineHeight}px
            </span>
          </div>
          <input
            id="lineHeight"
            type="range"
            min="40"
            max="120"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Alignment
          </label>
          <div className="flex gap-2">
            {(['left', 'center', 'right'] as const).map((align) => (
              <button
                key={align}
                onClick={() => setTextAlign(align)}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  textAlign === align
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Graphic Style Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Graphic Style</h3>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              'dots',
              'funnel',
              'network',
              'waves',
              'geometric',
              'particles',
              'rays',
              'spiral',
              'hexagons'
            ] as const
          ).map((style) => (
            <button
              key={style}
              onClick={() => setGraphicStyle(style)}
              className={`px-3 py-3 rounded-md font-medium transition-colors text-sm ${
                graphicStyle === style
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {graphicStyle === 'dots' &&
            'Scattered to refined elements representing quantity transitioning to quality'}
          {graphicStyle === 'funnel' &&
            'Visualizes the filtering process from wide input to focused output'}
          {graphicStyle === 'network' &&
            'Shows interconnected growth from simple to complex relationships'}
          {graphicStyle === 'waves' &&
            'Flowing waves symbolizing smooth transformation and continuous improvement'}
          {graphicStyle === 'geometric' &&
            'Triangles to circles evolution representing structural refinement'}
          {graphicStyle === 'particles' &&
            'Dynamic particles growing in size showing quality enhancement'}
          {graphicStyle === 'rays' &&
            'Radiating energy beams illustrating expansion and focus'}
          {graphicStyle === 'spiral' &&
            'Dual spirals depicting iterative growth and convergence'}
          {graphicStyle === 'hexagons' &&
            'Honeycomb pattern showing systematic organization and efficiency'}
        </p>
      </div>

      {/* Download Options */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Download Quality
        </h3>

        <div className="space-y-2">
          <button
            onClick={() => onDownload('normal')}
            className="w-full bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all border border-gray-300"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Standard Quality (1584×396)
            </span>
          </button>

          <button
            onClick={() => onDownload('high')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              High Quality (2x Resolution - 3168×792)
            </span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          High quality files are larger but provide crisper text and better
          detail
        </p>
      </div>
    </div>
  );
}
