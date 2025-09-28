import React from 'react';
import { Message } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Loader2 } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        <Card className={`p-4 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {isUser ? 'You' : 'Marketing AI'}
              </span>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
              {isStreaming && (
                <Badge variant="secondary" className="text-xs">
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Generating...
                </Badge>
              )}
            </div>
            
            <div className="prose prose-sm max-w-none">
              {message.content ? (
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              ) : isStreaming ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
