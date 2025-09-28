import React from 'react';
import { DataSource } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertCircle,
  Settings,
  Trash2
} from 'lucide-react';

interface DataSourceCardProps {
  dataSource: DataSource;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onConfigure: (id: string) => void;
}

const getStatusIcon = (status: DataSource['status']) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'connecting':
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <XCircle className="w-4 h-4 text-gray-400" />;
  }
};

const getStatusVariant = (status: DataSource['status']) => {
  switch (status) {
    case 'connected':
      return 'success';
    case 'connecting':
      return 'secondary';
    case 'error':
      return 'error';
    default:
      return 'outline';
  }
};

const getDataSourceIcon = (type: DataSource['type']) => {
  const iconMap = {
    'gtm': '📊',
    'facebook-pixel': '📘',
    'google-ads': '🔍',
    'facebook-page': '📘',
    'website': '🌐',
    'shopify': '🛒',
    'crm': '👥',
    'twitter': '🐦',
    'review-sites': '⭐',
    'ad-manager': '📈',
  };
  return iconMap[type] || '📊';
};

export const DataSourceCard: React.FC<DataSourceCardProps> = ({
  dataSource,
  onConnect,
  onDisconnect,
  onConfigure,
}) => {
  const isConnected = dataSource.status === 'connected';
  const isConnecting = dataSource.status === 'connecting';
  const hasError = dataSource.status === 'error';

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getDataSourceIcon(dataSource.type)}</span>
            <CardTitle className="text-lg">{dataSource.name}</CardTitle>
          </div>
          <Badge variant={getStatusVariant(dataSource.status)}>
            {getStatusIcon(dataSource.status)}
            <span className="ml-1 capitalize">{dataSource.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          {dataSource.lastSync && (
            <p>Last sync: {dataSource.lastSync.toLocaleString()}</p>
          )}
        </div>
        
        <div className="flex space-x-2">
          {!isConnected && !isConnecting && (
            <Button
              onClick={() => onConnect(dataSource.id)}
              size="sm"
              className="flex-1"
            >
              Connect
            </Button>
          )}
          
          {isConnected && (
            <>
              <Button
                onClick={() => onConfigure(dataSource.id)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Settings className="w-4 h-4 mr-1" />
                Configure
              </Button>
              <Button
                onClick={() => onDisconnect(dataSource.id)}
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            </>
          )}
          
          {isConnecting && (
            <Button disabled size="sm" className="flex-1">
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Connecting...
            </Button>
          )}
          
          {hasError && (
            <Button
              onClick={() => onConnect(dataSource.id)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
