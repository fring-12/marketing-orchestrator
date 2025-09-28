import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Database, 
  Radio, 
  Settings, 
  BarChart3,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeView: 'chat' | 'connections' | 'campaigns' | 'analytics';
  onViewChange: (view: 'chat' | 'connections' | 'campaigns' | 'analytics') => void;
  dataSourceCount: number;
  channelCount: number;
  campaignCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  dataSourceCount,
  channelCount,
  campaignCount,
}) => {
  const menuItems = [
    {
      id: 'chat' as const,
      label: 'Chat',
      icon: MessageSquare,
      description: 'AI-powered campaign creation',
    },
    {
      id: 'connections' as const,
      label: 'Connections',
      icon: Database,
      description: 'Data sources & channels',
      badge: dataSourceCount + channelCount,
    },
    {
      id: 'campaigns' as const,
      label: 'Campaigns',
      icon: Zap,
      description: 'Generated campaigns',
      badge: campaignCount,
    },
    {
      id: 'analytics' as const,
      label: 'Analytics',
      icon: BarChart3,
      description: 'Performance insights',
    },
  ];

  return (
    <div className="w-64 bg-background border-r h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Marketing Orchestrator</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Campaigns</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              onClick={() => onViewChange(item.id)}
              className="w-full justify-start h-auto p-3"
            >
              <div className="flex items-center space-x-3 w-full">
                <Icon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Configure your preferences
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
