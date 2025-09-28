import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Search, 
  User, 
  HelpCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

interface HeaderProps {
  isOnline: boolean;
  onSearch: () => void;
  onNotifications: () => void;
  onProfile: () => void;
  onHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOnline,
  onSearch,
  onNotifications,
  onProfile,
  onHelp,
}) => {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm text-muted-foreground">
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSearch}
          className="relative"
        >
          <Search className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNotifications}
          className="relative"
        >
          <Bell className="w-4 h-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
          >
            3
          </Badge>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onHelp}
        >
          <HelpCircle className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onProfile}
          className="relative"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </Button>
      </div>
    </header>
  );
};
