import { useState, useCallback } from "react";
import { Message, DataSource, Channel, Campaign } from "@/types";
import { generateCampaignWithAI } from "@/lib/ai";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<
    Campaign | undefined
  >();

  const addMessage = useCallback(
    (message: Omit<Message, "id" | "timestamp">) => {
      const newMessage: Message = {
        ...message,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    []
  );

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  }, []);

  const connectDataSource = useCallback((dataSource: DataSource) => {
    setDataSources((prev) => {
      const exists = prev.find((ds) => ds.id === dataSource.id);
      if (exists) {
        return prev.map((ds) =>
          ds.id === dataSource.id ? { ...ds, ...dataSource } : ds
        );
      }
      return [...prev, dataSource];
    });
  }, []);

  const disconnectDataSource = useCallback((id: string) => {
    setDataSources((prev) => prev.filter((ds) => ds.id !== id));
  }, []);

  const addChannel = useCallback((channel: Channel) => {
    setChannels((prev) => {
      const exists = prev.find((ch) => ch.id === channel.id);
      if (exists) {
        return prev.map((ch) =>
          ch.id === channel.id ? { ...ch, ...channel } : ch
        );
      }
      return [...prev, channel];
    });
  }, []);

  const removeChannel = useCallback((id: string) => {
    setChannels((prev) => prev.filter((ch) => ch.id !== id));
  }, []);

  const onToggleChannel = useCallback((id: string) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? { ...ch, status: ch.status === "active" ? "inactive" : "active" }
          : ch
      )
    );
  }, []);

  const generateCampaign = useCallback(
    async (prompt: string) => {
      setIsLoading(true);

      // Add user message
      const userMessage = addMessage({
        content: prompt,
        role: "user",
      });

      // Add assistant message with streaming
      const assistantMessage = addMessage({
        content: "",
        role: "assistant",
        isStreaming: true,
      });

      try {
        // Use AI to generate campaign via API
        const response = await fetch("/api/generate-campaign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            dataSources,
            channels,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate campaign");
        }

        const aiResponse = await response.json();

        // Set the generated campaign
        setCurrentCampaign(aiResponse.campaign);

        // Create response message with JSON
        const responseMessage = `Here's your AI-generated marketing campaign:

\`\`\`json
${JSON.stringify(aiResponse.campaign, null, 2)}
\`\`\`

${aiResponse.explanation}

This campaign is ready to be executed across your selected channels: ${channels
          .map((c) => c.name)
          .join(", ")}.`;

        // Update the assistant message with the complete response
        updateMessage(assistantMessage.id, {
          content: responseMessage,
          isStreaming: false,
        });
      } catch (error) {
        console.error("Campaign generation error:", error);

        // Fallback to simulated response
        const response = await simulateStreamingResponse(
          prompt,
          dataSources,
          channels
        );
        updateMessage(assistantMessage.id, {
          content: response,
          isStreaming: false,
        });
      }

      setIsLoading(false);
    },
    [addMessage, updateMessage, dataSources, channels]
  );

  return {
    messages,
    isLoading,
    dataSources,
    channels,
    currentCampaign,
    addMessage,
    updateMessage,
    connectDataSource,
    disconnectDataSource,
    addChannel,
    removeChannel,
    onToggleChannel,
    generateCampaign,
    setCurrentCampaign,
  };
};

// Simulate streaming response for campaign generation
const simulateStreamingResponse = async (
  prompt: string,
  dataSources: DataSource[],
  channels: Channel[]
): Promise<string> => {
  // This would be replaced with actual API calls
  const campaign = generateCampaignFromPrompt(prompt, dataSources, channels);

  return `Here's your marketing campaign based on your connected data sources and channels:

\`\`\`json
${JSON.stringify(campaign, null, 2)}
\`\`\`

This campaign is ready to be executed across your selected channels: ${channels
    .map((c) => c.name)
    .join(", ")}.`;
};

const generateCampaignFromPrompt = (
  prompt: string,
  dataSources: DataSource[],
  channels: Channel[]
): Campaign => {
  const now = new Date();
  const campaignId = Math.random().toString(36).substr(2, 9);

  return {
    id: campaignId,
    name: `Campaign ${campaignId.slice(0, 6).toUpperCase()}`,
    description: prompt,
    channels,
    dataSources,
    audience: {
      segments: ["high-value-customers", "new-subscribers"],
      demographics: {
        age: "25-45",
        location: "US, CA, UK",
        interests: ["technology", "lifestyle"],
      },
      behaviors: {
        purchaseHistory: "high-value",
        engagement: "active",
        frequency: "weekly",
      },
    },
    timing: {
      startDate: now,
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
      frequency: "weekly",
      timezone: "UTC",
    },
    content: {
      subject: "Special Offer Just for You!",
      message:
        "Discover our latest products with an exclusive discount. Limited time offer!",
      cta: {
        text: "Shop Now",
        url: "https://example.com/shop",
      },
    },
    budget: {
      total: 10000,
      currency: "USD",
      perChannel: channels.reduce(
        (acc, ch) => ({ ...acc, [ch.id]: 10000 / channels.length }),
        {}
      ),
    },
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
};
