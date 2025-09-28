import React from 'react';
import { Channel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Settings,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  onToggle: (id: string) => void;
  onConfigure: (id: string) => void;
  onRemove: (id: string) => void;
}

const getStatusIcon = (status: Channel['status']) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <XCircle className="w-4 h-4 text-gray-400" />;
  }
};

const getStatusVariant = (status: Channel['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'outline';
  }
};

const getChannelIcon = (type: Channel['type']) => {
  const iconMap = {
    'email': '📧',
    'sms': '📱',
    'push': '🔔',
    'whatsapp': '💬',
    'voice': '📞',
    'messenger': '💬',
    'ads': '📢',
  };
  return iconMap[type] || '📧';
};

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onToggle,
  onConfigure,
  onRemove,
}) => {
  const isActive = channel.status === 'active';
  const hasError = channel.status === 'error';

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getChannelIcon(channel.type)}</span>
            <CardTitle className="text-lg">{channel.name}</CardTitle>
          </div>
          <Badge variant={getStatusVariant(channel.status)}>
            {getStatusIcon(channel.status)}
            <span className="ml-1 capitalize">{channel.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          <p>Type: {channel.type}</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => onToggle(channel.id)}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="flex-1"
          >
            {isActive ? (
              <>
                <ToggleRight className="w-4 h-4 mr-1" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4 mr-1" />
                Inactive
              </>
            )}
          </Button>
          
          <Button
            onClick={() => onConfigure(channel.id)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Settings className="w-4 h-4 mr-1" />
            Configure
          </Button>
          
          <Button
            onClick={() => onRemove(channel.id)}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
