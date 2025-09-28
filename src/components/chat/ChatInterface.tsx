import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Welcome to Marketing Orchestrator</h3>
              <p className="text-muted-foreground max-w-md">
                Connect your data sources and channels, then ask me to create personalized marketing campaigns for the right audience at the right time.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                "Create a campaign for new subscribers"
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                "Generate email and SMS campaigns"
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                "Target high-value customers"
              </span>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
