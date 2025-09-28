// Simple test script to verify OpenAI integration
const { generateCampaignWithAI } = require("./src/lib/ai.ts");

async function testAI() {
  try {
    console.log("Testing AI Campaign Generation...");

    const testRequest = {
      prompt: "Create a holiday promotion campaign for new customers",
      dataSources: [
        {
          id: "1",
          name: "Google Tag Manager",
          type: "gtm",
          status: "connected",
        },
        {
          id: "2",
          name: "Facebook Pixel",
          type: "facebook-pixel",
          status: "connected",
        },
      ],
      channels: [
        { id: "1", name: "Email Marketing", type: "email", status: "active" },
        { id: "2", name: "SMS Campaigns", type: "sms", status: "active" },
      ],
    };

    const result = await generateCampaignWithAI(testRequest);

    console.log("✅ AI Campaign Generated Successfully!");
    console.log("Campaign Name:", result.campaign.name);
    console.log(
      "Channels:",
      result.campaign.channels.map((c) => c.name).join(", ")
    );
    console.log("Budget:", result.campaign.budget?.total);
    console.log("Explanation:", result.explanation);
  } catch (error) {
    console.error("❌ AI Test Failed:", error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testAI();
}

module.exports = { testAI };
