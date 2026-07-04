import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  demoMode: process.env.DEMO_MODE !== 'false', // default to true
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};
