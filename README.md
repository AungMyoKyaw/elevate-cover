# ElevateCover

**Create high-impact, brand-aligned LinkedIn cover images instantly.**

ElevateCover is an intuitive, web-based SVG generator that offers highly customizable, professional banner templates. Customize colors, text, and graphics to communicate your unique value proposition through elegant, dynamic visual assets.

![ElevateCover Banner](https://img.shields.io/badge/Status-MVP%20V1.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8)

![ElevateCover Screenshot](assets/elevate-cover-1759859101807.png)

## ✨ Features

### Core Features (MVP V1.0)

- **Perfect LinkedIn Dimensions** - Custom 1584×396px canvas preset for LinkedIn banner size
- **Gradient Background** - Two-color gradient background selector with live preview
- **Text Customization** - Customizable primary and secondary slogans with character counter
- **Typography Controls** - Font size, line spacing, and text alignment options
- **3 Graphic Styles** - Choose from Dots, Funnel, or Network Path abstract graphics
- **Color Presets** - Quick preset templates: Transformation, Professional, Warm, and Ocean
- **Custom Colors** - Full hex color control with color picker
- **PNG Export** - Pixel-perfect PNG download with client-side SVG-to-Canvas conversion
- **Real-time Preview** - Instant visual feedback as you customize
- **Responsive Design** - Works seamlessly on desktop and tablet devices

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd elevate-cover
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create optimized production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Project Structure

```
elevate-cover/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Main application page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── BannerCanvas.tsx    # SVG banner renderer
│       └── ControlPanel.tsx    # Control interface
├── spec/
│   └── PRD.md             # Product Requirements Document
└── public/                # Static assets
```

## 🎨 How to Use

1. **Enter Your Text** - Add your primary and secondary slogans (up to 50 characters each)
2. **Choose Colors** - Select from presets or use custom hex colors
3. **Pick a Graphic Style** - Choose between Dots, Funnel, or Network graphics
4. **Adjust Typography** - Fine-tune font size and line spacing
5. **Set Alignment** - Choose left, center, or right text alignment
6. **Download** - Click the download button to get your PNG file

## 🎯 User Personas

### Sarah, The Career Transformer

Senior IT Consultant transitioning into Digital Transformation Strategy who needs to communicate her shift from tactical implementation (Quantity) to strategic oversight (Quality).

### Alex, The Specialized Developer

Lead Software Engineer specializing in scalable architecture who wants to stand out in the technical community and attract recruiters.

### Maria, The Agency Owner

Managing Partner who needs consistent visual brand identity across all employee LinkedIn profiles.

## 🏗️ Technical Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Rendering**: SVG for vector graphics
- **Export**: HTML Canvas API for PNG conversion
- **Hosting**: Static site (Vercel/Netlify compatible)

## �� Privacy & Security

- **Client-side Processing** - All rendering happens in your browser
- **No Data Storage** - We don't store or transmit your designs
- **No Authentication** - No login required, use instantly
- **Offline Capable** - Works without internet once loaded

## 📊 Success Metrics

The MVP aims to validate product-market fit with these KPIs:

- User Adoption: 10,000+ unique visitors in first 3 months
- Engagement: 30%+ conversion rate (visitor → download)
- Quality: <2% error rate in PNG generation
- Performance: <3s page load time

## 🗺️ Roadmap

### V1.1+ (Post-MVP)

- [ ] Premium template library with 15+ exclusive styles
- [ ] Saved designs with local storage
- [ ] AI-powered slogan suggestions
- [ ] Avatar integration placeholder
- [ ] Direct LinkedIn API upload
- [ ] Animated graphics (GIF/MP4)
- [ ] Multi-language support
- [ ] Custom font uploads
- [ ] Team collaboration features

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

This is an MVP product. Contributions will be welcome in future versions.

## 📧 Support

For issues and feature requests, please use the GitHub issues page.

---

**© 2025 ElevateCover** - Transform your professional presence with powerful visual narratives.
