import React, { useState } from 'react';
import { DataSource, Channel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataSourceCard } from './DataSourceCard';
import { ChannelCard } from './ChannelCard';
import { Plus, Database, Radio } from 'lucide-react';

interface ConnectionsPanelProps {
  dataSources: DataSource[];
  channels: Channel[];
  onConnectDataSource: (dataSource: DataSource) => void;
  onDisconnectDataSource: (id: string) => void;
  onAddChannel: (channel: Channel) => void;
  onRemoveChannel: (id: string) => void;
  onToggleChannel: (id: string) => void;
}

const availableDataSources: Omit<DataSource, 'id' | 'status' | 'config' | 'lastSync'>[] = [
  { name: 'Google Tag Manager', type: 'gtm' },
  { name: 'Facebook Pixel', type: 'facebook-pixel' },
  { name: 'Google Ads Tag', type: 'google-ads' },
  { name: 'Facebook Page', type: 'facebook-page' },
  { name: 'Website Analytics', type: 'website' },
  { name: 'Shopify Store', type: 'shopify' },
  { name: 'CRM System', type: 'crm' },
  { name: 'Twitter Page', type: 'twitter' },
  { name: 'Review Sites', type: 'review-sites' },
  { name: 'Ad Manager', type: 'ad-manager' },
];

const availableChannels: Omit<Channel, 'id' | 'status' | 'config'>[] = [
  { name: 'Email Marketing', type: 'email' },
  { name: 'SMS Campaigns', type: 'sms' },
  { name: 'Push Notifications', type: 'push' },
  { name: 'WhatsApp Business', type: 'whatsapp' },
  { name: 'Voice Calls', type: 'voice' },
  { name: 'Messenger', type: 'messenger' },
  { name: 'Paid Advertising', type: 'ads' },
];

export const ConnectionsPanel: React.FC<ConnectionsPanelProps> = ({
  dataSources,
  channels,
  onConnectDataSource,
  onDisconnectDataSource,
  onAddChannel,
  onRemoveChannel,
  onToggleChannel,
}) => {
  const [activeTab, setActiveTab] = useState<'data-sources' | 'channels'>('data-sources');

  const handleAddDataSource = (dataSource: typeof availableDataSources[0]) => {
    const newDataSource: DataSource = {
      ...dataSource,
      id: Math.random().toString(36).substr(2, 9),
      status: 'connecting',
    };
    onConnectDataSource(newDataSource);
    
    // Simulate connection process
    setTimeout(() => {
      onConnectDataSource({
        ...newDataSource,
        status: 'connected',
        lastSync: new Date(),
      });
    }, 2000);
  };

  const handleAddChannel = (channel: typeof availableChannels[0]) => {
    const newChannel: Channel = {
      ...channel,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
    };
    onAddChannel(newChannel);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'data-sources' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('data-sources')}
          className="flex-1"
        >
          <Database className="w-4 h-4 mr-2" />
          Data Sources
          <Badge variant="secondary" className="ml-2">
            {dataSources.length}
          </Badge>
        </Button>
        <Button
          variant={activeTab === 'channels' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('channels')}
          className="flex-1"
        >
          <Radio className="w-4 h-4 mr-2" />
          Channels
          <Badge variant="secondary" className="ml-2">
            {channels.length}
          </Badge>
        </Button>
      </div>

      {activeTab === 'data-sources' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Data Sources</h2>
            <p className="text-sm text-muted-foreground">
              Connect your data sources to enable personalized campaigns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSources.map((dataSource) => (
              <DataSourceCard
                key={dataSource.id}
                dataSource={dataSource}
                onConnect={(id) => {
                  const ds = dataSources.find(d => d.id === id);
                  if (ds) handleAddDataSource(ds);
                }}
                onDisconnect={onDisconnectDataSource}
                onConfigure={(id) => console.log('Configure data source:', id)}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Data Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {availableDataSources
                  .filter(ds => !dataSources.some(connected => connected.type === ds.type))
                  .map((dataSource) => (
                    <Button
                      key={dataSource.type}
                      variant="outline"
                      onClick={() => handleAddDataSource(dataSource)}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <span className="text-2xl">
                        {dataSource.type === 'gtm' && '📊'}
                        {dataSource.type === 'facebook-pixel' && '📘'}
                        {dataSource.type === 'google-ads' && '🔍'}
                        {dataSource.type === 'facebook-page' && '📘'}
                        {dataSource.type === 'website' && '🌐'}
                        {dataSource.type === 'shopify' && '🛒'}
                        {dataSource.type === 'crm' && '👥'}
                        {dataSource.type === 'twitter' && '🐦'}
                        {dataSource.type === 'review-sites' && '⭐'}
                        {dataSource.type === 'ad-manager' && '📈'}
                      </span>
                      <span className="text-xs text-center">{dataSource.name}</span>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'channels' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Channels</h2>
            <p className="text-sm text-muted-foreground">
              Configure your marketing channels for campaign delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onToggle={onToggleChannel}
                onConfigure={(id) => console.log('Configure channel:', id)}
                onRemove={onRemoveChannel}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableChannels
                  .filter(ch => !channels.some(connected => connected.type === ch.type))
                  .map((channel) => (
                    <Button
                      key={channel.type}
                      variant="outline"
                      onClick={() => handleAddChannel(channel)}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <span className="text-2xl">
                        {channel.type === 'email' && '📧'}
                        {channel.type === 'sms' && '📱'}
                        {channel.type === 'push' && '🔔'}
                        {channel.type === 'whatsapp' && '💬'}
                        {channel.type === 'voice' && '📞'}
                        {channel.type === 'messenger' && '💬'}
                        {channel.type === 'ads' && '📢'}
                      </span>
                      <span className="text-xs text-center">{channel.name}</span>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
