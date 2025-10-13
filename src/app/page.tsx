'use client';

import { useState, useRef } from 'react';
import BannerCanvas, { GraphicStyle } from '@/components/BannerCanvas';
import ControlPanel from '@/components/ControlPanel';

const presets: Record<string, { quantityColor: string; qualityColor: string }> =
  {
    transformation: { quantityColor: '#EF4444', qualityColor: '#10B981' },
    professional: { quantityColor: '#3B82F6', qualityColor: '#8B5CF6' },
    warm: { quantityColor: '#F59E0B', qualityColor: '#EC4899' },
    ocean: { quantityColor: '#06B6D4', qualityColor: '#3B82F6' },
    sunset: { quantityColor: '#FF6B6B', qualityColor: '#FFD93D' },
    forest: { quantityColor: '#2D6A4F', qualityColor: '#95D5B2' },
    royal: { quantityColor: '#5B21B6', qualityColor: '#C084FC' },
    midnight: { quantityColor: '#1E293B', qualityColor: '#60A5FA' },
    coral: { quantityColor: '#FF6B9D', qualityColor: '#FEC89A' },
    cyber: { quantityColor: '#FF00FF', qualityColor: '#00FFFF' },
    autumn: { quantityColor: '#D97706', qualityColor: '#DC2626' },
    mint: { quantityColor: '#10B981', qualityColor: '#06B6D4' },
    phoenix: { quantityColor: '#DC2626', qualityColor: '#FB923C' },
    aurora: { quantityColor: '#8B5CF6', qualityColor: '#06B6D4' },
    emerald: { quantityColor: '#059669', qualityColor: '#34D399' },
    twilight: { quantityColor: '#4C1D95', qualityColor: '#F472B6' },
    magma: { quantityColor: '#991B1B', qualityColor: '#FBBF24' },
    arctic: { quantityColor: '#0EA5E9', qualityColor: '#E0F2FE' },
    sapphire: { quantityColor: '#1E3A8A', qualityColor: '#60A5FA' },
    gold: { quantityColor: '#B45309', qualityColor: '#FDE047' },
    cherry: { quantityColor: '#DB2777', qualityColor: '#FBE2E8' },
    slate: { quantityColor: '#334155', qualityColor: '#94A3B8' },
    neon: { quantityColor: '#FF1493', qualityColor: '#00FF7F' },
    cosmic: { quantityColor: '#581C87', qualityColor: '#C026D3' },
    tropical: { quantityColor: '#15803D', qualityColor: '#FDE047' },
    crimson: { quantityColor: '#9F1239', qualityColor: '#FDA4AF' }
  };

export default function Home() {
  const [primaryText, setPrimaryText] = useState('From Quantity to Quality');
  const [secondaryText, setSecondaryText] = useState(
    'Excellence in Every Detail'
  );
  const [quantityColor, setQuantityColor] = useState('#3B82F6');
  const [qualityColor, setQualityColor] = useState('#8B5CF6');
  const [fontSize, setFontSize] = useState(48);
  const [lineHeight, setLineHeight] = useState(70);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(
    'center'
  );
  const [graphicStyle, setGraphicStyle] = useState<GraphicStyle>('dots');
  const [currentPlatform, setCurrentPlatform] = useState('linkedin');
  const [currentPreset, setCurrentPreset] = useState('professional');
  const [canvasWidth, setCanvasWidth] = useState(1584);
  const [canvasHeight, setCanvasHeight] = useState(396);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleApplyPreset = (presetId: string) => {
    const preset = presets[presetId];
    if (preset) {
      setQuantityColor(preset.quantityColor);
      setQualityColor(preset.qualityColor);
      setCurrentPreset(presetId);
    }
  };

  const handleDimensionChange = (
    platform: string,
    width: number,
    height: number
  ) => {
    setCurrentPlatform(platform);
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  const handleDownload = async (quality: 'normal' | 'high') => {
    if (!canvasRef.current) return;

    const svgElement = canvasRef.current.querySelector('svg');
    if (!svgElement) return;

    try {
      // Set scale factor based on quality
      const scaleFactor = quality === 'high' ? 2 : 1;
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth * scaleFactor;
      canvas.height = canvasHeight * scaleFactor;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Configure image rendering based on quality
      if (quality === 'high') {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8'
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        // Draw image at the selected resolution
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        if (quality === 'high') {
          // Use high-quality export for high quality
          const dataUrl = canvas.toDataURL('image/png', 1.0);
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const pngUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `elevate-cover-${currentPlatform}-hd-${Date.now()}.png`;
              link.href = pngUrl;
              link.click();
              URL.revokeObjectURL(pngUrl);
            });
        } else {
          // Use standard export for normal quality
          canvas.toBlob((blob) => {
            if (!blob) return;
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `elevate-cover-${currentPlatform}-${Date.now()}.png`;
            link.href = pngUrl;
            link.click();
            URL.revokeObjectURL(pngUrl);
          }, 'image/png');
        }
      };

      img.src = url;
    } catch (error) {
      console.error('Error downloading banner:', error);
      alert('Failed to download banner. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ElevateCover
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create high-impact, brand-aligned cover images for LinkedIn and
            Facebook instantly. Customize colors, text, graphics, and platform
            dimensions to communicate your unique value proposition.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Canvas Preview */}
          <div className="lg:sticky lg:top-8 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Live Preview
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>Real-time updates</span>
                </div>
              </div>
              <div ref={canvasRef} className="w-full">
                <BannerCanvas
                  primaryText={primaryText}
                  secondaryText={secondaryText}
                  quantityColor={quantityColor}
                  qualityColor={qualityColor}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  textAlign={textAlign}
                  graphicStyle={graphicStyle}
                  width={canvasWidth}
                  height={canvasHeight}
                />
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Platform Dimensions
                      </p>
                      <p className="text-xs text-blue-700">
                        {canvasWidth} × {canvasHeight} pixels (
                        {currentPlatform === 'linkedin'
                          ? 'LinkedIn'
                          : currentPlatform.includes('facebook')
                            ? 'Facebook'
                            : 'Custom'}
                        )
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-md border border-purple-200">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-purple-900">
                        Ultra High Quality
                      </p>
                      <p className="text-xs text-purple-700">
                        2x resolution PNG export
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Use contrasting colors to make your message stand out
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Keep text concise and impactful for maximum readability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Try different graphic styles to match your professional
                    brand
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Center alignment works best for most LinkedIn profiles
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Control Panel */}
          <div>
            <ControlPanel
              primaryText={primaryText}
              setPrimaryText={setPrimaryText}
              secondaryText={secondaryText}
              setSecondaryText={setSecondaryText}
              quantityColor={quantityColor}
              setQuantityColor={setQuantityColor}
              qualityColor={qualityColor}
              setQualityColor={setQualityColor}
              fontSize={fontSize}
              setFontSize={setFontSize}
              lineHeight={lineHeight}
              setLineHeight={setLineHeight}
              textAlign={textAlign}
              setTextAlign={setTextAlign}
              graphicStyle={graphicStyle}
              setGraphicStyle={setGraphicStyle}
              onDownload={handleDownload}
              onApplyPreset={handleApplyPreset}
              onDimensionChange={handleDimensionChange}
              currentPlatform={currentPlatform}
              currentPreset={currentPreset}
              currentWidth={canvasWidth}
              currentHeight={canvasHeight}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              © 2025 ElevateCover. Transform your professional presence with
              powerful visual narratives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
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
                  Client-side processing
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Instant downloads
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  No data stored
                </span>
              </div>
              <a
                href="https://github.com/AungMyoKyaw/elevate-cover"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200 group"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Open Source</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
