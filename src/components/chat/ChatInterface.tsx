import React, { useState } from 'react';
import { Message } from '@/types/chat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useToast } from '@/components/ui/use-toast';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Mock API response for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        response: `This is a mock response with markdown:
\`\`\`javascript
console.log("Hello World!");
\`\`\`
And some **bold** text.`
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponse.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto border rounded-lg shadow-lg bg-background">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;