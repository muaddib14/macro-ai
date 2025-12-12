# MacroCycle AI - AI Macro Trading Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-blue.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF.svg)](https://www.framer.com/motion/)

> AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets

MacroCycle AI is a sophisticated, AI-powered quantitative trading dashboard that combines institutional-grade macro analysis with cutting-edge machine learning. Built with Next.js, TypeScript, and modern web technologies, it provides real-time insights into global macro regimes, narrative shocks, and prediction market opportunities.

## 🚀 Features

### Core Dashboard Components
- **Live Regime Detection**: Real-time macro regime classification with probability analysis
- **Narrative Shock Heatmap**: Interactive 3×3 grid showing shock intensity across domains
- **Mispriced Market Detection**: AI-powered identification of prediction market opportunities
- **Trade Recommendations**: Kelly criterion position sizing with confidence bands
- **AI Chat Interface**: Natural language queries for macro analysis
- **Real-time Widgets**: Liquidity meter, volatility index, and news ticker

### Technical Features
- **Modern Architecture**: Built with Next.js 14 App Router and TypeScript
- **SOLID Principles**: Clean, modular, and maintainable codebase
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for seamless user experience
- **Type Safety**: Comprehensive TypeScript coverage
- **API-First**: RESTful API with comprehensive documentation
- **Real-time Data**: Mock data with realistic API simulation

## 🏗️ Architecture

### Clean Architecture Principles

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components (Button, Card, Modal, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   └── layout/         # Layout components (Header, Layout)
├── hooks/              # Custom React hooks for data fetching
├── services/           # API services and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── data/               # Mock data for development
```

### Key Design Patterns

1. **Single Responsibility Principle**: Each component has one clear purpose
2. **Dependency Inversion**: Services depend on abstractions, not concrete implementations
3. **Separation of Concerns**: UI, business logic, and data are clearly separated
4. **Interface Segregation**: Components depend only on what they use
5. **Open/Closed Principle**: Open for extension, closed for modification

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/macrocycle-ai.git
cd macrocycle-ai
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure Environment Variables**
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local with your configuration
```

**Required Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://jegrpysiqarjhdeszhdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3JweXNpcWFyamhkZXN6aGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzE0ODMsImV4cCI6MjA4MTA0NzQ4M30.puyI6SGq6DvMcYw-HfwgZSrEQmHRCb2AgLGKBe16B-M
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### 🔧 Supabase Configuration

The dashboard uses Supabase Edge Functions for real-time market data and AI analysis. The functions are already deployed and configured with:

- **Project ID**: `jegrpysiqarjhdeszhdc`
- **Functions**: `real-market-data`, `ai-insights`, `ai-enhanced`, `regime-analysis`, `ai-chat`
- **API Key**: Included in `.env.local`

#### Available Supabase Functions:
- `real-market-data` - Live S&P 500, VIX, Treasury yields
- `ai-insights` - Market analysis and insights
- `ai-enhanced` - Enhanced AI with OpenRouter integration
- `regime-analysis` - Market regime detection
- `ai-chat` - Interactive AI chat functionality

## 🛠️ Development

### 🐛 Troubleshooting

#### Common Issues and Solutions

**1. 401 Unauthorized Errors**
If you see 401 errors when the dashboard tries to fetch data:

```
API Error for https://jegrpysiqarjhdeszhdc.supabase.co/functions/v1/regime-analysis: Error: HTTP error! status: 401
```

**Solution:**
- Ensure `.env.local` file exists with the correct Supabase credentials
- Verify the `NEXT_PUBLIC_SUPABASE_ANON_KEY` is properly set
- Check that the Supabase project is active and functions are deployed

**2. 404 Not Found Errors**
If you see 404 errors for API endpoints:

```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

**Solution:**
- Ensure all Supabase Edge Functions are deployed
- Check function names match the API calls
- Verify the Supabase project URL is correct

**3. Build Errors**
If the build fails:

```bash
# Clear Next.js cache and node_modules
rm -rf .next node_modules
npm install
npm run build
```

**4. Missing Environment Variables**
If you see undefined environment variables:

```bash
# Check if .env.local exists
ls -la .env.local

# If missing, copy from example
cp .env.local.example .env.local
```

#### Environment File Setup

Create `.env.local` in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jegrpysiqarjhdeszhdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3JweXNpcWFyamhkZXN6aGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzE0ODMsImV4cCI6MjA4MTA0NzQ4M30.puyI6SGq6DvMcYw-HfwgZSrEQmHRCb2AgLGKBe16B-M

# Optional: OpenRouter API Key for enhanced AI features
# Get your key from: https://openrouter.ai/
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key_here

# Development
NODE_ENV=development
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Project Structure

#### Components Architecture

**UI Components** (`src/components/ui/`)
- `Button.tsx` - Customizable button component with variants
- `Card.tsx` - Dashboard card with hover effects and animations
- `Modal.tsx` - Accessible modal component using Radix UI
- `Loading.tsx` - Comprehensive loading states and skeletons
- `Input.tsx` - Styled input component

**Dashboard Components** (`src/components/dashboard/`)
- `RegimeGauge.tsx` - Radial gauge showing regime probabilities
- `ShockHeatmap.tsx` - Interactive 3×3 shock intensity grid
- `MispricedList.tsx` - List of mispriced markets with detail modals
- `Recommendations.tsx` - AI-generated trade recommendations
- `ChatAgent.tsx` - AI chat interface for natural language queries
- `Widgets.tsx` - Small dashboard widgets (Liquidity, Volatility, News)
- `DashboardGrid.tsx` - Main grid layout for all components

**Layout Components** (`src/components/layout/`)
- `Header.tsx` - Navigation header with branding and controls
- `Layout.tsx` - Main layout wrapper component

#### Data Flow

1. **Custom Hooks** (`src/hooks/`): Handle data fetching and state management
2. **Services** (`src/services/`): Abstract API calls and business logic
3. **Types** (`src/types/`): TypeScript interfaces for type safety
4. **Mock Data** (`src/data/`): Realistic data for development and testing

#### API Routes

```
/api/regime              # Macro regime data
/api/shock               # Narrative shock analysis
/api/mispriced           # Mispriced markets
/api/recommendations     # Trade recommendations
/api/chat               # AI chat interface
/api/widgets/           # Dashboard widgets
/api/status             # System status
```

## 🎨 Design System

### Color Palette

**Base Colors:**
- Background: `#000000` (Pure Black)
- Surface: `#09090B` (Zinc-950)
- Surface Highlight: `#18181B` (Zinc-900)
- Border: `#27272A` (Zinc-800)

**Primary Brand:**
- Primary: `#FFA500` (Orange)
- Primary Dark: `#FF7A1A` (Deep Orange)
- Primary Light: `#FFD180` (Highlight)

**Semantic Colors:**
- Success: `#10B981` (Emerald-500)
- Error: `#F43F5E` (Rose-500)
- Text: `#FFFFFF` (Primary), `#A1A1AA` (Muted)

### Typography

**Headings:** Orbitron (Geometric, Sci-fi)
**Body:** Inter (Neutral, Highly Legible)
**Data:** JetBrains Mono (Monospace for Numbers)

### Components

- **Cards**: 24px border radius, subtle borders, glow effects on hover
- **Buttons**: Pill-shaped with orange glow on hover
- **Animations**: Framer Motion with smooth transitions
- **Responsive**: Mobile-first design with breakpoints

## 📊 Mock Data

The application includes comprehensive mock data for development:

- `mockRegimeData.ts` - Macro regime probabilities and timeseries
- `mockShockData.ts` - Narrative shock analysis across 9 domains
- `mockMispricedMarkets.ts` - Top 5 mispriced prediction markets
- `mockRecommendations.ts` - AI-generated trade recommendations
- `mockWidgets.ts` - Liquidity, volatility, and news ticker data
- `mockChatResponses.ts` - Predefined AI chat responses

## 🔌 API Integration

### Current Implementation
- All API endpoints return realistic mock data
- Simulated network delays for realistic loading states
- Comprehensive error handling and retry logic
- Type-safe API responses with TypeScript

### Future Enhancements
- Real data source integration (FRED, Bloomberg, etc.)
- WebSocket connections for real-time updates
- Authentication and API key management
- Rate limiting and caching strategies

## 🎯 Usage Examples

### Getting Regime Data

```typescript
import { useRegimeData } from '@/hooks';

function Dashboard() {
  const { data, loadingState } = useRegimeData();
  
  if (loadingState.isLoading) return <LoadingSpinner />;
  if (loadingState.error) return <ErrorMessage error={loadingState.error} />;
  
  return <RegimeDisplay data={data} />;
}
```

### Using the Chat Interface

```typescript
import { useChat } from '@/hooks';

function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat();
  
  const handleSend = async (message: string) => {
    await sendMessage(message);
  };
  
  return <ChatComponent messages={messages} onSend={handleSend} />;
}
```

### Custom Hook Pattern

```typescript
function useCustomData() {
  return useApi(() => api.custom.getData(), []);
}
```

## 🧪 Testing

### Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for API services
- E2E testing with Playwright (planned)

### Running Tests
```bash
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run e2e          # Run end-to-end tests
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.macrocycle.ai

# Feature Flags
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
NEXT_PUBLIC_ENABLE_REAL_TIME=false

# Analytics
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

### Deployment Platforms

**Vercel** (Recommended)
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Coding Standards

- **TypeScript**: Strict mode enabled, comprehensive type coverage
- **ESLint**: Follow Next.js recommended rules
- **Prettier**: Automatic code formatting
- **Commit Messages**: Conventional Commits format
- **Component Design**: Functional components with hooks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Radix UI** for accessible component primitives
- **Lucide React** for beautiful icons

## 📞 Support

- **Email**: contact@macrocycle.ai
- **Website**: https://macrocycle.ai
- **Documentation**: https://docs.macrocycle.ai
- **Status Page**: https://status.macrocycle.ai

## 🗺️ Roadmap

See our [Roadmap](src/app/roadmap/page.tsx) page for detailed development plans and performance metrics.

---

**Built with ❤️ by MiniMax Agent**

*MacroCycle AI - Democratizing institutional-grade macro analysis through AI*