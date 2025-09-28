import OpenAI from "openai";
import { Campaign, DataSource, Channel } from "@/types";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AICampaignRequest {
  prompt: string;
  dataSources: DataSource[];
  channels: Channel[];
}

export interface AICampaignResponse {
  campaign: Campaign;
  explanation: string;
}

export const generateCampaignWithAI = async (
  request: AICampaignRequest
): Promise<AICampaignResponse> => {
  const { prompt, dataSources, channels } = request;

  // Create a detailed prompt for the AI
  const systemPrompt = `You are an expert marketing AI that creates highly targeted, data-driven marketing campaigns. Your role is to generate comprehensive campaign JSON that can be executed across multiple marketing channels.

CONTEXT:
- User Request: "${prompt}"
- Available Data Sources: ${dataSources.map((ds) => ds.name).join(", ")}
- Available Channels: ${channels.map((ch) => ch.name).join(", ")}

TASK:
Generate a detailed marketing campaign JSON that follows this EXACT structure. Make it highly relevant to the user's request and optimize for the available channels and data sources.

REQUIRED JSON STRUCTURE:
{
  "id": "campaign_[random_id]",
  "name": "Compelling Campaign Name",
  "description": "Detailed campaign description explaining the strategy",
  "channels": [{"id": "channel_id", "name": "Channel Name", "type": "channel_type", "status": "active"}],
  "dataSources": [{"id": "source_id", "name": "Source Name", "type": "source_type", "status": "connected"}],
  "audience": {
    "segments": ["specific-segment1", "specific-segment2"],
    "demographics": {
      "age": "target-age-range",
      "location": "geographic-targets",
      "interests": ["relevant-interests"],
      "income": "income-bracket",
      "education": "education-level"
    },
    "behaviors": {
      "purchaseHistory": "purchase-patterns",
      "engagement": "engagement-level",
      "frequency": "interaction-frequency",
      "preferredChannels": ["channel-preferences"],
      "lifecycleStage": "customer-stage"
    }
  },
  "timing": {
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-01-31T23:59:59Z",
    "frequency": "campaign-frequency",
    "timezone": "UTC",
    "optimalTimes": ["best-send-times"],
    "seasonality": "seasonal-factors"
  },
  "content": {
    "subject": "Compelling Email Subject",
    "message": "Main campaign message optimized for engagement",
    "headline": "Attention-grabbing headline",
    "subheadline": "Supporting subheadline",
    "media": ["relevant-media-files"],
    "cta": {
      "text": "Clear Call-to-Action",
      "url": "https://landing-page.com",
      "urgency": "urgency-level"
    },
    "personalization": {
      "dynamicContent": "personalization-elements",
      "variables": ["name", "location", "preferences"]
    }
  },
  "budget": {
    "total": 10000,
    "currency": "USD",
    "perChannel": {"email": 5000, "sms": 3000, "push": 2000},
    "allocationStrategy": "budget-allocation-rationale"
  },
  "objectives": {
    "primary": "main-campaign-goal",
    "secondary": ["secondary-goals"],
    "kpis": ["key-performance-indicators"],
    "successMetrics": "how-to-measure-success"
  },
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}

GUIDELINES:
1. Make the campaign highly specific to the user's request
2. Use the available data sources to inform audience targeting
3. Optimize content for each available channel
4. Include realistic budget allocation
5. Add compelling, actionable content
6. Consider timing and seasonality
7. Make it data-driven and measurable

Return ONLY the JSON object, no additional text.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response directly since we're using response_format: json_object
    let campaignData;
    try {
      campaignData = JSON.parse(response);
    } catch (parseError) {
      // Fallback: try to extract JSON from the response if parsing fails
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
      }
      campaignData = JSON.parse(jsonMatch[0]);
    }

    // Convert the AI response to our Campaign type
    const campaign: Campaign = {
      id: campaignData.id || Math.random().toString(36).substr(2, 9),
      name: campaignData.name || "AI Generated Campaign",
      description: campaignData.description || prompt,
      channels: channels.filter((ch) =>
        campaignData.channels?.some((c: any) => c.type === ch.type)
      ),
      dataSources: dataSources.filter((ds) =>
        campaignData.dataSources?.some((d: any) => d.type === ds.type)
      ),
      audience: campaignData.audience || {
        segments: ["general-audience"],
        demographics: { age: "25-45", location: "US", interests: ["general"] },
        behaviors: { engagement: "active", frequency: "weekly" },
      },
      timing: {
        startDate: new Date(campaignData.timing?.startDate || new Date()),
        endDate: campaignData.timing?.endDate
          ? new Date(campaignData.timing.endDate)
          : undefined,
        frequency: campaignData.timing?.frequency || "weekly",
        timezone: campaignData.timing?.timezone || "UTC",
        optimalTimes: campaignData.timing?.optimalTimes,
        seasonality: campaignData.timing?.seasonality,
      },
      content: {
        subject: campaignData.content?.subject,
        message: campaignData.content?.message || "Campaign message",
        headline: campaignData.content?.headline,
        subheadline: campaignData.content?.subheadline,
        media: campaignData.content?.media,
        cta: campaignData.content?.cta,
        personalization: campaignData.content?.personalization,
      },
      budget: campaignData.budget
        ? {
            total: campaignData.budget.total,
            currency: campaignData.budget.currency || "USD",
            perChannel: campaignData.budget.perChannel || {},
            allocationStrategy: campaignData.budget.allocationStrategy,
          }
        : undefined,
      objectives: campaignData.objectives,
      status: campaignData.status || "draft",
      createdAt: new Date(campaignData.createdAt || new Date()),
      updatedAt: new Date(campaignData.updatedAt || new Date()),
    };

    return {
      campaign,
      explanation: `AI-generated campaign based on your request: "${prompt}". This campaign is optimized for your connected data sources and channels.`,
    };
  } catch (error) {
    console.error("AI Campaign Generation Error:", error);

    // Fallback to simulated response if AI fails
    return {
      campaign: generateFallbackCampaign(prompt, dataSources, channels),
      explanation:
        "AI service unavailable, using fallback campaign generation.",
    };
  }
};

// Fallback function for when AI is not available
const generateFallbackCampaign = (
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
