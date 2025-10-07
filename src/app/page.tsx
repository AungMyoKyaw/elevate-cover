'use client';

import { useState, useRef } from 'react';
import BannerCanvas, { GraphicStyle } from '@/components/BannerCanvas';
import ControlPanel from '@/components/ControlPanel';

const presets: Record<string, { quantityColor: string; qualityColor: string }> =
  {
    transformation: { quantityColor: '#EF4444', qualityColor: '#10B981' },
    professional: { quantityColor: '#3B82F6', qualityColor: '#8B5CF6' },
    warm: { quantityColor: '#F59E0B', qualityColor: '#EC4899' },
    ocean: { quantityColor: '#06B6D4', qualityColor: '#3B82F6' }
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
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleApplyPreset = (presetId: string) => {
    const preset = presets[presetId];
    if (preset) {
      setQuantityColor(preset.quantityColor);
      setQualityColor(preset.qualityColor);
    }
  };

  const handleDownload = async (quality: 'normal' | 'high') => {
    if (!canvasRef.current) return;

    const svgElement = canvasRef.current.querySelector('svg');
    if (!svgElement) return;

    try {
      // Set scale factor based on quality
      const scaleFactor = quality === 'high' ? 2 : 1;
      const canvas = document.createElement('canvas');
      canvas.width = 1584 * scaleFactor;
      canvas.height = 396 * scaleFactor;
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
              link.download = `elevate-cover-hd-${Date.now()}.png`;
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
            link.download = `elevate-cover-${Date.now()}.png`;
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
            Create high-impact, brand-aligned LinkedIn cover images instantly.
            Customize colors, text, and graphics to communicate your unique
            value proposition.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Canvas Preview */}
          <div className="space-y-4">
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
                        Perfect Dimensions
                      </p>
                      <p className="text-xs text-blue-700">
                        1584 × 396 pixels for LinkedIn
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
          <div className="lg:sticky lg:top-8">
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
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
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
          </div>
        </footer>
      </div>
    </div>
  );
}
