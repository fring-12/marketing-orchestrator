export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'gtm' | 'facebook-pixel' | 'google-ads' | 'facebook-page' | 'website' | 'shopify' | 'crm' | 'twitter' | 'review-sites' | 'ad-manager';
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  config?: Record<string, any>;
  lastSync?: Date;
}

export interface Channel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'whatsapp' | 'voice' | 'messenger' | 'ads';
  status: 'active' | 'inactive' | 'error';
  config?: Record<string, any>;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  channels: Channel[];
  dataSources: DataSource[];
  audience: {
    segments: string[];
    demographics: Record<string, any>;
    behaviors: Record<string, any>;
  };
  timing: {
    startDate: Date;
    endDate?: Date;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    timezone: string;
  };
  content: {
    subject?: string;
    message: string;
    media?: string[];
    cta?: {
      text: string;
      url: string;
    };
  };
  budget?: {
    total: number;
    currency: string;
    perChannel: Record<string, number>;
  };
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  dataSources: DataSource[];
  channels: Channel[];
  currentCampaign?: Campaign;
}
