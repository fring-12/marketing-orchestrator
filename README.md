# Marketing Orchestrator

A Perplexity-style chat interface for creating AI-powered marketing campaigns. Connect your data sources and channels, then generate personalized campaigns for the right audience at the right time.

## 🚀 Features

### 🤖 AI-Powered Chat Interface

- Conversational campaign creation
- Real-time streaming responses
- Context-aware suggestions

### 📊 Data Source Integration

- **Google Tag Manager (GTM)**
- **Facebook Pixel**
- **Google Ads Tag**
- **Facebook Page**
- **Website Analytics**
- **Shopify Store**
- **CRM Systems**
- **Twitter Page**
- **Review Sites**
- **Ad Managers**

### 📱 Multi-Channel Campaigns

- **Email Marketing**
- **SMS Campaigns**
- **Push Notifications**
- **WhatsApp Business**
- **Voice Calls**
- **Messenger**
- **Paid Advertising**

### 🎯 Smart Campaign Generation

- Right time, right channel, right message
- Audience segmentation
- Budget allocation
- Performance optimization
- JSON export for execution

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first CSS
- **Shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **Framer Motion** - Animations

## 📁 Codebase Architecture

### Project Structure

```
marketing-orchestrator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles & design system
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Main application component
│   ├── components/            # React Components
│   │   ├── chat/             # Chat Interface Module
│   │   │   ├── ChatInterface.tsx    # Main chat container
│   │   │   ├── MessageBubble.tsx    # Individual message display
│   │   │   └── ChatInput.tsx        # Message input component
│   │   ├── connections/       # Data Sources & Channels Module
│   │   │   ├── ConnectionsPanel.tsx # Tabbed interface
│   │   │   ├── DataSourceCard.tsx   # Data source management
│   │   │   └── ChannelCard.tsx      # Channel management
│   │   ├── layout/            # Layout Module
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── Header.tsx           # Top header bar
│   │   └── ui/                # Reusable UI Components
│   │       ├── button.tsx           # Button component
│   │       ├── card.tsx             # Card components
│   │       ├── badge.tsx            # Badge component
│   │       └── input.tsx            # Input component
│   ├── hooks/                 # Custom React Hooks
│   │   └── useChat.ts         # Central state management
│   ├── lib/                   # Utility Functions
│   │   └── utils.ts           # Class name utilities
│   └── types/                 # TypeScript Definitions
│       └── index.ts           # All type interfaces
├── components.json            # Shadcn/ui configuration
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json               # Dependencies & scripts
```

## 🏗️ Module Breakdown

### 1. **Types Module** (`src/types/index.ts`)

**Purpose**: Defines all TypeScript interfaces for type safety

```typescript
// Core data structures
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

interface DataSource {
  id: string;
  name: string;
  type: 'gtm' | 'facebook-pixel' | 'google-ads' | ...;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  config?: Record<string, any>;
  lastSync?: Date;
}

interface Channel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'whatsapp' | ...;
  status: 'active' | 'inactive' | 'error';
  config?: Record<string, any>;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  channels: Channel[];
  dataSources: DataSource[];
  audience: { segments: string[]; demographics: Record<string, any>; behaviors: Record<string, any> };
  timing: { startDate: Date; endDate?: Date; frequency: string; timezone: string };
  content: { subject?: string; message: string; media?: string[]; cta?: { text: string; url: string } };
  budget?: { total: number; currency: string; perChannel: Record<string, number> };
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. **Hooks Module** (`src/hooks/useChat.ts`)

**Purpose**: Central state management and business logic

**Key Functions**:

- `addMessage()` - Add new chat messages
- `updateMessage()` - Update existing messages (for streaming)
- `connectDataSource()` - Connect data sources
- `disconnectDataSource()` - Disconnect data sources
- `addChannel()` - Add marketing channels
- `removeChannel()` - Remove channels
- `onToggleChannel()` - Toggle channel active/inactive
- `generateCampaign()` - AI-powered campaign generation

**State Management**:

```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [dataSources, setDataSources] = useState<DataSource[]>([]);
const [channels, setChannels] = useState<Channel[]>([]);
const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>();
```

### 3. **Chat Module** (`src/components/chat/`)

#### `ChatInterface.tsx`

**Purpose**: Main chat container with auto-scroll and empty state

- Handles message display and scrolling
- Shows welcome screen when no messages
- Provides example prompts

#### `MessageBubble.tsx`

**Purpose**: Individual message display component

- User vs Assistant message styling
- Streaming indicator with animation
- Timestamp display
- Status badges

#### `ChatInput.tsx`

**Purpose**: Message input with send functionality

- Form submission handling
- Enter key support
- Loading state management
- Disabled state during processing

### 4. **Connections Module** (`src/components/connections/`)

#### `ConnectionsPanel.tsx`

**Purpose**: Tabbed interface for data sources and channels

- Toggle between data sources and channels
- Add new connections
- Display connection counts
- Manage available options

#### `DataSourceCard.tsx`

**Purpose**: Individual data source management

- Connection status indicators
- Connect/disconnect actions
- Configuration options
- Visual status feedback

#### `ChannelCard.tsx`

**Purpose**: Individual channel management

- Active/inactive toggle
- Channel configuration
- Remove functionality
- Status indicators

### 5. **Layout Module** (`src/components/layout/`)

#### `Sidebar.tsx`

**Purpose**: Navigation and view switching

- Menu items with icons and descriptions
- Active state management
- Connection counters
- Settings access

#### `Header.tsx`

**Purpose**: Top navigation bar

- Online/offline status
- Search functionality
- Notifications
- User profile access

### 6. **UI Components Module** (`src/components/ui/`)

**Purpose**: Reusable UI components using Shadcn/ui + Radix UI

#### `button.tsx`

- Multiple variants (default, destructive, outline, secondary, ghost, link)
- Size options (default, sm, lg, icon)
- Accessibility features

#### `card.tsx`

- Card container with header, content, footer
- Consistent styling
- Flexible content areas

#### `badge.tsx`

- Status indicators
- Color variants (default, secondary, destructive, success, warning, error)
- Compact design

#### `input.tsx`

- Form input component
- Consistent styling
- Focus states

### 7. **Main App Module** (`src/app/page.tsx`)

**Purpose**: Application orchestration and view management

**Key Features**:

- View state management (chat, connections, campaigns, analytics)
- Event handler coordination
- Conditional rendering based on active view
- Layout composition (Sidebar + Header + Main content)

**View Rendering**:

```typescript
const renderContent = () => {
  switch (activeView) {
    case 'chat': return <ChatInterface ... />;
    case 'connections': return <ConnectionsPanel ... />;
    case 'campaigns': return <CampaignsView ... />;
    case 'analytics': return <AnalyticsView ... />;
  }
};
```

### 8. **Utilities Module** (`src/lib/utils.ts`)

**Purpose**: Utility functions for class name management

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 9. **Styling Module** (`src/app/globals.css`)

**Purpose**: Global styles and design system

- CSS custom properties for theming
- Light/dark mode support
- Base styles for consistent appearance
- TailwindCSS integration

## 🔄 Data Flow Architecture

```
User Input → ChatInterface → useChat Hook → Campaign Generation
     ↓
View Switching → Sidebar → Main App → Conditional Rendering
     ↓
Data Management → ConnectionsPanel → useChat Hook → State Updates
     ↓
Campaign Display → Campaigns View → JSON Export
```

## 🎯 Key Features by Module

| Module          | Purpose             | Key Features                                            |
| --------------- | ------------------- | ------------------------------------------------------- |
| **Chat**        | Real-time messaging | Streaming responses, empty states, message bubbles      |
| **Connections** | Data management     | Source integration, channel management, status tracking |
| **Layout**      | Navigation          | View switching, responsive design, status indicators    |
| **Hooks**       | State management    | Centralized logic, business rules, data flow            |
| **Types**       | Type safety         | Data contracts, interface definitions                   |
| **UI**          | Reusable components | Accessibility, consistency, theming                     |
| **App**         | Orchestration       | View management, event handling, composition            |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/marketing-orchestrator.git
cd marketing-orchestrator
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the development server**:

```bash
npm run dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. Connect Data Sources

- Navigate to the "Connections" tab
- Click on data sources to connect them
- Configure connection settings as needed
- Monitor connection status

### 2. Set Up Channels

- Add marketing channels (Email, SMS, Push, etc.)
- Configure channel-specific settings
- Toggle channels on/off as needed
- Manage channel priorities

### 3. Create Campaigns

- Go to the "Chat" tab
- Ask the AI to create a campaign
- Example prompts:
  - "Create a campaign for new subscribers"
  - "Generate email and SMS campaigns for high-value customers"
  - "Target users who abandoned their cart"
  - "Create a holiday promotion campaign"

### 4. Launch Campaigns

- Review generated campaigns in the "Campaigns" tab
- Export JSON for execution
- Launch campaigns across selected channels
- Monitor campaign performance

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run preview      # Build and preview
```

### Code Organization

- **Components**: Single responsibility, reusable
- **Hooks**: Business logic, state management
- **Types**: Type safety, data contracts
- **Utils**: Pure functions, no side effects
- **Styles**: Design system, theming

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#f1f5f9)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Muted**: Gray (#64748b)

### Typography

- **Font Family**: System fonts (Arial, Helvetica, sans-serif)
- **Sizes**: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl
- **Weights**: font-normal, font-medium, font-semibold, font-bold

### Spacing

- **Padding**: p-1, p-2, p-3, p-4, p-6, p-8, p-12
- **Margin**: m-1, m-2, m-3, m-4, m-6, m-8, m-12
- **Gap**: gap-1, gap-2, gap-3, gap-4, gap-6, gap-8

## 🔌 API Integration

The application simulates API calls for demonstration purposes. In a production environment, you would integrate with:

- **Data Source APIs** - GTM, Facebook, Google Ads, etc.
- **Channel APIs** - Email providers, SMS services, etc.
- **AI/ML Services** - Campaign optimization and personalization
- **Analytics APIs** - Performance tracking and insights

## 📊 Campaign JSON Structure

Generated campaigns follow this structure:

```json
{
  "id": "campaign_id",
  "name": "Campaign Name",
  "description": "Campaign description",
  "channels": [
    {
      "id": "channel_id",
      "name": "Email Marketing",
      "type": "email",
      "status": "active"
    }
  ],
  "dataSources": [
    {
      "id": "source_id",
      "name": "Google Tag Manager",
      "type": "gtm",
      "status": "connected"
    }
  ],
  "audience": {
    "segments": ["high-value-customers", "new-subscribers"],
    "demographics": {
      "age": "25-45",
      "location": "US, CA, UK",
      "interests": ["technology", "lifestyle"]
    },
    "behaviors": {
      "purchaseHistory": "high-value",
      "engagement": "active",
      "frequency": "weekly"
    }
  },
  "timing": {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "frequency": "weekly",
    "timezone": "UTC"
  },
  "content": {
    "subject": "Special Offer Just for You!",
    "message": "Discover our latest products with an exclusive discount. Limited time offer!",
    "cta": {
      "text": "Shop Now",
      "url": "https://example.com/shop"
    }
  },
  "budget": {
    "total": 10000,
    "currency": "USD",
    "perChannel": {
      "email": 5000,
      "sms": 3000,
      "push": 2000
    }
  },
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 🧪 Testing

### Component Testing

- Unit tests for individual components
- Integration tests for component interactions
- Accessibility testing with screen readers

### State Management Testing

- Hook testing with React Testing Library
- State transition testing
- Error handling testing

### E2E Testing

- User flow testing
- Cross-browser compatibility
- Performance testing

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

```bash
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Docker Deployment

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

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add proper JSDoc comments
- Write tests for new features
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Perplexity's conversational interface
- Built with modern React and Next.js best practices
- UI components from Shadcn/ui and Radix UI
- Icons from Lucide React
- Styling with TailwindCSS

## 📞 Support

For support, email support@marketing-orchestrator.com or create an issue in the GitHub repository.
