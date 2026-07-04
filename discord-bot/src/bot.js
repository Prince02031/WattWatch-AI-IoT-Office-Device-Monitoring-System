import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { commandHandlers } from './commandHandlers.js';
import { alertWatcher } from './alertWatcher.js';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('[Discord Bot Error] DISCORD_TOKEN is missing in the environment. Please configure it in .env.');
  process.exit(1);
}

// Set up the discord client with gateway intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Ready Event
client.once('ready', () => {
  console.log(`=================================================`);
  console.log(`WattWatch Discord Bot Online & Authenticated`);
  console.log(`Username: ${client.user.tag}`);
  console.log(`ID: ${client.user.id}`);
  console.log(`=================================================`);

  // Start the background proactive alert watcher
  alertWatcher.start(client);
});

// Message Listener
client.on('messageCreate', async (message) => {
  // Ignore bots and commands that do not start with prefix "!"
  if (message.author.bot || !message.content.startsWith('!')) return;

  const content = message.content.trim();
  const args = content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    switch (command) {
      case 'help': {
        const helpMsg = await commandHandlers.handleHelp();
        await message.reply(helpMsg);
        break;
      }
      case 'status': {
        await message.channel.sendTyping();
        const statusMsg = await commandHandlers.handleStatus();
        await message.reply(statusMsg);
        break;
      }
      case 'usage': {
        await message.channel.sendTyping();
        const usageMsg = await commandHandlers.handleUsage();
        await message.reply(usageMsg);
        break;
      }
      case 'alerts': {
        await message.channel.sendTyping();
        const alertsMsg = await commandHandlers.handleAlerts();
        await message.reply(alertsMsg);
        break;
      }
      case 'room': {
        const roomArg = args.join(' ');
        if (!roomArg) {
          await message.reply('❌ **Please specify a room.** Example: \`!room drawing\` or \`!room work room 1\`.');
          return;
        }
        await message.channel.sendTyping();
        const roomMsg = await commandHandlers.handleRoom(roomArg);
        await message.reply(roomMsg);
        break;
      }
      default:
        // Do not respond to unknown prefix commands to avoid spam in multi-bot guilds
        break;
    }
  } catch (err) {
    console.error(`[Bot Error] Command failed: "${content}"`, err.message);
    await message.reply(`❌ **Service Error**: ${err.message}`);
  }
});

// Authenticate and Login
client.login(token).catch(err => {
  console.error('[Discord Bot Login Error] Failed to authenticate client with the token:', err.message);
  process.exit(1);
});
