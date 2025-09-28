'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ConnectionsPanel } from '@/components/connections/ConnectionsPanel';
import { useChat } from '@/hooks/useChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Play, Pause, Edit } from 'lucide-react';

type View = 'chat' | 'connections' | 'campaigns' | 'analytics';

export default function Home() {
  const [activeView, setActiveView] = useState<View>('chat');
  const [isOnline, setIsOnline] = useState(true);
  
  const {
    messages,
    isLoading,
    dataSources,
    channels,
    currentCampaign,
    generateCampaign,
    connectDataSource,
    disconnectDataSource,
    addChannel,
    removeChannel,
    onToggleChannel,
  } = useChat();

  const handleSendMessage = (message: string) => {
    generateCampaign(message);
  };

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  const handleConnectDataSource = (dataSource: any) => {
    connectDataSource(dataSource);
  };

  const handleDisconnectDataSource = (id: string) => {
    disconnectDataSource(id);
  };

  const handleAddChannel = (channel: any) => {
    addChannel(channel);
  };

  const handleRemoveChannel = (id: string) => {
    removeChannel(id);
  };

  const handleToggleChannel = (id: string) => {
    onToggleChannel(id);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return (
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        );
      case 'connections':
        return (
          <ConnectionsPanel
            dataSources={dataSources}
            channels={channels}
            onConnectDataSource={handleConnectDataSource}
            onDisconnectDataSource={handleDisconnectDataSource}
            onAddChannel={handleAddChannel}
            onRemoveChannel={handleRemoveChannel}
            onToggleChannel={handleToggleChannel}
          />
        );
      case 'campaigns':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Campaigns</h1>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>
            
            {currentCampaign ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{currentCampaign.name}</CardTitle>
                    <Badge variant={currentCampaign.status === 'draft' ? 'secondary' : 'success'}>
                      {currentCampaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{currentCampaign.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Channels</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCampaign.channels.map((channel) => (
                          <Badge key={channel.id} variant="outline">
                            {channel.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Data Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCampaign.dataSources.map((ds) => (
                          <Badge key={ds.id} variant="outline">
                            {ds.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      Launch Campaign
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation to generate your first marketing campaign
                  </p>
                  <Button onClick={() => setActiveView('chat')}>
                    Go to Chat
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Analytics</h1>
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Track your campaign performance and insights
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        dataSourceCount={dataSources.length}
        channelCount={channels.length}
        campaignCount={currentCampaign ? 1 : 0}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          isOnline={isOnline}
          onSearch={() => console.log('Search')}
          onNotifications={() => console.log('Notifications')}
          onProfile={() => console.log('Profile')}
          onHelp={() => console.log('Help')}
        />
        
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}