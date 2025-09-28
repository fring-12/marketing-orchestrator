# Marketing Orchestrator

A Perplexity-style chat interface for creating AI-powered marketing campaigns. Connect your data sources and channels, then generate personalized campaigns for the right audience at the right time.

## Features

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

## Tech Stack

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

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/marketing-orchestrator.git
cd marketing-orchestrator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Connect Data Sources
- Navigate to the "Connections" tab
- Click on data sources to connect them
- Configure connection settings as needed

### 2. Set Up Channels
- Add marketing channels (Email, SMS, Push, etc.)
- Configure channel-specific settings
- Toggle channels on/off as needed

### 3. Create Campaigns
- Go to the "Chat" tab
- Ask the AI to create a campaign
- Example prompts:
  - "Create a campaign for new subscribers"
  - "Generate email and SMS campaigns for high-value customers"
  - "Target users who abandoned their cart"

### 4. Launch Campaigns
- Review generated campaigns in the "Campaigns" tab
- Export JSON for execution
- Launch campaigns across selected channels

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── chat/             # Chat interface components
│   ├── connections/      # Data source & channel components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
│   └── useChat.ts        # Chat state management
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── types/                # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## API Integration

The application simulates API calls for demonstration purposes. In a production environment, you would integrate with:

- **Data Source APIs** - GTM, Facebook, Google Ads, etc.
- **Channel APIs** - Email providers, SMS services, etc.
- **AI/ML Services** - Campaign optimization and personalization
- **Analytics APIs** - Performance tracking and insights

## Campaign JSON Structure

Generated campaigns follow this structure:

```json
{
  "id": "campaign_id",
  "name": "Campaign Name",
  "description": "Campaign description",
  "channels": [...],
  "dataSources": [...],
  "audience": {
    "segments": ["high-value-customers"],
    "demographics": {...},
    "behaviors": {...}
  },
  "timing": {
    "startDate": "2024-01-01T00:00:00Z",
    "frequency": "weekly",
    "timezone": "UTC"
  },
  "content": {
    "subject": "Email subject",
    "message": "Campaign message",
    "cta": {...}
  },
  "budget": {
    "total": 10000,
    "currency": "USD",
    "perChannel": {...}
  },
  "status": "draft"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Perplexity's conversational interface
- Built with modern React and Next.js best practices
- UI components from Shadcn/ui and Radix UI