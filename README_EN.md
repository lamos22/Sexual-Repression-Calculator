# Sexual Repression Index Calculator

English | [简体中文](./README.md)

🧠 **Professional Sexual Mental Health Assessment Tool Based on Scientific Research**

## Project Overview

The Sexual Repression Index Calculator is a professional assessment tool based on multiple validated psychological scales, helping users scientifically understand their sexual psychological characteristics and promote sexual health and intimate relationship development.

### ✨ Core Features

- 🔬 **Scientific and Reliable**: Based on internationally recognized scales including SIS/SES, Mosher Sexual Guilt, KISS-9, and SOS
- ⚡ **Dual Version Support**: Quick Assessment (39 questions, 8-15 minutes) + Full Assessment (117 questions, 25-40 minutes)
- 📊 **Professional Analysis**: Four-dimensional analysis + SRI Index (0-100) + Personalized recommendations
- 🔒 **Privacy Protection**: 100% local data processing, no server transmission
- 📱 **Modern UI**: Responsive design, supports all devices
- 💾 **Data Management**: History records, data export, auto-save
- 🔗 **Social Sharing**: Multi-platform sharing, smart copywriting, QR code generation

## 🚀 Quick Start

### Requirements

- Node.js >= 22.0.0
- Modern browser support

### Installation and Running

```
# Clone the project
git clone [project-url]
cd Sexual-Repression-Calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Running with Docker

```
docker run -p 8000:8000 appe233/sexual-repression-calculator
```

### Access the Application

- Development environment: http://localhost:3000
- Production environment: Based on deployment configuration

## ☁️ Cloudflare Pages Deployment

This project is optimized for Cloudflare Pages deployment and can be easily deployed.

### Deployment Configuration

- **Build command**: `npm run cf:deploy`
- **Output directory**: `dist`

### Deployment Steps

1. Push code to GitHub repository
2. Create a Pages application in Cloudflare Dashboard
3. Connect GitHub repository
4. Configure build settings:
   - Build command: `npm run cf:deploy`
   - Output directory: `dist`
5. Click Deploy

### [Cloudflare](https://dash.cloudflare.com/) | [demo](https://sextest.banlan.qzz.io/)

### Anti-Abuse Features

To prevent the project from being maliciously resold, this project provides two anti-abuse mechanisms:

1. **Redirect Page Mechanism** (recommended for completely blocking access):
   - Add environment variables in Cloudflare Pages project settings:
     - `ABUSE_REDIRECT_ENABLED` = `true`
   - When this environment variable is set to `true`, all access will be redirected to the anti-abuse explanation page
   - The page will automatically redirect to the GitHub original project address after a 5-second countdown
   - Users can also manually click the button to jump immediately

2. **Popup Reminder Mechanism** (for reminding users):
   - Add environment variables in Cloudflare Pages project settings:
     - `SHOW_ABUSE_POPUP` = `true`
   - When this environment variable is set to `true`, users will see an anti-abuse reminder popup when visiting the website
   - Users can close the popup and use the website normally

You can choose one or both mechanisms according to your needs.

## ⚠️
>When not in use, it is recommended to rename functions to disabled and comment out `{ from: "./functions/_middleware.js", to: "_middleware.js" }` in rsbuild.config.cloudflare.ts to avoid excessive daily request consumption on Cloudflare

### Notes

- This application is a pure static React application, all data processing is done on the client side
- No server-side API is required, all functions can be completed in the browser
- The application uses localStorage to store user data, data will not be uploaded to the server
- Use `--legacy-peer-deps` parameter to resolve dependency conflicts

## ▲ Vercel Deployment

This project also supports deployment to the Vercel platform.

### Deployment Configuration

- **Build command**: `npm run build:vercel`
- **Output directory**: `dist`

### Deployment Steps

1. Push code to GitHub repository
2. Import project in Vercel Dashboard
3. Configure build settings:
   - Build command: `npm run build:vercel`
   - Output directory: `dist`
4. Click Deploy

### [Vercel](https://vercel.com/) | do not provide demo

### Environment Variables Configuration

Vercel deployment does not require special environment variable configuration, but if you want to enable anti-abuse features, you can add the following environment variables:

~~1. **Popup Reminder Mechanism**:~~
   ~~- Add environment variable: `SHOW_ABUSE_POPUP` = `true`~~

~~Note: Due to Vercel's architectural limitations, the redirect page mechanism may not work properly, it is recommended to use the popup reminder mechanism.~~

## 🎩 Hat Cloud Deployment

This project also supports deployment to Hat Cloud platform.

### Deployment Configuration

- **Build command**: `npm run build`
- **Output directory**: `dist/web`

### Deployment Steps

1. Push code to GitHub repository
2. Create an application in Hat Cloud platform
3. Connect GitHub repository
4. Select `main` branch
5. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist/web`
6. Click Deploy

### [maoziyun](https://dash.maoziyun.com/) | [demo](https://sextest-cn.banlan.xx.kg/)

### Notes

- When deploying on Hat Cloud platform, please note that the output directory should be set to `dist/web` instead of the default `dist`
- If you encounter a 404 error, please check that the platform's output directory configuration is correctly set to `dist/web`

## 📋 Function Description

### Assessment Versions

#### 🏃‍♂️ Quick Assessment (Recommended)
- **Duration**: 8-15 minutes
- **Questions**: 39 questions
- **Scales**: SIS/SES-SF(14) + Mosher Sexual Guilt(10) + KISS-9(9) + SOS Screening(5)
- **Applicable**: First-time use, quick understanding

#### 🎯 Full Assessment
- **Duration**: 25-40 minutes
- **Questions**: 117 questions
- **Scales**: Full SIS/SES(45) + Full Mosher(28) + KISS-9(9) + Full SOS(21) + BSAS(23)
- **Applicable**: In-depth analysis, professional consultation

### Core Algorithms

#### SRI Index Calculation
```
SRI = Σ(Standardized dimension scores) → 0-100 mapping
Four dimensions: SOS Reversed + Sexual Guilt + Sexual Shame + SIS Advantage
```

#### Level Classification
- Very Low (0-20): Less repression
- Low (20-40): Mild repression
- Moderate (40-60): Moderate repression
- High (60-80): High repression
- Very High (80-100): Severe repression

## 🏗️ Technical Architecture

### Frontend Technology Stack

- **Framework**: React 19 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + React Hooks
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend Technology Stack

- **Runtime**: Deno Edge Function
- **Framework**: Hono.js + zValidator
- **Data Validation**: Zod
- **Build Tool**: Rsbuild

### Data Architecture

```
User Data Flow:
Informed Consent → Demographics → Questionnaire Assessment → Result Calculation → Local Storage
                                    ↓
                        History Records ← Data Export
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── assessment/      # Assessment related components
│   ├── common/          # Common components
│   └── ui/              # shadcn/ui components
├── pages/               # Page components
├── lib/                 # Utility libraries
│   ├── scales/          # Scale definitions
│   ├── calculator/      # Calculation engine
│   └── storage/         # Storage management
├── types/               # TypeScript types
├── server/              # Server-side code
└── styles/              # Style files
```

## 🔒 Privacy Protection

### Data Security Commitment

- ✅ **Local Processing**: All data processed on client side, no server upload
- ✅ **Anonymization**: Exported data fully anonymized
- ✅ **User Control**: Users have complete data control
- ✅ **Secure Cleanup**: Provides secure data deletion function
- ✅ **Transparency**: Open source code, completely transparent

### Data Storage

- **Location**: Browser localStorage
- **Content**: Assessment responses, result analysis, demographic information
- **Encryption**: Client-side storage, no encrypted transmission required
- **Cleanup**: Users can completely delete at any time

## 📊 Scientific Basis

### Scale Sources

1. **SIS/SES**: Dual control model scale by Janssen et al.
2. **Mosher Sexual Guilt**: Classic sexual guilt measurement tool
3. **KISS-9**: Sexual shame scale by Kyle et al.
4. **SOS**: Sexual Opinion Survey by Fisher et al.
5. **BSAS**: Sexual Attitudes Scale by Hendrick et al.

### Reliability and Validity

- All scales have undergone rigorous psychometric validation
- Good internal consistency and test-retest reliability
- Validated across multiple cultural contexts

## 🛠️ Development Guide

### Code Style

- TypeScript strict mode
- ESLint + Prettier formatting
- Component-based design principles
- Functional programming preferred

### Contribution Guide

1. Fork the project
2. Create feature branch
3. Commit changes
4. Submit Pull Request

### Testing

```
# Type checking
npm run type-check

# Code linting
npm run lint

# Build testing
npm run build
```

## 📖 User Guide

### Starting Assessment

1. Visit homepage and select assessment version
2. Carefully read the informed consent
3. Fill in basic demographic information
4. Complete questionnaire following the guidance
5. View detailed result analysis

### Result Interpretation

- **SRI Index**: Comprehensive sexual repression level (0-100)
- **Four-dimensional Analysis**: Specific problem area identification
- **Personalized Recommendations**: Improvement suggestions based on results
- **Non-diagnostic**: For self-understanding only, not a substitute for professional diagnosis

## ⚠️ Important Statement

- This tool is for educational and self-understanding purposes only
- Cannot replace professional mental health services
- If you have serious mental health issues, please seek professional help
- Assessment results do not constitute medical diagnosis

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you find this project helpful, please give us a ⭐️

---

**Sexual Repression Index Calculator** - Let scientific research serve personal growth and sexual health development
